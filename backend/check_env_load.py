
from dotenv import load_dotenv
import os

print("Checking .env loading...")
loaded = load_dotenv()
print(f"load_dotenv returned: {loaded}")

key = os.getenv("GENAI_API_KEY")
if key:
    print(f"Key found: {key[:5]}...{key[-5:]}")
else:
    print("Key NOT found in environment.")

# Check if file exists
print(f".env exists: {os.path.exists('.env')}")
