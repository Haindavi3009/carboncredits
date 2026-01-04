from services import rag_service
import sys

def test_rag():
    print("1. Initializing DB...")
    rag_service.init_vector_db()
    
    print("2. Indexing test document...")
    test_text = "The secret code for the mission is 'BLUE_MOON'. The target is located in Sector 7."
    try:
        rag_service.index_document("debug_project", test_text)
        print("   Indexing successful.")
    except Exception as e:
        print(f"   Indexing FAILED: {e}")
        return

    print("3. Querying RAG...")
    try:
        response = rag_service.query_rag("debug_project", "What is the secret code?")
        print(f"   Response: {response}")
    except Exception as e:
        print(f"   Querying FAILED: {e}")

if __name__ == "__main__":
    test_rag()
