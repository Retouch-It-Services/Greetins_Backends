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
        response = process_and_send_greeting(payload)

        # Create a new Greeting record
        db_greeting = GreetingModel(
            sender_name=payload.sender_name,
            sender_email=payload.sender_email,
            recipient_email=payload.recipient_email,
            recipient_whatsapp=payload.recipient_whatsapp,
            greeting_template_id=payload.greeting_template_id,
            message=payload.message,
            delivery_channel=response.delivery_channel,
            status=response.status,
            # Store whether the message was AI-generated
            ai_generated="Yes" if not payload.message else "No",
        )

        # Add the record to the session and commit it
        db.add(db_greeting)
        db.commit()
        db.refresh(db_greeting)

        return response
    except Exception as e:
        db.rollback()  # Rollback in case of an error
        raise HTTPException(status_code=500, detail=str(e))
