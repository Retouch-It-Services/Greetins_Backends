from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import google.generativeai as genai
import os

from app.schemas import (
    GreetingSendRequest,
    AIGenerateRequest,
    AIGenerateResponse,
)
from app.models.greeting import Greeting
from app.utils.greeting_processor import process_and_send_greeting
from app.core.database import get_db

router = APIRouter(prefix="/greetings", tags=["Greetings"])

# ------------------------------------------------------------------
#  Gemini setup
# ------------------------------------------------------------------
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


# ------------------------------------------------------------------
#  CRUD endpoints (unchanged)
# ------------------------------------------------------------------
@router.post("/send")
async def send_greeting(payload: GreetingSendRequest):
    """Send greeting via email"""
    return await process_and_send_greeting(payload)


# ------------------------------------------------------------------
#  NEW: universal AI wish generator
# ------------------------------------------------------------------

@router.post("/ai/generate-greeting", response_model=AIGenerateResponse)
def generate_ai_greeting(payload: AIGenerateRequest, db: Session = Depends(get_db)):
    """
    Auto-detect occasion and return a long, personal, multi-line wish.
    """
    category = payload.occasion or "General"
    recipient = payload.recipient_name or "there"
    tone = payload.tone or "warm"

    prompt = f"""
    You are an expert greeting card writer. Your task is to write a long, heartfelt, and personal message for a greeting card.

    **Instructions:**
    1.  **Occasion:** {category}
    2.  **Recipient:** {recipient}
    3.  **Tone:** {tone}
    4.  **Length:** The message must be 5-6 sentences long (around 350-450 characters).
    5.  **Formatting:** Write a multi-line message. Use line breaks to create a readable and personal feel.
    6.  **Emojis:** Include 2-3 relevant emojis naturally within the message.
    7.  **DO NOT:** Do not include a sender's name or the date.

    **Example of a good birthday message:**
    Happy Birthday! 🎂✨
    May your special day be filled with joy, love, and beautiful moments.
    You deserve all the happiness and success in the world.
    May this year bring new opportunities, growth, and endless positivity into your life.
    Keep smiling, keep shining, and never stop believing in yourself.
    Have a wonderful and unforgettable birthday celebration! 🎉🥳

    Now, write a new message based on the instructions for the specified occasion.
    """

    try:
        response = model.generate_content(prompt)
        wish = response.text.strip()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"AI service error: {e}")

    return AIGenerateResponse(wish=wish)