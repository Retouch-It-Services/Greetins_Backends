# 🗺️ Complete Route Map & Navigation Flow

## Frontend Routes

### **Route 1: Home Page**
```
URL: http://localhost:3000/
Component: Landing.jsx
Features:
  - Welcome header
  - Navigation menu (Home, Services, Price, About)
  - Call-to-action: "Create Cards" button
  - Greeting cards preview
Navigation: Click "Create Cards" → /templates
```

### **Route 2: Template Selection** (eCardForest Style)
```
URL: http://localhost:3000/templates
Component: TemplateSelection.jsx
Features:
  - Left sidebar with category filters:
    ☐ Birthday (12 cards)
    ☐ Christmas (12 cards)
    ☐ New Year (12 cards)
    ☐ Diwali (12 cards)
    ☐ Valentine (12 cards)
  - Search bar in sidebar
  - 3-column responsive grid
  - Green "Personalise" button on hover
  - Smooth animations
Navigation: Click card → /personalize/{templateId}
Example: Click birthday card → /personalize/birthday-1
```

### **Route 3: Personalize Card** ✨ (NEW)
```
URL: http://localhost:3000/personalize/{templateId}
Component: PersonalizeCard.jsx
Parameters: templateId (e.g., birthday-1, christmas-5)

Layout:
  Left Column (50%):           Right Column (50%):
  ┌──────────────────┐        ┌──────────────────┐
  │  Card Preview    │        │  Personalization │
  │  (envelope view) │        │  Form            │
  │                  │        │                  │
  │ [Upload button]  │        │ [Form fields]    │
  │                  │        │                  │
  │ [Preview toggle] │        │ [Finalize btn]   │
  └──────────────────┘        └──────────────────┘

Form Fields:
  1. "Who is this ecard for?"
     Input: Recipient's name (required)
     Icon: 👤
  
  2. "Your name (Sender)"
     Input: Sender name (optional)
     Icon: ✍️
  
  3. "Add a personal message"
     Input: Textarea (optional)
     Placeholder: "Write your greeting message..."
  
  4. "Add a free money collection"
     Checkbox: includeMoneyCollection
     Info button: ℹ️
     Conditional Input: Collection amount (₹)
     Icon: 💳

Buttons:
  - [Edit Mode] / [Preview Mode] (toggle below preview)
  - [✅ Finalize the card] (green, main action)

Navigation: Click "Finalize" → /send-greeting
State passed:
  {
    templateData: { id, title, imageUrl, occasion, ... },
    recipientName: "string",
    senderName: "string",
    customMessage: "string",
    uploadedImage: "base64 or null",
    includeMoneyCollection: boolean,
    collectionAmount: "number"
  }
```

### **Route 4: Send Greeting**
```
URL: http://localhost:3000/send-greeting
Component: SendGreeting.jsx
Receives state from: PersonalizeCard.jsx

Layout:
  Left Column (40%):           Right Column (60%):
  ┌──────────────────┐        ┌──────────────────┐
  │  Card Preview    │        │  Send Form       │
  │                  │        │                  │
  │ ┌──────────────┐ │        │ Delivery Method: │
  │ │              │ │        │ [📧] [💬]       │
  │ │  Card Image  │ │        │                  │
  │ │              │ │        │ Your Name: ✓     │
  │ │ Title        │ │        │ [pre-filled]     │
  │ │ Message      │ │        │                  │
  │ │ From: Sender │ │        │ Your Email:      │
  │ └──────────────┘ │        │ [             ]  │
  │                  │        │                  │
  │ 📧 Email         │        │ Recipient Email: │
  └──────────────────┘        │ [             ]  │
                              │                  │
                              │ Personal Message:│
                              │ [✓ pre-filled]   │
                              │ [Happy Birthday] │
                              │                  │
                              │ [Send via Email] │
                              │                  │
                              │ ✅ Status msg    │
                              └──────────────────┘

Pre-filled from PersonalizeCard:
  - sender_name ✓
  - message ✓
  - Card image ✓
  - Recipient name shown in preview ✓

Form Inputs:
  1. sender_email (required)
  2. recipient_email (required for email)
     OR recipient_whatsapp (required for WhatsApp)

Actions:
  - Toggle: Email ↔ WhatsApp
  - [Send via Email] or [Send via WhatsApp]

After submit:
  ✅ Message: "Greeting sent successfully!"
  ❌ Message: "Error message if failed"

Backend Endpoint: POST /api/v1/greetings/send
```

