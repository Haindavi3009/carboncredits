from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from services import ocr_service, rag_service
import shutil
import os
import uuid

router = APIRouter(prefix="/ai", tags=["ai"])

@router.on_event("startup")
async def startup_event():
    rag_service.init_vector_db()

@router.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    content = await file.read()
    if file.filename.endswith(".pdf"):
        text = ocr_service.extract_text_from_pdf(content)
    else:
        text = ocr_service.extract_text_from_image(content)
    
    return {"filename": file.filename, "extracted_text": text}

@router.post("/index-document")
def index_document(project_id: str = Body(...), text: str = Body(...)):
    try:
        rag_service.index_document(project_id, text)
        return {"status": "indexed", "project_id": project_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query")
def query_document(project_id: str = Body(...), query: str = Body(...)):
    try:
        answer = rag_service.query_rag(project_id, query)
        return {"project_id": project_id, "query": query, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/index-url")
def index_url_endpoint(project_id: str = Body(...), url: str = Body(...)):
    try:
        rag_service.index_document_from_url(project_id, url)
        return {"status": "indexed", "url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-document")
async def upload_document(project_id: str = Body(...), file: UploadFile = File(...)):
    try:
        content = await file.read()
        # Simple PDF extraction for upload (could benefit from ocr_service generic usage but staying simple)
        if file.filename.endswith(".pdf"):
            import io
            import pypdf
            pdf_file = io.BytesIO(content)
            reader = pypdf.PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
        else:
             text = content.decode("utf-8", errors="ignore") # Fallback for text files
        
        if text.strip():
            rag_service.index_document(project_id, text)
            
        return {"status": "indexed", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
