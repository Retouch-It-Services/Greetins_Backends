# 🎉 Greetins - Complete User Flow Guide

## ✅ Complete System Ready

Your Greetins application is now fully set up with:
- ✅ Frontend (React) with eCardForest-style UI
- ✅ Backend (FastAPI) with email integration
- ✅ ZeptoMail email service configured
- ✅ Complete personalization flow
- ✅ Database integration

---

## 🚀 How to Run the Application

### **Step 1: Start the Backend (FastAPI)**

Open a terminal in `fastapi_app` folder:

```bash
cd fastapi_app
uvicorn main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### **Step 2: Start the Frontend (React)**

Open another terminal in `frontend` folder:

```bash
npm start
```

**Expected Output:**
```
webpack compiled with X warnings
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

### **Step 3: Open in Browser**

Go to: **http://localhost:3000**

---

## 📱 Complete User Journey

### **Page 1: Landing Page**
- Shows "Greetins" header with navigation
- Shows greeting cards preview
- Click **"Create Cards"** button

### **Page 2: Template Selection** (eCardForest Style)
```
┌─────────────────────────────────────────────┐
│ Left Sidebar:                 │ 3-Column Grid: │
│ ☐ Birthday                    │               │
│ ☐ Christmas                   │ 🎂 🎂 🎂       │
│ ☐ New Year                    │ 🎂 🎂 🎂       │
│ ☐ Diwali                      │ 🎂 🎂 🎂       │
│ ☐ Valentine                   │ 🎂 🎂 🎂       │
└─────────────────────────────────────────────┘
```

- Filter cards by occasion (left sidebar)
- Search for specific cards
- **Click any card image** → Opens PersonalizeCard page

### **Page 3: Personalize Card** ✨ (NEW - eCardForest Style)

**Left Side - Card Preview:**
- Shows card with envelope design
- Upload custom cover image button
- Preview toggle button

**Right Side - Personalization Form:**
```
Who is this ecard for?
┌─────────────────────────────┐
│ 👤 Recipient's name         │
└─────────────────────────────┘

Your name (Sender)
┌─────────────────────────────┐
│ ✍️ Your name                │
└─────────────────────────────┘

Add a personal message
┌─────────────────────────────┐
│ Write your greeting message │
│ (4 line textarea)           │
└─────────────────────────────┘

☑ Add a free money collection ℹ️
  💳 500 Indian Rupees (₹)

    [✅ Finalize the card]
```

**Form Fields:**
- ✅ Recipient Name (required)
- ✅ Sender Name (optional, pre-filled if you entered it)
- ✅ Personal Message (optional)
- ✅ Money Collection Toggle (default: ON)
- ✅ Collection Amount in ₹

**Action:** Click **"Finalize the card"** → Goes to Send Greeting

### **Page 4: Send Greeting**

```
┌──────────────────┐  ┌──────────────────────────┐
│ Card Preview:    │  │ Send Your Greeting:      │
│                  │  │                          │
│ ┌──────────────┐ │  │ Delivery Method:         │
│ │              │ │  │ [📧 Email] [💬 WhatsApp]│
│ │  Card Image  │ │  │                          │
│ │              │ │  │ Your Name:               │
│ │ Happy Bday   │ │  │ [monika          ]       │
│ │              │ │  │                          │
│ │ From: monika │ │  │ Your Email:              │
│ └──────────────┘ │  │ [your@email.com         ]│
│                  │  │                          │
│ 📧 Email         │  │ Recipient Email:         │
└──────────────────┘  │ [recipient@email.com    ]│
                      │                          │
                      │ Personal Message:        │
                      │ [Happy Birthday...]      │
                      │                          │
                      │ [Send via Email        ]│
                      └──────────────────────────┘
```

**Pre-filled from PersonalizeCard:**
- ✅ Sender Name (from personalization form)
- ✅ Personal Message (from personalization form)
- ✅ Card Image (from template selection)

**Fill in:**
- Email/WhatsApp recipient details
- Sender email (your email)

**Action:** Click **"Send via Email"** → Email sent via ZeptoMail!

---

## 📧 Email Sending Flow

### **Backend Processing:**

```python
1. User clicks "Send via Email"
   ↓
2. Frontend sends POST to /api/v1/greetings/send
   ↓
3. Backend receives: {
     sender_name: "monika",
     sender_email: "your@email.com",
     recipient_email: "friend@email.com",
     message: "Happy Birthday!",
     greeting_template_id: "birthday-1"
   }
   ↓
4. Backend processes greeting:
   - Generates HTML email content
   - Creates database record
   ↓
5. Calls ZeptoMail API:
   POST https://api.zeptomail.in/v1.1/email
   Headers: Authorization: Zoho-enczapikey {KEY}
   ↓
6. ZeptoMail sends email to recipient
   ↓
7. Returns success message to frontend
   ↓
8. User sees: ✅ Greeting sent successfully!
```

### **ZeptoMail Configuration:**

Your credentials are in `fastapi_app/.env`:

```env
ZEPTOMAIL_API_KEY=PHtE6r1YQuy4gjYq9xcI7Kew...
ZEPTOMAIL_FROM_EMAIL=miraipath@ris.services
ZEPTO_API_URL=https://api.zeptomail.in/v1.1/email
```

---

## 🧪 Test the Complete Flow

### **Test Step-by-Step:**

