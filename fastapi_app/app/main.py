from fastapi import FastAPI

from .api.v1.endpoints import greetings

from .core.database import Base, engine


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Greetins - AI-Enhanced Greeting Card Sender",
    description="API for sending personalized greeting cards through Email or WhatsApp.",
    version="1.0.0",
)

app.include_router(greetings.router, prefix="/api/v1", tags=["Greetings"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Greetins API!"}
