# 🔧 Debugging Guide - Email Sending Issues

## ✅ Complete Checklist Before Testing

### Backend Setup
- [ ] Backend running: `cd fastapi_app && uvicorn main:app --reload`
- [ ] Check terminal shows: `INFO: Uvicorn running on http://127.0.0.1:8000`
- [ ] Environment variables loaded (check for no errors on startup)

### Frontend Setup
- [ ] Frontend running: `cd frontend && npm start`
- [ ] Check terminal shows: `Compiled successfully!`
- [ ] Browser: http://localhost:3000 loads

### ZeptoMail Configuration
- [ ] Verify `.env` has these values:
  ```
  ZEPTOMAIL_API_KEY=PHtE6r1YQuy4gjYq9xcI7Kew...
  ZEPTOMAIL_FROM_EMAIL=miraipath@ris.services
  ZEPTO_API_URL=https://api.zeptomail.in/v1.1/email
  ```
- [ ] Email from address is verified in ZeptoMail account

---

## 🧪 Complete Test Flow

### **Step 1: Navigate**
1. Open http://localhost:3000
2. Click "Create Cards" button
3. Click any **Birthday** card
4. Click **"Finalize the card"** button (recipient name optional for test)

### **Step 2: Fill Send Form**
```
Your Name: 
  → Test User (or your name)

Your Email: 
  → your-real-email@gmail.com (must be valid for reply)

Recipient Email:
  → test-recipient@gmail.com (or another real email)

Personal Message:
  → Leave empty (will use card title automatically)
```

### **Step 3: Submit**
- Click **"Send via Email"** button
- Watch browser console for response

### **Step 4: Check Results**

#### In Backend Terminal (look for):
```
Sending email via ZeptoMail...
To: test-recipient@gmail.com
From: miraipath@ris.services
API URL: https://api.zeptomail.in/v1.1/email
ZeptoMail Response Status: 200
✓ Email sent successfully to test-recipient@gmail.com
```

#### In Frontend:
- Should show: ✅ **"Greeting sent successfully via email!"**

#### In Recipient's Inbox:
- Wait 1-2 minutes
- Check test-recipient@gmail.com inbox
- Look for email from: miraipath@ris.services
- Subject: "Special Greeting from Test User"

---

## ❌ Common Issues & Fixes

### **Issue 1: "Field required" Error**
**Problem:** Missing required field
**Solution:** 
- Check that "Your Name" field is filled
- Check that "Your Email" field is filled
- Check that recipient email is filled
- Message field is optional (defaults to card title)

**Code Fix (Frontend):**
```jsx
// All these are now required:
- sender_name ✓ (Your Name)
- sender_email ✓ (Your Email)
- recipient_email ✓ (Recipient Email)
- message (auto-filled with card title if empty)
```

### **Issue 2: Email Not Sent (No Error Shown)**
**Problem:** Backend processing but no email sent
**Solutions:**

A. **Check ZeptoMail Credentials:**
```bash
cd fastapi_app
python -c "
import os
from dotenv import load_dotenv
load_dotenv()
print('API Key:', bool(os.environ.get('ZEPTOMAIL_API_KEY')))
print('From Email:', os.environ.get('ZEPTOMAIL_FROM_EMAIL'))
print('API URL:', os.environ.get('ZEPTO_API_URL'))
"
```

B. **Check Backend Logs:**
- Look in Terminal 1 (uvicorn) for "Sending email via ZeptoMail..."
- If not showing, check if email field is being sent

### **Issue 3: Email Received But Empty/Malformed**
**Problem:** Email arrives but content is wrong
**Solution:**
- This is expected, HTML formatting works
- Check Backend logs for HTML being generated

### **Issue 4: "Invalid email format" Error**
**Problem:** Email validation failed
**Solution:**
- Ensure email format is correct: `user@domain.com`
- No spaces before/after
- Valid domain extension (.com, .in, etc.)

### **Issue 5: Recipient Domain Blocked**
**Problem:** Email not delivered to certain domains
**Solution:**
- Try with Gmail (most reliable for testing)
- Try with different domain
- Check spam/junk folder

---

## 🔍 Step-by-Step Debugging

### **1. Check if request reaches backend:**

**Frontend Console (F12 → Console):**
```javascript
// Should show network tab with POST to /api/v1/greetings/send
```

**Backend Terminal Output:**
```
Received greeting request: {
  'sender_name': 'Test User',
  'sender_email': 'test@gmail.com',
  'recipient_email': 'friend@gmail.com',
  'greeting_template_id': 'birthday-1',
  'message': 'Happy Birthday Colorful Cake'
}
```

### **2. Check email sending:**

**Backend Terminal:**
```
Sending email via ZeptoMail...
To: friend@gmail.com
From: miraipath@ris.services
API URL: https://api.zeptomail.in/v1.1/email

ZeptoMail Response Status: 200
ZeptoMail Response: {"request_id": "ABC123XYZ"}
✓ Email sent successfully to friend@gmail.com
```

### **3. Check response received:**

**Frontend should show:**
- ✅ Success message displays
- Database record created

**Check Database:**
```bash
# In PostgreSQL:
SELECT * FROM greeting ORDER BY created_at DESC LIMIT 1;
```

---

## 📊 Expected Data Flow

```
Frontend Form Submission
    ↓
    {
      sender_name: "Test User",
      sender_email: "test@gmail.com",
      recipient_email: "friend@gmail.com",
      greeting_template_id: "birthday-1",
      message: "Happy Birthday Colorful Cake"
    }
    ↓
Backend /api/v1/greetings/send
    ↓
    Validates all required fields ✓
    ↓
process_and_send_greeting()
    ↓
    Uses message as-is (not empty)
    ↓
    Creates HTML email ✓
    ↓
    Calls _send_email_via_zeptomail()
    ↓
    ZeptoMail API
    ↓
    Response 200 OK ✓
    ↓
    Saves to database ✓
    ↓
    Returns success ✓
    ↓
Frontend displays ✅ Success
    ↓
Recipient receives email in inbox ✓
```

---

## 🚀 Quick Test with Minimal Data

Just to verify system is working:

```
1. Your Name: test
2. Your Email: your-gmail@gmail.com
3. Recipient: your-same-email@gmail.com (test with your own email)
4. Message: (leave empty - will auto-fill)
5. Click Send

Result: Should receive email from yourself within 2 minutes
```

---

## 📞 If Still Not Working

**Check these in order:**

1. ✅ Backend running without errors
2. ✅ Frontend making API requests (check Network tab in DevTools)
3. ✅ Backend logs show "Sending email via ZeptoMail..."
4. ✅ Backend logs show "Response Status: 200"
5. ✅ ZeptoMail credentials in .env are not expired
6. ✅ Email addresses are valid (try with Gmail)
7. ✅ Check spam/junk folder
8. ✅ Restart both backend and frontend

---

## ✅ Success Indicators

```
Frontend:
  ✅ Form submits without error
  ✅ Loading spinner appears
  ✅ Success message shows: "Greeting sent successfully via email!"

Backend:
  ✅ "Received greeting request" logged
  ✅ "Sending email via ZeptoMail..." logged
  ✅ "ZeptoMail Response Status: 200" logged
  ✅ "✓ Email sent successfully" logged

Database:
  ✅ New record created in greeting table

Email:
  ✅ Email appears in recipient inbox within 1-2 minutes
  ✅ From: miraipath@ris.services
  ✅ Subject: Special Greeting from [Sender Name]
  ✅ Contains greeting message
```

---

**If you get ✅ all of these, everything is working perfectly!**
