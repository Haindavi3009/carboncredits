import google.generativeai as genai
try:
    print(f"Version: {genai.__version__}")
except:
    print("Version attribute not found.")
