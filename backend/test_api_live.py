import requests
import time

BASE_URL = "http://localhost:8000"

def test_live_rag():
    print("1. Testing Health/Root...")
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"   Root status: {r.status_code}")
    except Exception as e:
        print(f"   Server might be down: {e}")
        return

    print("\n2. Indexing a test fact...")
    project_id = "test_project_99"
    fact = "The special code for verification is 'OMEGA_LEVEL'."
    try:
        r = requests.post(f"{BASE_URL}/ai/index-document", json={"project_id": project_id, "text": fact})
        print(f"   Index status: {r.status_code}, Response: {r.json()}")
    except Exception as e:
        print(f"   Indexing failed: {e}")

    print("\n3. Querying the fact...")
    try:
        r = requests.post(f"{BASE_URL}/ai/query", json={"project_id": project_id, "query": "What is the special code?"})
        print(f"   Query status: {r.status_code}")
        print(f"   Answer: {r.json().get('answer')}")
    except Exception as e:
        print(f"   Query failed: {e}")

if __name__ == "__main__":
    test_live_rag()
