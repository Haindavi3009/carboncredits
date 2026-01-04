import requests
import json

BASE_URL = "http://localhost:8000"

def run_test():
    print(f"Testing API at {BASE_URL}")

    # 1. Health Check
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"[Health] Status: {r.status_code}")
    except Exception as e:
        print(f"[Health] FAILED: {e}")
        return

    # 2. Index Document
    print("\n[Index] Sending test document...")
    payload = {
        "project_id": "debug_1",
        "text": "This is a debug document. The answer to the secret is 42."
    }
    try:
        r = requests.post(f"{BASE_URL}/ai/index-document", json=payload)
        print(f"[Index] Status: {r.status_code}")
        print(f"[Index] Response: {r.text}")
    except Exception as e:
        print(f"[Index] FAILED: {e}")

    # 3. Query
    print("\n[Query] Asking question...")
    query_payload = {
        "project_id": "debug_1",
        "query": "What is the answer to the secret?"
    }
    try:
        r = requests.post(f"{BASE_URL}/ai/query", json=query_payload)
        print(f"[Query] Status: {r.status_code}")
        print(f"[Query] Response: {r.text}")
    except Exception as e:
        print(f"[Query] FAILED: {e}")

if __name__ == "__main__":
    run_test()
