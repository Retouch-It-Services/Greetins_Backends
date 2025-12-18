# 🚀 Quick Start Guide

## Start Everything in 2 Minutes

### **Terminal 1: Backend (FastAPI)**
```bash
cd c:\Users\user\Documents\GitHub\Greetins_Backends\fastapi_app
uvicorn main:app --reload
```

Wait for:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### **Terminal 2: Frontend (React)**
```bash
cd c:\Users\user\Documents\GitHub\Greetins_Backends\frontend
npm start
```

Wait for:
```
Compiled successfully!
You can now view frontend in the browser. Local: http://localhost:3000
```

### **Browser: Open http://localhost:3000**

---

## Test the Complete Flow (2 Minutes)

### **Step 1: Create a Card (30 seconds)**
1. Click **"Create Cards"** button on landing page
2. Choose **any Birthday card** from the grid
3. You should see the **Personalize Card page**

### **Step 2: Fill Personalization Form (30 seconds)**
Fill in these fields:
```
Who is this ecard for?
→ Recipient Name: "Test Friend"

Your name (Sender)
→ Sender Name: "Your Name"

Add a personal message
→ Message: "Happy Birthday! Have a great day!"

Money Collection: Leave checked ✓
Amount: 500 (Indian Rupees)
```

Click **"✅ Finalize the card"** button

### **Step 3: Send the Greeting (1 minute)**
Fill in the Send Greeting form:
```
Your Email
→ your-email@gmail.com

Recipient Email
→ test-recipient@gmail.com
```

Click **"Send via Email"** button

### **Expected Result:**
✅ Green success message: "Greeting sent successfully!"

---

## Verify Email Was Sent

### **Check Backend Logs**
In Terminal 1, you should see:
```
Sending email via ZeptoMail...
To: test-recipient@gmail.com
From: miraipath@ris.services
API URL: https://api.zeptomail.in/v1.1/email
ZeptoMail Response Status: 200
✓ Email sent successfully to test-recipient@gmail.com
```

### **Check Recipient's Inbox**
- Check email at: test-recipient@gmail.com
- Look for email from: miraipath@ris.services
- Subject: Should match your template (e.g., "Happy Birthday Colorful Cake")
- Contains: Your personalized message

---

## Features You Can Try

### **1. Different Card Types**
- Birthday (12 cards)
- Christmas (12 cards)
- New Year (12 cards)
- Diwali (12 cards)
- Valentine (12 cards)

### **2. Left Sidebar Filtering**
Click category filters on left:
- ☐ Birthday
- ☐ Christmas
- ☐ New Year
- ☐ Diwali
- ☐ Valentine

### **3. Search Cards**
Type in search box to find specific cards

### **4. Upload Custom Image**
On PersonalizeCard page:
- Click the card preview area
- Upload a custom image to use as card cover

### **5. Toggle Preview Mode**
- Click "Preview Mode" to see how card looks
- Click "Edit Mode" to go back to form

### **6. Money Collection**
- Check/uncheck money collection checkbox
- Change collection amount

### **7. Delivery Methods**
On SendGreeting page:
- Choose between Email (📧) and WhatsApp (💬)
- Fill appropriate contact info

---

## Troubleshooting

### **Backend won't start**
```
Error: Address already in use
Solution: Change port in command:
  uvicorn main:app --reload --port 8001
Then in frontend .env:
  REACT_APP_API_BASE_URL=http://localhost:8001/api/v1
```

### **Frontend won't start**
```
Error: npm command not found
Solution: Install Node.js from https://nodejs.org/
Then: npm install
```

### **Can't connect to API**
```
Error: Network request failed
Solution:
1. Make sure backend is running on http://localhost:8000
2. Check .env file has correct API URL
3. Check CORS is enabled in backend
```

### **Email not being sent**
```
Check backend logs for:
- "ERROR: ZeptoMail credentials not configured!"
  → Make sure .env file has API keys
- "ZeptoMail API error: 401"
  → API key might be expired, get new one
- "ZeptoMail API error: 400"
  → Check email format and recipient email validity
```

---

## File Locations

```
Backend Config:
  c:\Users\user\Documents\GitHub\Greetins_Backends\fastapi_app\.env
  (Contains: ZEPTOMAIL_API_KEY, ZEPTOMAIL_FROM_EMAIL, ZEPTO_API_URL)

Frontend Config:
  c:\Users\user\Documents\GitHub\Greetins_Backends\frontend\.env
  (Contains: REACT_APP_API_BASE_URL)

Main Backend:
  c:\Users\user\Documents\GitHub\Greetins_Backends\fastapi_app\main.py

Main Frontend:
  c:\Users\user\Documents\GitHub\Greetins_Backends\frontend\src\App.jsx

Pages:
  frontend/src/pages/Landing.jsx
  frontend/src/pages/TemplateSelection.jsx
  frontend/src/pages/PersonalizeCard.jsx ← NEW!
  frontend/src/pages/SendGreeting.jsx
```

---

## Current Features ✅

- ✅ eCardForest-style template selection page
- ✅ Left sidebar with category filters
- ✅ Search functionality
- ✅ 3-column responsive grid
- ✅ Green "Personalise" button on hover
- ✅ **NEW: Personalize Card page with preview**
- ✅ Recipient name field
- ✅ Sender name field
- ✅ Custom message field
- ✅ Money collection checkbox
- ✅ Upload custom image
- ✅ Send via Email
- ✅ ZeptoMail integration (working!)
- ✅ Database storage
- ✅ Success/error notifications
- ✅ Loading spinner

---

## Next Steps

After testing:
1. Replace placeholder images with real card designs
2. Add WhatsApp integration
3. Add user accounts
4. Add card tracking
5. Add payment integration

---

## Quick Commands Reference

```bash
# Start Backend
cd fastapi_app && uvicorn main:app --reload

# Start Frontend
cd frontend && npm start

# Check Environment Variables
cd fastapi_app && python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('Config:', {
'API_KEY': bool(os.environ.get('ZEPTOMAIL_API_KEY')),
'FROM_EMAIL': os.environ.get('ZEPTOMAIL_FROM_EMAIL'),
'ZEPTO_URL': os.environ.get('ZEPTO_API_URL')
})"

# Reinstall Frontend Dependencies
cd frontend && rm -r node_modules && npm install

# Run Database Migration
cd fastapi_app && alembic upgrade head
```

---

**You're all set! Happy greeting! 🎉**

Start the two servers above and navigate to http://localhost:3000 to begin!
