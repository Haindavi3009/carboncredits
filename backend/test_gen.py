
import google.generativeai as genai
import services.rag_service as rag_service
import os

print("Testing Generation...")

if rag_service.GENAI_API_KEY:
    genai.configure(api_key=rag_service.GENAI_API_KEY)
    
    try:
        print("Listing available models...")
        for m in genai.list_models():
            print(f"name: {m.name}")
            if 'generateContent' in m.supported_generation_methods:
                print(f"  - Supports generateContent")
    except Exception as e:
        print(f"List Error: {e}")

    try:
        print("\nAttempting generation with 'models/gemini-1.5-flash'...")
        model = genai.GenerativeModel('models/gemini-1.5-flash')
        response = model.generate_content("Hello")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Generation Error: {e}")
else:
    print("No API Key.")
