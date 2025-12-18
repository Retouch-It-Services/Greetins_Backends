from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.utils.email_service import send_zepto_email

router = APIRouter(prefix="/contact", tags=["Contact"])

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    subject: str
    message: str

@router.post("/send")
async def send_contact_message(payload: ContactRequest):
    """Send contact form message via email"""
    
    # Email to admin - use the user's email as recipient for testing
    admin_email = payload.email  # Send confirmation to user instead
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
            <h1 style="margin: 0;">Thank You for Contacting Greetins!</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 10px;">
            <p style="color: #333; font-size: 16px;">Hi {payload.name},</p>
            <p style="color: #555; line-height: 1.6;">
                Thank you for reaching out to us! We have received your message and our team will get back to you as soon as possible.
            </p>
            
            <h3 style="color: #667eea; margin-top: 20px;">Your Message Details:</h3>
            
            <div style="margin: 15px 0;">
                <strong style="color: #667eea;">Subject:</strong>
                <p style="margin: 5px 0; color: #555;">{payload.subject}</p>
            </div>
            
            <div style="margin: 15px 0;">
                <strong style="color: #667eea;">Message:</strong>
                <p style="margin: 5px 0; color: #555; white-space: pre-wrap;">{payload.message}</p>
            </div>
            
            <p style="color: #555; margin-top: 20px;">
                We typically respond within 24-48 hours during business days.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
            <p style="color: #666; margin: 0;">Need immediate assistance?</p>
            <p style="color: #667eea; font-weight: bold; margin: 5px 0;">Call us: +91 98765 43210</p>
            <p style="color: #666; margin: 0;">Email: support@greetins.com</p>
        </div>
        
        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated confirmation from Greetins
        </p>
    </body>
    </html>
    """
    
    try:
        # Send confirmation email to the user
        result = await send_zepto_email(
            to=admin_email,
            subject=f"Thank you for contacting Greetins - {payload.subject}",
            body=html_content,
            from_email=None  # Use default FROM_EMAIL
        )
        
        print(f"Email send result: {result}")  # Debug log
        
        # Check if email was sent successfully
        if result and ("data" in result or result.get("message") == "OK"):
            return {
                "success": True,
                "message": "Thank you for contacting us! Check your email for confirmation."
            }
        else:
            error_msg = result.get("message", "Failed to send message")
            print(f"Email send failed: {error_msg}")
            raise HTTPException(status_code=500, detail=error_msg)
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error sending contact email: {e}")
        raise HTTPException(status_code=500, detail=f"Email service error: {str(e)}")
