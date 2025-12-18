Greetins – AI-Enhanced Greeting Card Sender

Send personalized greeting cards through Email or WhatsApp with a seamless React + FastAPI workflow.

Greetins is a modern web application that allows users to choose a greeting card template (e.g., Christmas, New Year, Birthday), fill in their details, and instantly send the greeting to friends, family, or customers.
Built with a clean architecture and AI-ready backend processing, the platform is designed for speed, simplicity, and scalability.

## ✅ Frontend-Backend Connection: COMPLETE ✅

**Your frontend and backend are now fully integrated and ready to use!**

### 🚀 Quick Start
```bash
# Windows
start-all.bat

# Linux/Mac
chmod +x start-all.sh && ./start-all.sh
```

### 🔗 API Base URL
```
http://localhost:8000/api/v1
```

### 📡 Available Endpoints
- ✅ `POST /greetings/send` - Send greeting
- ✅ `POST /ai/generate-greeting` - Generate AI message ⭐ NEW
- ✅ `GET /health` - Health check

### 📚 Integration Documentation
See these files for setup details:
- **CONNECTION_SETUP.md** - Quick reference
- **FRONTEND_BACKEND_INTEGRATION.md** - Full guide with troubleshooting
- **ARCHITECTURE.md** - System design and data flow
- **INTEGRATION_SUMMARY.md** - What's been connected

---

🚀 Tech Stack
Frontend

React.js

Tailwind CSS / Material UI (optional)

Axios for API calls

React Router

Backend

FastAPI

Pydantic for validation

SQLAlchemy ORM (optional, if storing records)

Email / WhatsApp API integrations

📌 Project Overview

Greetins enables users to:

Select a greeting card template (Christmas, New Year, Diwali, Birthday, etc.)

Enter sender details

Name

Email

WhatsApp phone number

Enter the recipient details

Email or WhatsApp number

Add a personalised message

Send the greeting card through
✔ Email
✔ WhatsApp

(Optional) Save or track previously sent greetings

The system is built to be easily extended — new greeting card themes can be added dynamically, and new distribution channels (e.g., SMS) can be integrated later.

📂 Backend Architecture (FastAPI)
Phase 1: Define Backend Schemas (fastapi_app/app/schemas.py)

We create new Pydantic models to manage card selection, sender info, and delivery.

1. GreetingSendRequest

Data sent from the React frontend when the user wants to send a greeting.

class GreetingSendRequest(BaseModel):
    sender_name: str
    sender_email: str
    sender_whatsapp: str | None
    recipient_email: str | None
    recipient_whatsapp: str | None
    greeting_template_id: str
    message: str

2. GreetingSendResponse

Data returned after sending the greeting.

class GreetingSendResponse(BaseModel):
    message: str
    status: str
    delivery_channel: str

Phase 2: Create Backend Endpoint (app/api/v1/endpoints/greetings.py)

A new POST endpoint that receives the greeting card request and triggers the sending process.

@router.post("/greetings/send", response_model=Schemas.GreetingSendResponse)
async def send_greeting(
    payload: Schemas.GreetingSendRequest,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Load template, generate card, send via Email/WhatsApp
    # Return success response

Backend Responsibilities:

Validate sender + recipient details

Load and render the greeting card template

Send via:

Email (Zeptomail)

WhatsApp (Twilio API / Meta Cloud API)

Return formatted success response

(Optional) Store greeting history for the user

📌 Phase 3: Greeting Rendering & Delivery Logic (utils/greeting_processor.py)

The logic responsible for combining the template + user data + message.

Core Tasks:

✔ Load card template (HTML or image)
✔ Insert user message dynamically
✔ Convert card to:

Image (PNG/JPG)

or HTML format for email
✔ Send via email or WhatsApp
✔ Return success status

The function:

def process_and_send_greeting(payload: GreetingSendRequest):
    # Load the selected template
    # Render custom message
    # Send via the correct channel
    # Return response

📌 Phase 4: Frontend Integration (React)
UI Flow:

Greeting Templates Page

Shows all greeting cards

User selects one card

Sender & Recipient Details Form

Inputs for sender + receiver

Preview message and card

Send Greeting

Call API (/greetings/send)

Show success toast or error popup

Example API Call:
await axios.post("/api/v1/greetings/send", {
  sender_name,
  sender_email,
  sender_whatsapp,
  recipient_email,
  recipient_whatsapp,
  greeting_template_id,
  message,
});

🎨 Adding New Greeting Templates

Each template contains:

Template ID

Display Image

Actual card HTML/Image

Short title & description

Templates can be stored in:

Database, or

Simple JSON file, or

Static assets folder

🧩 Folder Structure (Recommended)
Greetins/
│
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/greetings.py
│   │   ├── schemas.py
│   │   ├── utils/greeting_processor.py
│   │   └── models/
│   └── main.py
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/
    │   └── assets/templates/
    └── package.json

📬 Sending Options
Channel	Status	Notes
Email	✔ Supported	SMTP or third-party
WhatsApp	✔ Supported	Twilio or Meta API
SMS	Optional	Future extension
🔮 Future Enhancements

AI-generated greeting messages (Gemini / GPT)

User greeting history dashboard

Animated greeting cards

Multi-language greetings

Scheduled greetings (“Send on Christmas morning”)

🎉 Conclusion

Greetins is a clean, scalable, user-friendly greeting delivery system with a modern architecture.
By combining React, FastAPI, and optional AI features, the platform delivers a smooth experience for sending professional or personal greetings instantly.
