import os
import requests
import base64
import asyncio
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

ZEPTO_API_KEY = os.getenv('ZEPTOMAIL_API_KEY')
FROM_EMAIL = os.getenv("ZEPTOMAIL_FROM_EMAIL")
API_URL = "https://api.zeptomail.in/v1.1/email"

async def send_zepto_email(
    to: str,
    subject: str,
    body: str,
    html: bool = True,
    from_email: str = None,
    card_image_base64: str = None
):
    sender_email = from_email or FROM_EMAIL

    email_payload = {
        "from": {"address": FROM_EMAIL, "name": sender_email.split('@')[0] if sender_email else "Greeting App"},
        "to": [{"email_address": {"address": to}}],
        "reply_to": [{"address": sender_email}],
        "subject": subject,
        "htmlbody": body if html else body.replace('\n', '<br>'),
        "track_clicks": False,
        "track_opens": False
    }

    if card_image_base64:
        try:
            # Extract base64 data if it includes data URI prefix
            if 'base64,' in card_image_base64:
                image_data = card_image_base64.split('base64,')[1]
            else:
                image_data = card_image_base64
            
            email_payload["inline_images"] = [{
                "mime_type": "image/png",
                "content": image_data,
                "cid": "greeting_card_image"
            }]
        except Exception as e:
            print(f"Failed to process card image: {str(e)}")

    headers = {"accept": "application/json", "content-type": "application/json", "authorization": ZEPTO_API_KEY}
    
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    response = await loop.run_in_executor(None, lambda: requests.post(API_URL, headers=headers, json=email_payload))

    try:
        json_response = response.json()
        print(f"ZeptoMail response: {json_response}")
        return json_response
    except Exception as e:
        print(f"Error: {e}, Status: {response.status_code}")
        if response.status_code >= 400:
            return {"message": f"HTTP {response.status_code}: API request failed", "status_code": response.status_code}
        return {"message": "Invalid response from ZeptoMail", "status_code": response.status_code}