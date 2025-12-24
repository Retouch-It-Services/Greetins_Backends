from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from .... import schemas
from ....db.session import get_db
from ....models.greeting import Greeting as GreetingModel
from ....utils.greeting_processor import process_and_send_greeting

router = APIRouter()


def send_greeting_background(payload: schemas.GreetingSendRequest, db: Session):
    """Background task to send greeting without blocking the response"""
    import asyncio
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(process_and_send_greeting(payload))
        
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
        except Exception as db_error:
            print(f"Database save failed: {db_error}")
            db.rollback()
    except Exception as e:
        print(f"Background email sending failed: {e}")
    finally:
        db.close()


@router.post("/greetings/send", response_model=schemas.GreetingSendResponse)
async def send_greeting(
    payload: schemas.GreetingSendRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Add email sending to background tasks - returns immediately
    background_tasks.add_task(send_greeting_background, payload, db)
    
    # Return success response immediately (within 2 seconds)
    return schemas.GreetingSendResponse(
        message="Your greeting is being sent!",
        status="processing",
        delivery_channel="email" if payload.recipient_email else "whatsapp",
        success=True,
    )
