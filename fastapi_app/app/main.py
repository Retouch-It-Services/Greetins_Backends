from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.endpoints import greetings, contact

from .core.database import Base, engine

# Only create tables if database is configured
if engine:
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Warning: Could not create database tables: {e}")

app = FastAPI(
    title="Greetins - AI-Enhanced Greeting Card Sender",
    description="API for sending personalized greeting cards through Email or WhatsApp.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(greetings.router, prefix="/api/v1", tags=["Greetings"])
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Greetins API!"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
