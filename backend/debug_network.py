import requests
import time
import socket

def check_connectivity():
    print("1. Testing DNS resolution for google.com...")
    try:
        ip = socket.gethostbyname("google.com")
        print(f"   Success: Resolved to {ip}")
    except Exception as e:
        print(f"   DNS FAILED: {e}")

    print("\n2. Testing HTTPS connection to Google Generative AI API...")
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro?key=INVALID_KEY_TEST"
    
    start = time.time()
    try:
        # We expect a 400 or 403, but getting a response means network is OK
        response = requests.get(url, timeout=5)
        duration = time.time() - start
        
        print(f"   Status Code: {response.status_code}")
        print(f"   Latency: {duration:.2f} seconds")
        
        if response.status_code in [400, 403, 200]:
            print("   Connection: SUCCESS (Server reached)")
        else:
            print("   Connection: WARNING (Unexpected status)")
            
    except requests.exceptions.ConnectTimeout:
        print("   Connection: FAILED (Timeout - Firewall/VPN might be blocking)")
    except requests.exceptions.ConnectionError as e:
         print(f"   Connection: FAILED (Error: {e})")

if __name__ == "__main__":
    check_connectivity()
