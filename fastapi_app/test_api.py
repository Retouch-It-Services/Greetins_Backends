#!/usr/bin/env python
"""
Test the Team Members API
"""
import requests
import json

print("=" * 70)
print("TESTING TEAM MEMBERS API")
print("=" * 70)

# Test 1: Check if backend is running
print("\n[TEST 1] Checking if backend is running...")
try:
    response = requests.get("http://localhost:8000/", timeout=5)
    print(f"✓ Backend is running!")
    print(f"  Response: {response.json()}")
except Exception as e:
    print(f"✗ Backend is NOT running: {e}")
    exit(1)

# Test 2: Create a team member
print("\n[TEST 2] Creating a team member...")
member_data = {
    "name": "John Doe",
    "role": "Senior Developer",
    "description": "Experienced full-stack developer with 5+ years experience",
    "color_theme": "from-blue-300 to-cyan-300"
}

try:
    response = requests.post(
        "http://localhost:8000/api/v1/team-members",
        json=member_data,
        timeout=10
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        member = response.json()
        member_id = member.get('id')
        print(f"✓ Team member created! ID: {member_id}")
        
        # Test 3: Upload image
        print(f"\n[TEST 3] Uploading image for member ID {member_id}...")
        
        # Small test image base64
        test_image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        
        upload_data = {
            "image_data": test_image,
            "filename": "profile.jpg"
        }
        
        upload_response = requests.post(
            f"http://localhost:8000/api/v1/team-members/{member_id}/upload-image-base64",
            data=upload_data,
            timeout=30
        )
        
        print(f"Status Code: {upload_response.status_code}")
        print(f"Response: {json.dumps(upload_response.json(), indent=2)}")
        
        if upload_response.status_code == 200:
            print("✓ Image uploaded successfully!")
        else:
            print("✗ Image upload failed")
    else:
        print("✗ Failed to create member")
        
except requests.exceptions.ConnectionError:
    print("✗ Connection Error: Cannot reach backend on port 8000")
except requests.exceptions.Timeout:
    print("✗ Timeout Error: Request took too long")
except Exception as e:
    print(f"✗ Error: {e}")
    print(f"  Type: {type(e)}")

print("\n" + "=" * 70)
print("TEST COMPLETE")
print("=" * 70)
