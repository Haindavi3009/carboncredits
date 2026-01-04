import requests
import time

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing LIVE RAG with 60s timeout...")
    start = time.time()
    
    # Simple query
    query_payload = {
        "project_id": "test_timeout_check",
        "query": "What is the project about?"
    }
    
    try:
        print("Sending query (this might take time if API is slow)...")
        r = requests.post(f"{BASE_URL}/ai/query", json=query_payload, timeout=70) # Client timeout > Server timeout
        duration = time.time() - start
        
        print(f"Status: {r.status_code}")
        print(f"Time Taken: {duration:.2f}s")
        print(f"Response: {r.text}")
        
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    run_test()