1. **Start Backend:**
   ```bash
   cd fastapi_app
   uvicorn main:app --reload
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **In Browser (http://localhost:3000):**
   - Click "Create Cards" on landing page
   - Select a birthday card
   - Fill personalization form:
     - Recipient: "Test User"
     - Sender: "Your Name"
     - Message: "Happy Birthday!"
   - Click "Finalize the card"
   - Fill send form:
     - Your Email: your-email@gmail.com
     - Recipient Email: friend-email@gmail.com
   - Click "Send via Email"

4. **Check Results:**
   - Backend terminal shows: `✓ Email sent successfully to friend-email@gmail.com`
   - Friend receives greeting email

### **Expected Backend Logs:**

```
Sending email via ZeptoMail...
To: friend@email.com
From: miraipath@ris.services
API URL: https://api.zeptomail.in/v1.1/email
ZeptoMail Response Status: 200
ZeptoMail Response: {"request_id": "..."}
✓ Email sent successfully to friend@email.com
```

---

## 🗂️ Project Structure

```
Greetins_Backends/
├── frontend/                          # React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx           # 1. Starting page
│   │   │   ├── TemplateSelection.jsx # 2. Card grid (eCardForest style)
│   │   │   ├── PersonalizeCard.jsx   # 3. Form + preview (NEW!)
│   │   │   ├── SendGreeting.jsx      # 4. Send + confirm
│   │   │   └── AIGreeting.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── FormInput.jsx
│   │   │   └── ...
│   │   ├── api/
│   │   │   └── greetings.js          # API calls
│   │   └── App.jsx                   # Routes
│   └── .env                          # Frontend config
│
├── fastapi_app/                       # Backend
│   ├── app/
│   │   ├── api/v1/endpoints/
│   │   │   └── greetings.py          # Email endpoint
│   │   ├── utils/
│   │   │   └── greeting_processor.py # Email + AI logic
│   │   ├── models/
│   │   │   └── greeting.py           # Database model
│   │   ├── schemas.py                # Data validation
│   │   └── main.py
│   ├── .env                          # Backend config (ZeptoMail keys)
│   └── alembic/                      # Database migrations
│
└── README.md
```

---

## ⚙️ Configuration Files

### **Frontend: `frontend/.env`**
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

### **Backend: `fastapi_app/.env`**
```env
DATABASE_URL=postgresql://...
GEMINI_API_KEY=AIzaSy...
ZEPTOMAIL_API_KEY=PHtE6r1YQuy4gjYq9xcI7Kew...
ZEPTOMAIL_FROM_EMAIL=miraipath@ris.services
ZEPTO_API_URL=https://api.zeptomail.in/v1.1/email
```

---

## 🎨 UI Features Implemented

### **TemplateSelection Page:**
- ✅ eCardForest-style layout
- ✅ Left sidebar with category filters
- ✅ Search functionality
- ✅ 3-column responsive grid
- ✅ Green "Personalise" button on hover
- ✅ Smooth slide-in animations
- ✅ 48 pre-built cards (12 per occasion × 4 occasions)

### **PersonalizeCard Page:** (NEW)
- ✅ Split layout (preview left, form right)
- ✅ Card envelope design with upload option
- ✅ Recipient name field
- ✅ Sender name field
- ✅ Personal message textarea
- ✅ Money collection checkbox with amount
- ✅ Preview mode toggle
- ✅ Green "Finalize the card" button

### **SendGreeting Page:**
- ✅ Email/WhatsApp delivery options
- ✅ Card preview
- ✅ Form with all recipient details
- ✅ Success/error notifications
- ✅ Loading spinner during submission

---
## 🐛 Debugging

### **If emails aren't sending:**

1. **Check environment variables are loaded:**
   ```bash
   cd fastapi_app
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('API Key:', bool(os.environ.get('ZEPTOMAIL_API_KEY'))); print('From Email:', os.environ.get('ZEPTOMAIL_FROM_EMAIL'))"
   ```

3. **Check backend logs:**
   - Look for "Sending email via ZeptoMail..."
   - Look for response status code
   - Look for error messages

4. **Common issues:**
   - ❌ API Key expired → Get new one from ZeptoMail
   - ❌ From email not verified → Verify in ZeptoMail account
   - ❌ Recipient email invalid → Check email format
   - ❌ Connection timeout → Check internet connection

---

## 📊 Database Schema

### **Greeting Model:**
```python
- id: UUID (Primary Key)
- sender_name: String
- sender_email: String
- sender_whatsapp: String
- recipient_email: String
- recipient_whatsapp: String
- greeting_template_id: String
- message: String
- delivery_channel: String (email/whatsapp)
- status: String (sent/pending/failed)
- ai_generated: Boolean
- created_at: DateTime
- updated_at: DateTime
```

---

## ✨ Next Features (Optional)

- [ ] Money collection actual payment processing
- [ ] WhatsApp integration for delivery
- [ ] Card tracking (when recipient opens email)
- [ ] Card rating/feedback
- [ ] User accounts & card history
- [ ] Real card design images instead of placeholders
- [ ] Custom card editor (draw/paint)
- [ ] Video greeting support

---

## 📞 Support

If you need help:

1. Check backend logs for errors
2. Verify environment variables are set
3. Check network connectivity
4. Ensure ports 3000 (frontend) and 8000 (backend) are available

---

**Happy Greeting! 🎉**

Your application is ready to send personalized greeting cards! 💌
