import google.generativeai as genai
import os

# 1. Setup (Directly, no service wrapper)
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY is missing from environment variables.")

genai.configure(api_key=api_key)

print(f"Using library version: {genai.__version__}")

# 2. Test Configuration
MODEL_NAME = "models/text-embedding-004"
TEST_TEXT = "The quick brown fox jumps over the lazy dog."

print(f"\n--- Attempting Raw Embedding ---")
print(f"Model: {MODEL_NAME}")
print(f"Input: '{TEST_TEXT}'")

# 3. Execution (No try/except, let it crash to see the error)
response = genai.embed_content(
    model=MODEL_NAME,
    content=TEST_TEXT,
    task_type="retrieval_document",
    title="Test Document"  # 'title' is often required/recommended for retrieval_document
)

# 4. Result Inspection
if 'embedding' in response:
    vec = response['embedding']
    print(f"\n✅ SUCCESS!")
    print(f"Vector Dimension: {len(vec)}")
    print(f"First 5 values: {vec[:5]}")
else:
    print(f"\n⚠️ RESPONSE FORMAT UNEXPECTED:")
    print(response)