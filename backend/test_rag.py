import os
import google.generativeai as genai
import numpy as np
from google.generativeai.types import HarmCategory, HarmBlockThreshold

# --- Configuration ---
GENAI_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GENAI_API_KEY:
    # Fallback for local testing if env var isn't set
    # In production, always use environment variables
    pass 

if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)

GENERATION_MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/text-embedding-004"
EMBEDDING_DIMENSION = 768

# --- In-Memory Vector DB (Replaces external DB for this script) ---
# Structure: { project_id: [ { "text": str, "embedding": np.array } ] }
VECTOR_DB = {}

def init_vector_db():
    """Initializes the in-memory vector database."""
    global VECTOR_DB
    VECTOR_DB = {}
    print("✓ Vector DB Initialized (In-Memory)")

# --- Core GenAI Functions (The Upgrade) ---

def get_embedding(text):
    """Generates embedding using the updated text-embedding-004 model."""
    try:
        result = genai.embed_content(
            model=EMBEDDING_MODEL_NAME,
            content=text,
            task_type="retrieval_document"
        )
        return result['embedding']
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return [0.0] * EMBEDDING_DIMENSION

def generate_answer(context, query):
    """Generates answer using Gemini 1.5 Flash."""
    try:
        model = genai.GenerativeModel(GENERATION_MODEL_NAME)
        prompt = f"""
        You are a helpful assistant. Use the provided context to answer the question.
        
        Context:
        {context}
        
        Question: 
        {query}
        """
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating answer: {e}")
        return "Sorry, I could not generate an answer."

# --- Orchestration Functions (Called by your script) ---

def index_document(project_id, text):
    """Indexes a document into the vector store."""
    if project_id not in VECTOR_DB:
        VECTOR_DB[project_id] = []
    
    vector = get_embedding(text)
    
    doc_record = {
        "text": text,
        "embedding": vector
    }
    VECTOR_DB[project_id].append(doc_record)
    print(f"✓ Indexed document for {project_id} (Vector dim: {len(vector)})")

def retrieve_context(project_id, query_embedding, top_k=3):
    """Simple cosine similarity retrieval."""
    if project_id not in VECTOR_DB or not VECTOR_DB[project_id]:
        return []

    query_vec = np.array(query_embedding)
    scores = []

    for doc in VECTOR_DB[project_id]:
        doc_vec = np.array(doc["embedding"])
        # Cosine similarity: (A . B) / (||A|| * ||B||)
        norm_q = np.linalg.norm(query_vec)
        norm_d = np.linalg.norm(doc_vec)
        
        if norm_q == 0 or norm_d == 0:
            score = 0
        else:
            score = np.dot(query_vec, doc_vec) / (norm_q * norm_d)
        
        scores.append((score, doc["text"]))

    # Sort by score descending
    scores.sort(key=lambda x: x[0], reverse=True)
    return [text for score, text in scores[:top_k]]

def query_rag(project_id, query):
    """Full RAG flow: Embed Query -> Retrieve -> Generate."""
    print(f"Processing query for {project_id}...")
    
    # 1. Embed Query
    query_vec = get_embedding(query)
    
    # 2. Retrieve Context
    context_list = retrieve_context(project_id, query_vec)
    context_text = "\n\n".join(context_list)
    
    if not context_text:
        return "No relevant information found in the knowledge base."

    # 3. Generate Answer
    answer = generate_answer(context_text, query)
    return answer