### **Route 5: AI Greeting** (Optional)
```
URL: http://localhost:3000/ai-greeting
Component: AIGreeting.jsx
Purpose: Generate greeting with AI
```

### **Route 6: About Page**
```
URL: http://localhost:3000/about
Component: About.jsx
```

---

## Backend API Routes

### **Send Greeting** (Main Endpoint)
```
POST http://localhost:8000/api/v1/greetings/send

Request Body:
{
  "sender_name": "monika",
  "sender_email": "monika@gmail.com",
  "sender_whatsapp": "",
  "recipient_email": "friend@gmail.com",
  "recipient_whatsapp": "",
  "greeting_template_id": "birthday-1",
  "message": "Happy Birthday!",
  "delivery_channel": "email"
}

Success Response (200):
{
  "status": "sent",
  "message": "Greeting sent successfully",
  "greeting_id": "uuid-here",
  "recipient": "friend@gmail.com",
  "delivery_channel": "email",
  "timestamp": "2025-12-06T12:34:56"
}

Error Response (400):
{
  "detail": "Error message here"
}
```

---

## Backend Processing Flow

```
Frontend: POST /api/v1/greetings/send
    ↓
Backend: greetings.py (send_greeting function)
    ↓
Process payload:
  - Validate all required fields
  - Load template data
    ↓
Processor: greeting_processor.py (process_and_send_greeting)
    ↓
Email sending: _send_email_via_zeptomail()
    │
    ├─ Check credentials:
    │  - ZEPTOMAIL_API_KEY ✓
    │  - ZEPTOMAIL_FROM_EMAIL ✓
    │
    ├─ Create headers:
    │  - Content-Type: application/json
    │  - Authorization: Zoho-enczapikey {KEY}
    │
    ├─ Create payload:
    │  - from.address: miraipath@ris.services
    │  - from.name: Greetins - monika
    │  - to[0].email_address.address: friend@gmail.com
    │  - subject: Happy Birthday!
    │  - htmlbody: <HTML email content>
    │
    └─ POST to ZeptoMail API:
       https://api.zeptomail.in/v1.1/email
       ↓
       Response: 200 OK
       ↓
       Return: success = true
    ↓
Save to Database:
  - Create Greeting record
  - Status: "sent"
    ↓
Return to Frontend:
  {
    "status": "sent",
    "message": "Greeting sent successfully"
  }
    ↓
Frontend: Show ✅ Success message
```

---

## Complete User Journey Example

### **Scenario: Send Birthday Greeting**

**Step 1: Landing Page**
```
Browser: http://localhost:3000/
User sees: Welcome page with "Create Cards" button
User action: Click "Create Cards" button
Navigation: → http://localhost:3000/templates
```

**Step 2: Template Selection**
```
Browser: http://localhost:3000/templates
Page shows:
  - Left sidebar with: Birthday, Christmas, New Year, Diwali, Valentine
  - 3-column grid with 12 birthday cards
  - Each card has image placeholder with green "Personalise" button on hover
User action: Click "Happy Birthday Colorful Cake" card
Navigation: → http://localhost:3000/personalize/birthday-1
```

**Step 3: Personalize Card**
```
Browser: http://localhost:3000/personalize/birthday-1
Page shows:
  - Left: Card preview with envelope, upload button
  - Right: Personalization form
Form inputs:
  1. "Who is this ecard for?" → User types: "Priya"
  2. "Your name (Sender)" → User types: "monika"
  3. "Add a personal message" → User types: "Happy Birthday! Wishing you a wonderful year ahead!"
  4. "Add a free money collection" → Checked ✓, Amount: ₹500
User action: Click "✅ Finalize the card" button
Frontend state: Saves all form data
Navigation: → http://localhost:3000/send-greeting
```

**Step 4: Send Greeting**
```
Browser: http://localhost:3000/send-greeting
Page shows:
  - Left: Card preview (shows "Happy Birthday Colorful Cake" + "From: monika")
  - Right: Send form with:
    - "Your Name: monika" (✓ pre-filled)
    - "Your Email: _______" (empty)
    - "Recipient Email: _______" (empty)
    - "Personal Message: Happy Birthday! Wishing..." (✓ pre-filled)
    - [Send via Email] button (purple/pink gradient)

User fills:
  - Your Email: monika@gmail.com
  - Recipient Email: priya@gmail.com

User action: Click [Send via Email] button
```

**Step 5: Backend Processing**
```
Backend receives POST /api/v1/greetings/send:
{
  "sender_name": "monika",
  "sender_email": "monika@gmail.com",
  "recipient_email": "priya@gmail.com",
  "greeting_template_id": "birthday-1",
  "message": "Happy Birthday! Wishing you a wonderful year ahead!"
}

Backend logs:
  Sending email via ZeptoMail...
  To: priya@gmail.com
  From: miraipath@ris.services
  API URL: https://api.zeptomail.in/v1.1/email
  ZeptoMail Response Status: 200
  ZeptoMail Response: {"request_id": "..."}
  ✓ Email sent successfully to priya@gmail.com

Database record created with status: "sent"
```

**Step 6: Frontend Response**
```
Frontend receives:
{
  "status": "sent",
  "message": "Greeting sent successfully"
}

User sees: ✅ Green notification
           "Greeting sent successfully to priya@gmail.com"

Email in Priya's inbox:
  From: Greetins - monika <miraipath@ris.services>
  Subject: Happy Birthday!
  Body: [HTML email with card image and message]
```

---

## State Management Summary

### **Navigation State Flow:**

```
Landing
  ↓ (click "Create Cards")
  
TemplateSelection (state: none)
  ↓ (click card)
  
PersonalizeCard (state: {templateData})
  ↓ (fill form + click Finalize)
  
SendGreeting (state: {
  templateData,
  recipientName,
  senderName,
  customMessage,
  uploadedImage,
  includeMoneyCollection,
  collectionAmount
})
  ↓ (fill email + click Send)
  
Backend POST /api/v1/greetings/send
  ↓ (process)
  
Success Response
  ↓ (show ✅ message)
```

---

## File Mappings

```
NAVIGATION                          FILE PATH
─────────────────────────────────   ─────────────────────────────
http://localhost:3000/             frontend/src/pages/Landing.jsx
http://localhost:3000/templates    frontend/src/pages/TemplateSelection.jsx
http://localhost:3000/personalize  frontend/src/pages/PersonalizeCard.jsx
http://localhost:3000/send-greeting frontend/src/pages/SendGreeting.jsx
http://localhost:3000/ai-greeting  frontend/src/pages/AIGreeting.jsx
http://localhost:3000/about        frontend/src/pages/About.jsx

API                                 FILE PATH
─────────────────────────────────   ─────────────────────────────
POST /greetings/send                fastapi_app/app/api/v1/endpoints/greetings.py
                                    + fastapi_app/app/utils/greeting_processor.py
```

---

## Quick Testing Checklist

```
□ Backend started (uvicorn main:app --reload)
□ Frontend started (npm start)
□ Browser: http://localhost:3000 loads
□ Click "Create Cards" navigates to /templates
□ Select a card navigates to /personalize/{id}
□ Fill form and click "Finalize" navigates to /send-greeting
□ Pre-filled fields show correctly
□ Fill recipient email and click "Send"
□ Backend shows "✓ Email sent successfully"
□ Success message appears on frontend
□ Check recipient inbox for email
```

---

**Everything is connected and ready to test! 🚀**
