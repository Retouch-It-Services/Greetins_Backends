# Frontend-Backend Connection Setup Guide

## ✅ Connection Status

Your frontend and backend are now properly configured to communicate!

## 🚀 Quick Start

### 1. Start the Backend (FastAPI)
```bash
cd fastapi_app
pip install -r ../requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend will run at: `http://localhost:8000`

### 2. Start the Frontend (React)
```bash
cd frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 📡 API Endpoints Configuration

### Configured Endpoints:

#### ✅ Already Implemented:
- **GET** `/health` - Health check
- **POST** `/greetings/send` - Send greeting via email/WhatsApp

#### 🔧 Frontend Calls:
- `sendGreeting()` - Sends greeting data to backend
- `generateAIGreeting()` - Generates AI-powered greeting messages

---

## 🔌 Connection Details

### Backend CORS Configuration:
- ✅ Allows: `http://localhost:3000` (React app)
- ✅ Allows: `http://localhost:3001` (Alternative port)
- ✅ Allows: `http://localhost:5173` (Vite dev server)
- ✅ Credentials enabled
- ✅ All methods and headers allowed

### Frontend Configuration:
- `.env` file created with API base URL
- Axios is configured to use environment variable
- Fallback to `http://localhost:8000/api/v1` if env not set

---

## 📝 Data Flow

### Sending a Greeting:
1. User fills form in React component (`SendGreeting.jsx`)
2. Form data sent to FastAPI endpoint `/greetings/send`
3. Backend processes and stores in database
4. Response returned to frontend
5. User sees confirmation

### Generating AI Greeting:
1. User provides occasion, recipient info in `AIGreeting.jsx`
2. Request sent to `/ai/generate-greeting` endpoint
3. Backend generates personalized message
4. Response returned to frontend

---

## 🛠 Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

---

## ✨ Features Connected

✅ Template Selection → Backend Communication  
✅ Greeting Form Submission → Database Storage  
✅ AI Message Generation → Backend Processing  
✅ Email/WhatsApp Delivery → Integration Ready  

---

## 🐛 Troubleshooting

### Connection Issues?
1. Check if backend is running: `http://localhost:8000/health`
2. Check if frontend can access: Open browser console for CORS errors
3. Verify `.env` file in frontend folder
4. Check backend port (default: 8000)

### Port Already in Use?
- Backend: `uvicorn app.main:app --reload --port 8001`
- Frontend: `PORT=3001 npm start`

---

## 📦 Dependencies

### Backend:
- FastAPI
- SQLAlchemy
- Uvicorn
- Pydantic
- CORS Middleware

### Frontend:
- React
- Axios
- React Router
- Tailwind CSS

All dependencies are already configured in respective files!
