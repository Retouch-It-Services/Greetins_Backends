from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


# ----------  Greeting-related  ----------
class GreetingSendRequest(BaseModel):
    sender_name: str
    sender_email: Optional[EmailStr] = None
    sender_whatsapp: Optional[str] = None
    recipient_email: Optional[EmailStr] = None
    recipient_whatsapp: Optional[str] = None
    greeting_template_id: str
    message: Optional[str] = None
    card_image: Optional[str] = None


class GreetingSendResponse(BaseModel):
    success: bool
    message: str


# ----------  AI-related  ----------
class AIGreetingRequest(BaseModel):
    card_category: str


class AIGreetingResponse(BaseModel):
    ai_wish: str


# ----------  Team-member-related  ----------
class TeamMemberBase(BaseModel):
    name: str
    role: str
    email: EmailStr


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[EmailStr] = None


class TeamMemberResponse(TeamMemberBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ----------  Aliases the routers expect  ----------
AIGenerateRequest  = AIGreetingRequest
AIGenerateResponse = AIGreetingResponse