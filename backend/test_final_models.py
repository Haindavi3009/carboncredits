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
        with open("final_models.txt", "a") as f:
             f.write(f"Model: {model_name} | FAILED: {e}\n")
    else:
        with open("final_models.txt", "a") as f:
             f.write(f"Model: {model_name} | SUCCESS\n")

if __name__ == "__main__":
    test_model("gemini-flash-latest")
    test_model("models/gemini-flash-latest")
    test_model("gemini-2.0-flash-exp")
    test_model("gemini-2.5-flash")
