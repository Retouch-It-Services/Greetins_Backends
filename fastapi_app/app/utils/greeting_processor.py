import os
from pathlib import Path

import google.generativeai as genai
import yaml
from dotenv import load_dotenv

from ..schemas import GreetingSendRequest, GreetingSendResponse
from .email_sender import send_zepto_email
import asyncio

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


async def process_and_send_greeting(payload: GreetingSendRequest) -> GreetingSendResponse:
    print(f"Loading template: {payload.greeting_template_id}")

    final_message = payload.message
    if not final_message:
        print("User message is empty, attempting AI generation...")
        final_message = _generate_ai_message(
            template_id=payload.greeting_template_id,
            sender_name=payload.sender_name,
        )
    
    # Create personal email HTML (simple design avoids spam filters)
    card_image_html = ""
    if payload.card_image:
        card_image_html = '<div style="text-align: center; margin: 20px 0;"><img src="cid:greeting_card_image" alt="Greeting Card" style="max-width: 500px; width: 100%; height: auto; border-radius: 8px;"/></div>'
    
    rendered_card = f"""
    <html>
    <body style="font-family: Georgia, serif; color: #333; line-height: 1.6; padding: 20px;">
        {card_image_html}
        <p style="font-size: 16px; margin: 20px 0;">{final_message}</p>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">— {payload.sender_name}</p>
    </body>
    </html>
    """
    print("Rendering custom message...")

    delivery_channel = ""
    if payload.recipient_email:
        try:
            await send_zepto_email(
                to=payload.recipient_email,
                subject=f"{payload.sender_name} sent you a greeting",
                body=rendered_card,
                from_email=payload.sender_email,
                card_image_base64=payload.card_image
            )
            print(f"Email sent successfully to: {payload.recipient_email}")
            delivery_channel = "email"
        except Exception as e:
            print(f"Email sending failed: {e}")
            return GreetingSendResponse(
                message=f"Failed to send email: {str(e)}",
                status="failed",
                delivery_channel="email",
                success=False,
            )
    elif payload.recipient_whatsapp:
        print(f"Sending WhatsApp to: {payload.recipient_whatsapp}")
        print(
            f"WhatsApp message: {final_message} (card image/link not implemented yet)"
        )
        delivery_channel = "whatsapp"
    else:
        return GreetingSendResponse(
            message="No recipient specified for delivery.",
            status="failed",
            delivery_channel="none",
            success=False,
        )

    return GreetingSendResponse(
        message="Greeting sent successfully!",
        status="success",
        delivery_channel=delivery_channel,
        success=True,
    )
