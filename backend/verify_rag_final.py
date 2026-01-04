import sys
import os

# Add backend to path so we can import services
sys.path.append(os.getcwd())

from services.rag_service import query_rag, index_document

def test_final():
    print("1. Indexing a test document...")
    try:
        index_document("test_proj", "This is a test document about clean energy.")
        print("   -> Indexed successfully.")
    except Exception as e:
        print(f"   -> Indexing FAILED: {e}")
        return

    print("\n2. Querying RAG...")
    try:
        answer = query_rag("test_proj", "What is this about?")
        print(f"   -> Answer: {answer}")
        
        if "clean energy" in answer.lower():
            print("   SUCCESS: Content retrieved correctly!")
        else:
            print("   WARNING: Answer might not be relevant (or model hallucinated).")
            
    except Exception as e:
        print(f"   -> Query FAILED: {e}")

if __name__ == "__main__":
    test_final()
