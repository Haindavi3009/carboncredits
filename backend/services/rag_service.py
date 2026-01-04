import os
import uuid
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels
import google.generativeai as genai
# Using Google Gemini for embeddings and chat since it's in the prompt
# Alternatively could use OpenAI

# Configure Gemini
# Configure Gemini
# Key is now loaded from environment variables (see .env)
# GENAI_API_KEY = os.getenv("GENAI_API_KEY") # This is usually handled by main.py loading .env, but let's be safe
GENAI_API_KEY = os.environ.get("GENAI_API_KEY") 
# GENAI_API_KEY = None # Force Mock Mode for testing

if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)
    
    print("Running Qdrant in LOCAL mode")
    # client = QdrantClient(path="./qdrant_storage") # Moved to lazy init

QDRANT_URL = os.getenv("QDRANT_URL")
_client_instance = None

def get_client():
    global _client_instance
    if _client_instance is None:
        if QDRANT_URL:
            _client_instance = QdrantClient(url=QDRANT_URL)
        else:
            _client_instance = QdrantClient(location=":memory:")
    return _client_instance
COLLECTION_NAME = "project_docs"

def init_vector_db():
    try:
        client = get_client()
        collections = client.get_collections()
        if COLLECTION_NAME not in [c.name for c in collections.collections]:
            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=qmodels.VectorParams(size=768, distance=qmodels.Distance.COSINE),
            )
    except Exception as e:
        print(f"Qdrant init error: {e}")

import concurrent.futures

# @retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=4, max=10))
def get_embedding(text: str):
    if not GENAI_API_KEY:
        return [0.0] * 768 # Mock if no key
    
    def _call_embed():
        return genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            task_type="retrieval_document",
            title="Project Document"
        )

    try:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(_call_embed)
            result = future.result(timeout=60) # 60 second timeout
        embedding = result['embedding']
        if len(embedding) < 768:
            embedding = embedding + [0.0] * (768 - len(embedding))
        elif len(embedding) > 768:
            embedding = embedding[:768]
        print(f"DEBUG: Embedding length: {len(embedding)}")
        return embedding
    except Exception as e:
        print(f"Embedding error/timeout: {e}. Using mock embedding.")
        return [0.0] * 768

def index_document(project_id: str, text: str):
    # Simple chunking by paragraphs or length
    chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
    
    points = []
    for idx, chunk in enumerate(chunks):
        vector = get_embedding(chunk)
        points.append(qmodels.PointStruct(
            id=str(uuid.uuid4()), # Need to import uuid but I'll fix imports below
            vector=vector,
            payload={"project_id": str(project_id), "text": chunk}
        ))
    
    get_client().upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

import requests
import io
import pypdf

def index_document_from_url(project_id: str, url: str):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Extract text using pypdf
        pdf_file = io.BytesIO(response.content)
        reader = pypdf.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
        if not text.strip():
            print(f"Warning: No text extracted from {url}")
            return
            
        index_document(project_id, text)
        print(f"Successfully indexed {url} for project {project_id}")
        
    except Exception as e:
        print(f"Error indexing URL {url}: {e}")
        # Non-blocking error for now


        return f"AI Service Error: {str(e)} (Please check API Key or Connection)"

from static_rag_data import STATIC_KNOWLEDGE_BASE

def find_static_answer(project_id: str, query: str):
    """Checks for a static answer match. Returns None if no match found."""
    project_data = STATIC_KNOWLEDGE_BASE.get(str(project_id))
    if not project_data:
        return None
        
    query_lower = query.lower()
    for qa in project_data['questions']:
        if any(k in query_lower for k in qa['keywords']):
             return qa['answer']
    return None

def get_fallback_message(project_id: str):
    """Returns the list of supported questions for a project."""
    project_data = STATIC_KNOWLEDGE_BASE.get(str(project_id))
    if not project_data:
        return "System is in Offline Demo Mode. No specific static data found for this project."

    questions_list = "\n".join([f"- {qa['question']}" for qa in project_data['questions']])
    return f"I couldn't find a specific answer in my offline database. \n\nTry asking one of these questions:\n{questions_list}"

def query_rag(project_id: str, query: str):
    print(f"DEBUG: Processing Query for Project {project_id}: '{query}'")
    
    # 1. OPTIMIZATION: Check Static Data FIRST (Instant Response)
    static_ans = find_static_answer(project_id, query)
    if static_ans:
        print("DEBUG: Found static match! Returning instantly.")
        return static_ans

    # 2. If no static match, try API
    print(f"DEBUG: GENAI_API_KEY status: {bool(GENAI_API_KEY)}")
    if not GENAI_API_KEY:
         return get_fallback_message(project_id)

    try:
        # Embed query with timeout
        def _embed_query():
            return genai.embed_content(
                model="models/text-embedding-004",
                content=query,
                task_type="retrieval_query"
            )
            
        with concurrent.futures.ThreadPoolExecutor() as executor:
             query_vector = executor.submit(_embed_query).result(timeout=60)['embedding']
             if len(query_vector) < 768:
                 query_vector = query_vector + [0.0] * (768 - len(query_vector))
             elif len(query_vector) > 768:
                 query_vector = query_vector[:768]
             print(f"DEBUG: Query vector length: {len(query_vector)}")
    
        search_result = get_client().search(
            collection_name=COLLECTION_NAME,
            query_vector=query_vector,
            query_filter=qmodels.Filter(
                must=[
                    qmodels.FieldCondition(
                        key="project_id",
                        match=qmodels.MatchValue(value=str(project_id)),
                    )
                ]
            ),
            limit=3
        )
        
        context = "\n".join([hit.payload['text'] for hit in search_result])
        if not context:
            context = "No specific documents found. Using general knowledge."

        # Generate Answer with timeout
        def _generate():
            model = genai.GenerativeModel('models/gemini-1.5-flash')
            prompt = f"Context: {context}\n\nQuestion: {query}\n\nAnswer based on the context:"
            return model.generate_content(prompt).text

        with concurrent.futures.ThreadPoolExecutor() as executor:
            return executor.submit(_generate).result(timeout=60)

    except Exception as e:
        print(f"RAG Error (Timeout or API): {e}")
        # FALLBACK TO STATIC LIST
        print("API Failed. Returning fallback list.")
        return get_fallback_message(project_id)


