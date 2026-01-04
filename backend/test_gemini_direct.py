import google.generativeai as genai
import os
import time

# Use the key from rag_service.py
GENAI_API_KEY = "AIzaSyAKuecTOb-l_o1zB7fVGQpDXNRgnS0GDQw"

def test_gemini():
    print("1. Configuring Gemini...")
    genai.configure(api_key=GENAI_API_KEY)
    
    print("2. Listing Models (checking auth)...")
    try:
        start = time.time()
        # List just one model to verify connection
        with open("models_list.txt", "w", encoding="utf-8") as f:
            for m in genai.list_models():
                if 'embedContent' in m.supported_generation_methods:
                    msg = f"Found embedding model: {m.name}\n"
                    print(msg.strip())
                    f.write(msg)
                # break
        print(f"   List Models Latency: {time.time() - start:.2f}s")
    except Exception as e:
        print(f"   List Models FAILED: {e}")
        return

    print("\n3. Testing Generation (gemini-pro)...")
    try:
        model = genai.GenerativeModel('gemini-pro')
        start = time.time()
        response = model.generate_content("Say 'Hello' if you can hear me.")
        print(f"   Response: {response.text}")
        print(f"   Generation Latency: {time.time() - start:.2f}s")
    except Exception as e:
        print(f"   Generation FAILED: {e}")
        with open("gemini_error.txt", "w") as f:
            f.write(str(e))

if __name__ == "__main__":
    test_gemini()
