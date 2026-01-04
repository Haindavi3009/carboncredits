
import requests
import time

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing Static Fallback...")
    
    # Wait for server to be up
    for i in range(10):
        try:
            requests.get(f"{BASE_URL}/health")
            break
        except:
            print(f"Waiting for server... {i+1}/10")
            time.sleep(2)

    # Test Project 1: Amazon Reforestation
    payload = {
        "project_id": "1",
        "query": "What is the survival rate?"
    }
    
    print(f"Sending Query: {payload['query']}")
    start_time = time.time()
    try:
        r = requests.post(f"{BASE_URL}/ai/query", json=payload, timeout=30)
        end_time = time.time()
        elapsed = end_time - start_time
        print(f"Status: {r.status_code}")
        print(f"Time Taken: {elapsed:.2f} seconds")
        print(f"Response: {r.text}")
        
        if "[OFFLINE MODE]" in r.text and "92%" in r.text:
            print("SUCCESS: Static Fallback worked!")
        else:
            print("FAILURE: Did not get expected static response.")
            
    except Exception as e:
        print(f"Request Failed: {e}")

if __name__ == "__main__":
    run_test()
