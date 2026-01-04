
import google.generativeai as genai
import services.rag_service as rag_service
import os

print("Listing available models ONLY...")

if rag_service.GENAI_API_KEY:
    genai.configure(api_key=rag_service.GENAI_API_KEY)
    
    try:
        for m in genai.list_models():
            print(f"Model: {m.name}")
    except Exception as e:
        print(f"List Error: {e}")
else:
    print("No API Key.")
