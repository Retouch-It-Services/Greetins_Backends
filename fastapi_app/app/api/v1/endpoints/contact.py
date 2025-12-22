from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from ....utils.email_sender import send_zepto_email

router = APIRouter()

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    subject: str
    message: str

@router.post("/contact/send")
async def send_contact_message(payload: ContactRequest):
    try:
        # Send confirmation to user
        user_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Thank you for contacting Greetins!</h2>
            <p>Hi {payload.name},</p>
            <p>We've received your message and will get back to you soon.</p>
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> {payload.subject}</p>
            <p>{payload.message}</p>
            <br>
            <p>Best regards,<br>Greetins Team</p>
        </body>
        </html>
        """
        
        await send_zepto_email(
            to=payload.email,
            subject="We received your message - Greetins",
            body=user_email_body,
            from_email="support@greetins.com"
        )
        
        return {"message": "Thank you for contacting us! We'll get back to you soon."}
    except Exception as e:
        return {"detail": f"Failed to send message: {str(e)}"}
