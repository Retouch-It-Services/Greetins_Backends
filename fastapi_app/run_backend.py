#!/usr/bin/env python
"""
Start the FastAPI backend with database setup
"""
import uvicorn
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

from app.core.database import Base, engine
from app.models.team_member import TeamMember
from app.models.greeting import Greeting

# Create all tables
print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✓ Database tables ready")

# Start the server
if __name__ == "__main__":
    print("Starting backend on http://0.0.0.0:8000")
    print("Frontend on port 5176 is allowed")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )