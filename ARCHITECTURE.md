# System Architecture Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│                    WEB BROWSER (User)                           │
│                    http://localhost:3000                        │
│                                                                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/CORS
                           │
        ┌──────────────────▼──────────────────┐
        │                                      │
        │     REACT FRONTEND                  │
        │     (localhost:3000)                │
        │                                      │
        │  ├─ App.jsx                         │
        │  ├─ pages/                          │
        │  │  ├─ Landing.jsx                  │
        │  │  ├─ SendGreeting.jsx             │
        │  │  ├─ AIGreeting.jsx               │
        │  │  └─ ...                          │
        │  └─ api/                            │
        │     ├─ greetings.js ────────┐       │
        │     └─ aiGreeting.js ────┐  │       │
        │                           │  │       │
        └───────────────────────────┼──┼───────┘
                                    │  │
                   ┌────────────────┘  └────────────────┐
                   │                                    │
                   │ Axios HTTP Requests                │
                   │ (JSON)                             │
                   │                                    │
        ┌──────────▼──────────────────────────┐      ┌─▼────────────────────────────────┐
        │ POST /greetings/send                │      │ POST /ai/generate-greeting       │
        │                                     │      │                                  │
        └──────────┬──────────────────────────┘      └─┬────────────────────────────────┘
                   │                                   │
                   └───────────────┬───────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │                              │
                    │    FASTAPI BACKEND          │
                    │    (localhost:8000)         │
                    │                              │
                    │  ├─ app/                    │
                    │  │  ├─ main.py              │
                    │  │  ├─ schemas.py           │
                    │  │  └─ api/v1/              │
                    │  │     └─ endpoints/        │
                    │  │        └─ greetings.py   │
                    │  ├─ models/                 │
                    │  │  └─ greeting.py          │
                    │  ├─ utils/                  │
                    │  │  └─ greeting_processor.py│
                    │  ├─ db/                     │
                    │  │  └─ session.py           │
                    │  └─ core/                   │
                    │     └─ database.py          │
                    │                              │
                    └──────────┬───────┬───────────┘
                               │       │
                ┌──────────────┘       └──────────────┐
                │                                     │
                │ Google Gemini API                   │ SQL Database
                │ (AI Generation)                     │ (Storage)
                │                                     │
                ▼                                     ▼
        ┌───────────────────┐             ┌──────────────────┐
        │  Gemini AI Model  │             │  PostgreSQL DB   │
        │  - Generate Text  │             │  - Greetings     │
        │  - Multi-language │             │  - Users         │
        │  - Personalized   │             │  - Templates     │
        └───────────────────┘             └──────────────────┘
```

---

## Data Flow: Sending a Greeting

```
User fills SendGreeting form
         │
         ▼
React collects form data
{
  sender_name: "John",
  sender_email: "john@example.com",
  recipient_email: "jane@example.com",
  greeting_template_id: "birthday",
  message: "Happy Birthday!"
}
         │
         ▼
axios.post("/greetings/send", formData)
         │
         ▼
         ├─ CORS Check ✓
         ├─ Headers Check ✓
         │
         ▼
FastAPI receives request
         │
         ▼
Validate data with Pydantic schema
         │
         ▼
process_and_send_greeting(payload)
         │
         ├─ Send email via ZeptoMail
         ├─ Send WhatsApp if needed
         │
         ▼
Create database record
         │
         ▼
Return GreetingSendResponse
{
  message: "Greeting sent successfully",
  status: "success",
  delivery_channel: "email"
}
         │
         ▼
axios resolves response
         │
         ▼
React updates UI with success message
         │
         ▼
User sees confirmation
```

---

## Data Flow: AI Greeting Generation

```
User fills AIGreeting form
{
  occasion: "birthday",
  recipient_name: "Jane",
  relationship: "friend",
  tone: "funny"
}
         │
         ▼
axios.post("/ai/generate-greeting", data)
         │
         ▼
FastAPI receives request
         │
         ▼
Validate data with AIGreetingRequest schema
         │
         ▼
Call _generate_ai_message()
         │
         ▼
         ├─ Build context from occasion + relationship
         ├─ Load prompts from YAML config
         │
         ▼
Call Google Gemini API
         │
         ▼
Gemini generates personalized message
         │
         ▼
Return message to FastAPI
         │
         ▼
FastAPI returns AIGreetingResponse
{
  generated_message: "Happy Birthday Jane! Another year older...",
  occasion: "birthday",
  tone: "funny"
}
         │
         ▼
React receives response
         │
         ▼
Display generated message in preview
         │
         ▼
User can copy/send or regenerate
```

---

## Technology Stack

### Frontend Stack
```
React 18.2.0
├─ React Router v6 (Navigation)
├─ Axios (HTTP Client)
├─ Tailwind CSS (Styling)
└─ JavaScript ES6+
```

### Backend Stack
```
FastAPI
├─ Pydantic (Data Validation)
├─ SQLAlchemy (ORM)
├─ Alembic (Migrations)
├─ Uvicorn (ASGI Server)
├─ Google Generative AI (Gemini)
└─ CORS Middleware (Cross-Origin)
```

### Database
```
PostgreSQL
├─ Greetings table
├─ Users table (optional)
└─ Templates table (optional)
```

### External Services
```
Google Gemini API (AI Generation)
ZeptoMail (Email Delivery)
WhatsApp API (SMS Delivery)
```

---

## CORS Flow

```
Browser Request from http://localhost:3000
         │
         ▼
Preflight OPTIONS request
         │
         ▼
Backend checks origin against allowed_origins
         │
         ▼
Allowed origins:
├─ http://localhost:3000 ✓
├─ http://localhost:3001 ✓
├─ http://localhost:5173 ✓
└─ http://127.0.0.1:* ✓
         │
         ▼
Return CORS headers
         │
         ▼
Browser allows actual request
         │
         ▼
POST /greetings/send
```

---

## Environment Configuration

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
                              │
                              ├─ Protocol: http
                              ├─ Host: localhost
                              ├─ Port: 8000
                              └─ Path: /api/v1
```

### Backend (.env)
```
GEMINI_API_KEY=xxx...
ZEPTOMAIL_API_KEY=xxx...
ZEPTOMAIL_FROM_EMAIL=xxx...
DATABASE_URL=postgresql://user:pass@localhost/greetins
```

---

## Error Handling Flow

```
API Request
     │
     ├─ Network Error
     │  └─ Frontend fallback (local generation)
     │
     ├─ 400 Bad Request
     │  └─ Display validation error
     │
     ├─ 500 Server Error
     │  ├─ Log error in backend console
     │  └─ Display "Error generating greeting"
     │
     └─ Success (200/201)
        └─ Process response data
```

---

## Deployment Architecture

```
Production:
┌─────────────────────────────────────┐
│     Nginx / Reverse Proxy           │
├─────────────────────────────────────┤
│  Frontend      │      Backend       │
│  (port 3000)   │    (port 8000)     │
│  Served static │  FastAPI Server    │
│  React build   │  Uvicorn ASGI      │
└─────────────────────────────────────┘
         │                   │
         │                   ├─ PostgreSQL
         │                   ├─ Redis Cache
         │                   └─ External APIs
         │
    (CDN for assets)
```

---

## Status: ✅ Fully Connected

All components are properly integrated and communicating through HTTP/REST API.
