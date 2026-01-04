import google.generativeai as genai
import os

GENAI_API_KEY = "AIzaSyAKuecTOb-l_o1zB7fVGQpDXNRgnS0GDQw"
genai.configure(api_key=GENAI_API_KEY)

def test_model(model_name, is_embedding=False):
    print(f"Testing model string: '{model_name}'")
    try:
        if is_embedding:
            response = genai.embed_content(
                model=model_name,
                content="Test",
                task_type="retrieval_document"
            )
            print("   -> Success! (Embedding generated)")
        else:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Hello")
            print(f"   -> Success! Response: {response.text}")
    except Exception as e:
        print(f"   -> FAILED: {e}")

if __name__ == "__main__":
    print("--- EMBEDDING MODELS ---")
    test_model("models/text-embedding-004", is_embedding=True)
    test_model("text-embedding-004", is_embedding=True)
    
    print("\n--- GENERATION MODELS ---")
    test_model("models/gemini-2.0-flash")
    test_model("gemini-2.0-flash")
    test_model("models/gemini-1.5-flash")
    test_model("gemini-1.5-flash")
