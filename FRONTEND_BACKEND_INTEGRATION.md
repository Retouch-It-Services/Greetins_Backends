# Greetins - Frontend & Backend Integration Guide

## ✅ What's Been Connected

Your frontend (React) and backend (FastAPI) are now fully integrated and ready to communicate!

### Updated Components:
1. ✅ **Frontend API Client** (`greetings.js`, `aiGreeting.js`) - Connected to backend
2. ✅ **Backend Endpoints** - Added AI greeting generation endpoint
3. ✅ **Data Schemas** - Added AI greeting request/response schemas
4. ✅ **CORS Configuration** - Already enabled for frontend ports
5. ✅ **Environment Configuration** - `.env` file for flexible API URL

---

## 🚀 Getting Started

### Step 1: Install Dependencies

**Backend:**
```bash
cd fastapi_app
pip install -r ../requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Set Up Environment Variables

**Backend** - Create `.env` file in `fastapi_app/`:
```env
GEMINI_API_KEY=your_gemini_key_here
ZEPTOMAIL_API_KEY=your_zeptomail_key_here
ZEPTOMAIL_FROM_EMAIL=your_email@example.com
DATABASE_URL=your_database_url
```

**Frontend** - Already configured in `frontend/.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

### Step 3: Start Services

**Option A: Quick Start (Windows)**
```bash
start-all.bat
```

**Option B: Quick Start (Linux/Mac)**
```bash
chmod +x start-all.sh
./start-all.sh
```

**Option C: Manual Start**

Terminal 1 - Backend:
```bash
cd fastapi_app
uvicorn app.main:app --reload --port 8000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

---

## 📡 API Endpoints

### Backend Base URL
```
http://localhost:8000/api/v1
```

### Available Endpoints

#### 1. Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "message": "Greetings API is running"
}
```

#### 2. Send Greeting
```
POST /greetings/send
```
**Request Body:**
```json
{
  "sender_name": "John",
  "sender_email": "john@example.com",
  "sender_whatsapp": "+1234567890",
  "recipient_email": "jane@example.com",
  "recipient_whatsapp": "+0987654321",
  "greeting_template_id": "birthday",
  "message": "Happy Birthday Jane!"
}
```
**Response:**
```json
{
  "message": "Greeting sent successfully",
  "status": "success",
  "delivery_channel": "email"
}
```

#### 3. Generate AI Greeting ⭐ NEW
```
POST /ai/generate-greeting
```
**Request Body:**
```json
{
  "occasion": "birthday",
  "recipient_name": "Jane",
  "relationship": "friend",
  "tone": "funny",
  "language": "english"
}
```
**Response:**
```json
{
  "generated_message": "Happy Birthday Jane! Another year older, another year wiser... or so they say!",
  "occasion": "birthday",
  "tone": "funny"
}
```

---

## 🔗 Frontend Components Integration

### SendGreeting Component
- **File:** `frontend/src/pages/SendGreeting.jsx`
- **Uses:** `sendGreeting()` from `greetings.js`
- **Flow:** Form → API Call → Database → Response

### AIGreeting Component
- **File:** `frontend/src/pages/AIGreeting.jsx`
- **Uses:** `generateAIGreeting()` from `aiGreeting.js`
- **Flow:** User Input → AI Generation → Message Preview → Send

### API Services
- **`frontend/src/api/greetings.js`** - Send greeting requests
- **`frontend/src/api/aiGreeting.js`** - Generate AI messages

---

## 🔧 Configuration Details

### CORS Configuration (Backend)
Allows requests from:
- ✅ `http://localhost:3000` (Default React port)
- ✅ `http://localhost:3001` (Alternative port)
- ✅ `http://localhost:5173` (Vite dev server)
- ✅ `http://127.0.0.1:*` (Local connections)

### Axios Configuration (Frontend)
- Base URL from environment variable: `REACT_APP_API_BASE_URL`
- Fallback: `http://localhost:8000/api/v1`
- Error handling included
- Automatic retry on failure

---

## 🧪 Testing the Connection

### Test 1: Backend Health Check
```bash
curl http://localhost:8000/health
```
Expected: `{"status":"ok","message":"Greetings API is running"}`

### Test 2: Frontend Access Backend
1. Open frontend: `http://localhost:3000`
2. Go to "Send Greeting" page
3. Fill form and submit
4. Check browser console for success/error

### Test 3: AI Greeting Generation
1. Open frontend: `http://localhost:3000`
2. Go to "AI Greeting" page
3. Fill occasion, recipient name, relationship
4. Click generate
5. Should see AI-generated message

---

## 📊 Data Flow Diagram

```
Frontend (React)
    ↓
Axios HTTP Request
    ↓
FastAPI Backend
    ↓
Business Logic / AI Generation
    ↓
Database Storage
    ↓
Response JSON
    ↓
Frontend (State Update)
    ↓
UI Display
```

---

## 🐛 Troubleshooting

### Issue: CORS Error in Browser Console
**Solution:**
1. Verify backend is running on port 8000
2. Check CORS configuration in `fastapi_app/app/main.py`
3. Ensure frontend URL matches allowed origins
4. Clear browser cache and reload

### Issue: Backend Not Found (Connection Refused)
**Solution:**
1. Start backend: `cd fastapi_app && uvicorn app.main:app --reload`
2. Check if port 8000 is available
3. Verify firewall settings

### Issue: API Call Fails with 500 Error
**Solution:**
1. Check backend console for error details
2. Verify environment variables are set
3. Check database connection
4. Review logs in backend terminal

### Issue: Frontend Won't Start
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📚 File Structure Reference

```
Greetins_Backends/
├── fastapi_app/
│   ├── app/
│   │   ├── api/v1/endpoints/
│   │   │   └── greetings.py         ← Main endpoints
│   │   ├── schemas.py               ← Data models
│   │   └── main.py                  ← FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SendGreeting.jsx     ← Send form
│   │   │   └── AIGreeting.jsx       ← AI generation
│   │   ├── api/
│   │   │   ├── greetings.js         ← Greeting API calls
│   │   │   └── aiGreeting.js        ← AI API calls
│   │   └── components/              ← Reusable components
│   ├── .env                         ← Frontend config
│   └── package.json
├── CONNECTION_SETUP.md              ← This file!
├── start-all.bat                    ← Windows startup
└── start-all.sh                     ← Linux/Mac startup
```

---

## ✨ Next Steps

1. **Test the connection:** Use the "Testing" section above
2. **Deploy:** Set up production environment variables
3. **Monitor:** Check logs for issues
4. **Extend:** Add more API endpoints as needed

---

## 📞 Support

For issues:
1. Check browser console for frontend errors
2. Check terminal for backend errors
3. Review this guide's troubleshooting section
4. Check backend logs for detailed error messages

---

## ✅ Checklist

- [x] Frontend configured with API base URL
- [x] Backend CORS enabled for frontend ports
- [x] API endpoints implemented
- [x] AI greeting generation integrated
- [x] Environment variables configured
- [x] Error handling in place
- [x] Ready for deployment

**Status:** ✅ FULLY CONNECTED AND READY TO USE!
