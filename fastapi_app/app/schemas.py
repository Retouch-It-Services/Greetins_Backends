from typing import Optional

from pydantic import BaseModel


class GreetingSendRequest(BaseModel):
    sender_name: str
    sender_email: str
    sender_whatsapp: Optional[str] = None
    recipient_email: Optional[str] = None
    recipient_whatsapp: Optional[str] = None
    greeting_template_id: str
    message: str


class GreetingSendResponse(BaseModel):
    message: str
    status: str
    delivery_channel: str
