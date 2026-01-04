import requests

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing LIVE RAG (Real API Key)...")
    
    # Simple query to see if embedding works
    query_payload = {
        "project_id": "test_live_key",
        "query": "Is the API key working?"
    }
    
    try:
        print("Sending query...")
        r = requests.post(f"{BASE_URL}/ai/query", json=query_payload, timeout=15)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text}")
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    run_test()
