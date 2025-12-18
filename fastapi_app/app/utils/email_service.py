"""
Simplified ZeptoMail email service
"""
import os
import requests
import base64
import asyncio
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

ZEPTO_API_KEY = os.getenv('ZEPTOMAIL_API_KEY')
FROM_EMAIL = os.getenv("ZEPTOMAIL_FROM_EMAIL")
API_URL = os.getenv("ZEPTO_API_URL")

async def send_zepto_email(
    to: str,
    subject: str,
    body: str,
    html: bool = True,
    from_email: str = None,
    cc: list = None,
    bcc: list = None,
    reply_to: str = None,
    attachment_path: str = None,
    attachment_base64: str = None,
    attachment_name: str = "attachment.png"
):
    """Send email via ZeptoMail API"""

    sender_email = from_email or FROM_EMAIL

    # Prepare base email body
    email_payload = {
        "from": {
            "address": FROM_EMAIL,
            "name": "Greeting App"
        },
        "to": [
            {"email_address": {"address": to}}
        ],
        "reply_to": {"address": sender_email},
        "subject": subject,
        "htmlbody": body if html else body.replace('\\n', '<br>')
    }

    # Handle attachment
    if attachment_base64:
        try:
            email_payload["attachments"] = [{
                "name": attachment_name,
                "content": attachment_base64,
                "mime_type": "image/png"  # Assuming png for now
            }]
        except Exception as e:
            print(f"Failed to process base64 attachment: {str(e)}")
    elif attachment_path and Path(attachment_path).exists():
        try:
            with open(attachment_path, "rb") as f:
                attachment_data = base64.b64encode(f.read()).decode()

            attachment_name = Path(attachment_path).name
            attachment_ext = Path(attachment_path).suffix.lower()

            mime_type = {
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".gif": "image/gif",
                ".pdf": "application/pdf",
            }.get(attachment_ext, "application/octet-stream")

            email_payload["attachments"] = [{
                "name": attachment_name,
                "content": attachment_data,
                "mime_type": mime_type
            }]

        except Exception as e:
            print(f"Failed to process attachment: {str(e)}")

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": ZEPTO_API_KEY
    }

    # Run requests in thread pool to make it async-compatible
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, lambda: requests.post(API_URL, headers=headers, json=email_payload, timeout=60))

    # Ensure we return JSON
    try:
        json_response = response.json()
        print(f"ZeptoMail response: {json_response}")  # Debug log
        return json_response
    except Exception as e:
        print(f"Error parsing JSON response: {e}")
        print(f"Response status: {response.status_code}")
        print(f"Response headers: {response.headers}")
        print(f"Response text (first 500 chars): {response.text[:500]}")

        # If it's an authentication error, be more specific
        if response.status_code == 401:
            return {"message": "Authentication failed - check API key", "status_code": 401}
        elif response.status_code == 403:
            return {"message": "Forbidden - check API permissions", "status_code": 403}
        elif response.status_code >= 400:
            return {"message": f"HTTP {response.status_code}: API request failed", "status_code": response.status_code}
        else:
            return {"message": "Invalid response from ZeptoMail", "status_code": response.status_code}