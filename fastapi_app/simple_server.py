#!/usr/bin/env python
"""
Ultra-simple backend server - no dependencies, no crashing
"""
import http.server
import socketserver
import json
import threading
import time

PORT = 8002

# In-memory database
team_members = {}
member_id_counter = 1

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests"""
        print(f"[GET] {self.path}")
        
        if self.path == "/api/v1/team-members":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = list(team_members.values())
            self.wfile.write(json.dumps(response).encode())
            return
        
        self.send_response(404)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        """Handle POST requests"""
        print(f"[POST] {self.path}")
        
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        
        if self.path == "/api/v1/team-members":
            try:
                data = json.loads(body)
                global member_id_counter
                member = {
                    "id": member_id_counter,
                    "name": data.get("name", ""),
                    "role": data.get("role", ""),
                    "description": data.get("description", ""),
                    "color_theme": data.get("color_theme", "from-pink-300 to-red-300"),
                    "image_filename": None,
                    "created_at": "2025-01-01T00:00:00",
                    "updated_at": "2025-01-01T00:00:00"
                }
                team_members[member_id_counter] = member
                print(f"[CREATED] Member ID: {member_id_counter}")
                member_id_counter += 1
                
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(member).encode())
                return
            except Exception as e:
                print(f"[ERROR] {e}")
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
                return
        
        if "/upload-image-base64" in self.path:
            try:
                member_id = int(self.path.split("/")[4])
                data = json.loads(body)
                image_data = data.get("image_data", "")
                filename = data.get("filename", "image.jpg")
                
                if member_id in team_members:
                    team_members[member_id]["image_filename"] = filename
                    print(f"[UPLOADED] Image for member {member_id}")
                    
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    response = {
                        "message": "Image uploaded successfully",
                        "member_id": member_id,
                        "filename": filename,
                        "size_bytes": len(image_data)
                    }
                    self.wfile.write(json.dumps(response).encode())
                    return
            except Exception as e:
                print(f"[ERROR] {e}")
        
        self.send_response(404)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_DELETE(self):
        """Handle DELETE requests"""
        print(f"[DELETE] {self.path}")
        
        try:
            member_id = int(self.path.split("/")[4])
            if member_id in team_members:
                del team_members[member_id]
                print(f"[DELETED] Member {member_id}")
                
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Deleted"}).encode())
                return
        except Exception as e:
            print(f"[ERROR] {e}")
        
        self.send_response(404)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    try:
        print(f"Starting server on port {PORT}...", flush=True)
        with socketserver.TCPServer(("0.0.0.0", PORT), RequestHandler) as httpd:
            print("=" * 60, flush=True)
            print(f"Greetins Backend Started", flush=True)
            print(f"URL: http://localhost:{PORT}", flush=True)
            print(f"Frontend: http://localhost:3000", flush=True)
            print("=" * 60, flush=True)
            print("Press CTRL+C to stop", flush=True)
            print("", flush=True)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nBackend stopped", flush=True)
    except Exception as e:
        print(f"ERROR: {e}", flush=True)
        import traceback
        traceback.print_exc()
