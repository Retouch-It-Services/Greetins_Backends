from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from ..core.database import Base


class Greeting(Base):
    __tablename__ = "greetings"

    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String, index=True)
    sender_email = Column(String, index=True)
    recipient_email = Column(String, index=True)
    recipient_whatsapp = Column(String, index=True)
    greeting_template_id = Column(String, index=True)
    message = Column(Text)
    ai_generated = Column(String, nullable=True)  # To store if AI was used
    delivery_channel = Column(String, index=True)
    status = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Greeting(id={self.id}, sender='{self.sender_name}', status='{self.status}')>"
