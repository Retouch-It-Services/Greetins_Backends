"""
Simplified FastAPI app - works without database connection delays
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="Greetins API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:5176",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (temporary - for testing)
team_members_db = {}
next_id = 1

@app.get("/")
async def root():
    return {"message": "Welcome to Greetins API", "status": "ok"}

@app.get("/health")
async def health():
    return {"status": "ok", "service": "greetins-backend"}

# Team Members API
@app.get("/api/v1/team-members")
async def get_team_members():
    """Get all team members"""
    return list(team_members_db.values())

@app.post("/api/v1/team-members")
async def create_team_member(data: dict):
    """Create team member"""
    global next_id
    member = {
        "id": next_id,
        **data,
        "image_filename": None,
        "created_at": "2025-01-01T00:00:00",
        "updated_at": "2025-01-01T00:00:00"
    }
    team_members_db[next_id] = member
    next_id += 1
    return member

@app.post("/api/v1/team-members/{member_id}/upload-image-base64")
async def upload_image(member_id: int, image_data: str = None, filename: str = "image.jpg"):
    """Upload image"""
    if member_id not in team_members_db:
        return {"error": "Member not found"}, 404
    
    team_members_db[member_id]["image_filename"] = filename
    return {
        "message": "Image uploaded successfully",
        "member_id": member_id,
        "filename": filename,
        "size_bytes": len(image_data) if image_data else 0
    }

@app.delete("/api/v1/team-members/{member_id}")
async def delete_member(member_id: int):
    """Delete team member"""
    if member_id in team_members_db:
        del team_members_db[member_id]
        return {"message": "Team member deleted"}
    return {"error": "Not found"}, 404

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
