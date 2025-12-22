from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .... import schemas
from ....db.session import get_db  # Import the database dependency
from ....models.greeting import Greeting as GreetingModel  # Import the model
from ....utils.greeting_processor import process_and_send_greeting

router = APIRouter()


@router.post("/greetings/send", response_model=schemas.GreetingSendResponse)
async def send_greeting(
    payload: schemas.GreetingSendRequest,
    db: Session = Depends(get_db),  # Add the database dependency
):
    try:
        # Call the processor to handle sending
        response = await process_and_send_greeting(payload)

        # Try to save to database (optional - don't fail if DB is down)
        try:
            db_greeting = GreetingModel(
                sender_name=payload.sender_name,
                sender_email=payload.sender_email,
                recipient_email=payload.recipient_email,
                recipient_whatsapp=payload.recipient_whatsapp,
                greeting_template_id=payload.greeting_template_id,
                message=payload.message,
                delivery_channel=response.delivery_channel,
                status=response.status,
                ai_generated="Yes" if not payload.message else "No",
            )
            db.add(db_greeting)
            db.commit()
            db.refresh(db_greeting)
        except Exception as db_error:
            print(f"Database save failed (non-critical): {db_error}")
            db.rollback()

        return response
    except Exception as e:
        print(f"Error sending greeting: {e}")
        raise HTTPException(status_code=500, detail=str(e))
