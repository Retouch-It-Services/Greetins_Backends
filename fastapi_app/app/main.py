"""
Greetins Backend API
Frontend Port: 3000
Backend Port: 8000
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.endpoints import greetings, team_members, contact

# Configuration
FRONTEND_PORT = 3000
BACKEND_PORT = 8000
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI(
    title="Greetins - AI-Enhanced Greeting Card Sender",
    description="API for sending personalized greeting cards through Email or WhatsApp.",
    version="1.0.0",
)

# CORS - Allow frontend to connect to backend
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(greetings.router, prefix="/api/v1", tags=["Greetings"])
app.include_router(team_members.router, prefix="/api/v1", tags=["Team Members"])
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Greetins API!", "status": "healthy"}

@app.get("/health")
async def health():
    """Health check endpoint - no database required"""
    return {"status": "ok", "service": "greetins-backend"}