import google.generativeai as genai
import os

GENAI_API_KEY = "AIzaSyAKuecTOb-l_o1zB7fVGQpDXNRgnS0GDQw"
genai.configure(api_key=GENAI_API_KEY)

def test_model(model_name):
    print(f"Testing: '{model_name}'")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Hello")
        print(f"   -> Success! Response: {response.text}")
    except Exception as e:
        print(f"   -> FAILED: {e}")
        with open("fallback_error.txt", "a") as f:
             f.write(f"\nModel: {model_name}\nError: {e}\n")

if __name__ == "__main__":
    test_model("gemini-1.5-flash")
    test_model("models/gemini-1.5-flash")
