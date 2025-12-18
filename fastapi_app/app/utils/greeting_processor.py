import os
from pathlib import Path
import requests
import json

import google.generativeai as genai
import yaml
from dotenv import load_dotenv

from ..schemas import GreetingSendRequest, GreetingSendResponse

load_dotenv()
# --- AI Model Configuration ---
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # It's better to fail loudly at startup if the key is missing
    raise ValueError(
        "GEMINI_API_KEY environment variable not set. Please set it to use AI features."
    )

genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-pro"

# --- ZeptoMail Configuration ---
ZEPTOMAIL_API_KEY = os.environ.get("ZEPTOMAIL_API_KEY")
ZEPTOMAIL_FROM_EMAIL = os.environ.get("ZEPTOMAIL_FROM_EMAIL")
# ZeptoMail API endpoint for sending emails
ZEPTO_API_URL = os.environ.get("ZEPTO_API_URL", "https://api.zeptomail.com/v1.1/email")


# --- YAML Loading Mechanism ---
def _load_prompts_from_yaml(file_path: Path) -> dict:
    """Loads prompts from a YAML file."""
    print(f"DEBUG: Attempting to load prompts from: {file_path}")  # <-- DEBUG LINE
    if not file_path.exists():
        print(f"DEBUG: Prompt file NOT FOUND at {file_path}")  # <-- DEBUG LINE
        return {}
    with open(file_path, "r") as f:
        return yaml.safe_load(f)


# Determine the path to the prompts.yaml file
current_dir = Path(__file__).parent
PROMPTS_FILE_PATH = current_dir.parent / "config" / "prompts.yaml"
LOADED_PROMPTS = _load_prompts_from_yaml(PROMPTS_FILE_PATH)


# --- AI Message Generation using Gemini API ---
def _generate_ai_message(
    template_id: str, sender_name: str, recipient_context: str = ""
) -> str:
    """
    Generates an AI greeting message using Google's Gemini API.
    """
    print(
        f"Generating AI message for template: {template_id} for sender: {sender_name}"
    )

    prompt_config = LOADED_PROMPTS.get(template_id) or LOADED_PROMPTS.get("default")

    if not prompt_config:
        print(
            f"Warning: No prompt configuration found for '{template_id}' or 'default'."
        )
        return f"Hello from {sender_name}! Sending you a greeting."

    instruction = prompt_config.get("instruction", "").format(sender_name=sender_name)
    examples = prompt_config.get("examples", [])

    try:
        model = genai.GenerativeModel(MODEL_NAME)

        few_shot_examples = ""
        if examples:
            few_shot_examples = "\n\nHere are some examples of the desired output:"
            for example in examples:
                few_shot_examples += f"\nInput: {example.get('input', '')}\nOutput: {example.get('output', '')}"

        final_prompt = f"{instruction}{few_shot_examples}\n\nOutput:"

        response = model.generate_content(final_prompt)

        if response.candidates[0].finish_reason != 1:
            print(
                f"Gemini API response stopped early: {response.candidates[0].finish_reason}"
            )
            return "AI could not generate a message due to safety concerns."

        return response.text.strip()

    except Exception as e:
        print(f"Gemini API error: {e}")
        return (
            f"Sorry, I couldn't generate a message right now. Please try again later."
        )


from .email_service import send_zepto_email


async def process_and_send_greeting(payload: GreetingSendRequest) -> GreetingSendResponse:
    template_content = f"<h1>Hello from {payload.greeting_template_id}!</h1>"
    print(f"Loading template: {payload.greeting_template_id}")

    final_message = payload.message
    if not final_message:
        print("User message is empty, attempting AI generation...")
        final_message = _generate_ai_message(
            template_id=payload.greeting_template_id,
            sender_name=payload.sender_name,
        )
    
    # Determine the card image to use
    card_image_html = ""
    base64_image_for_attachment = None
    
    if payload.card_image:
        image_url = payload.card_image
        
        # Check if it's a base64 image (data:image/...)
        if image_url.startswith('data:image'):
            # Use CID reference for inline attachment (works in all email clients)
            card_image_html = '<img src="cid:greeting_card_image" alt="Greeting Card" style="max-width: 500px; width: 100%; height: auto; border-radius: 10px; margin: 20px auto; display: block;">'
            base64_image_for_attachment = image_url.split(',')[1] # just the data
            print("Using CID inline image attachment")
        elif image_url.startswith('/assets/'):
            # Local assets can't be used in email
            print(f"Local asset image detected: {image_url} - skipping")
            card_image_html = ""
        elif image_url.startswith('http'):
            # Use external URL-based image directly
            card_image_html = f'<img src="{image_url}" alt="Card" style="max-width: 500px; width: 100%; height: auto; border-radius: 10px; margin: 20px auto; display: block;">'
            print(f"Using external image URL: {image_url}")
    
    # Create HTML email content with card image
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 15px; text-align: center; color: white;">
            <h1 style="margin: 0 0 20px 0; font-size: 28px;">🎉 Special Greeting for You!</h1>
            
            {card_image_html}
            
            <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p style="font-size: 18px; line-height: 1.6; margin: 0;">{final_message}</p>
            </div>
            <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.9;">From: {payload.sender_name}</p>
        </div>
        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">Sent with ❤️ via Greetins</p>
    </body>
    </html>
    """

    delivery_channel = ""
    success = False
    error_message = ""
    
    if payload.recipient_email:
        print(f"Sending email to: {payload.recipient_email}")
        subject = f"Special Greeting from {payload.sender_name}"
        email_result = await send_zepto_email(
            to=payload.recipient_email,
            subject=subject,
            body=html_content,
            from_email=payload.sender_email,
            attachment_base64=base64_image_for_attachment,
            attachment_name="greeting_card_image.png"
        )
        
        # Correctly check for success based on ZeptoMail's API response
        if email_result and "data" in email_result and email_result["data"] is not None:
            success = True
            error_message = email_result.get("message", "Email sent successfully")
        else:
            success = False
            if email_result and "error" in email_result:
                error_details = email_result["error"].get("details", [])
                if error_details:
                    error_message = error_details[0].get("message", "Failed to send email")
                else:
                    error_message = email_result["error"].get("message", "Failed to send email")
            else:
                error_message = "An unknown error occurred"

        delivery_channel = "email"
    elif payload.recipient_whatsapp:
        print(f"Sending WhatsApp to: {payload.recipient_whatsapp}")
        print(f"WhatsApp message: {final_message} (WhatsApp API not implemented yet)")
        delivery_channel = "whatsapp"
        success = True  # Simulate success for WhatsApp
        error_message = "WhatsApp sending not yet implemented"
    else:
        return GreetingSendResponse(
            success=False,
            message="No recipient specified for delivery.",
        )

    if success:
        return GreetingSendResponse(
            success=True,
            message=f"Greeting sent successfully via {delivery_channel}!",
        )
    else:
        return GreetingSendResponse(
            success=False,
            message=f"Failed to send greeting via {delivery_channel}: {error_message}",
        )