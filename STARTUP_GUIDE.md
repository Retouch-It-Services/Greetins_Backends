# How to Start the Greetins Application

## Quick Start (Recommended)

1. **Run the start-all.bat file** - This will automatically start both the backend and frontend:
   ```
   Double-click: start-all.bat
   ```
   This will open two terminal windows:
   - Terminal 1: Backend (FastAPI) running on http://localhost:8000
   - Terminal 2: Frontend (React) running on http://localhost:3000

2. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

3. **Wait for the app to fully load** (about 10-15 seconds)

---

## Manual Start (If Needed)

### Start Backend:
```bash
cd c:\Users\user\Documents\GitHub\Greetins_Backends\fastapi_app
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Start Frontend (in a separate terminal):
```bash
cd c:\Users\user\Documents\GitHub\Greetins_Backends\frontend
npm start
```

---

## Troubleshooting

### "Network Error: Unable to connect to server"
This means the backend is not running. Make sure:
1. The backend terminal shows: `Uvicorn running on http://127.0.0.1:8000`
2. Port 8000 is not being used by another application
3. Wait 10 seconds after starting for the backend to fully initialize

### "Module not found: psycopg2"
Run:
```bash
pip install psycopg2-binary
```

### Port Already in Use
- **Backend (8000)**: Change the port number in start-all.bat and update REACT_APP_API_BASE_URL in frontend/.env
- **Frontend (3000)**: React will automatically use port 3001 if 3000 is taken

### Database Connection Error
The app requires a PostgreSQL database. If you see database errors:
1. Check that DATABASE_URL in fastapi_app/.env is correct
2. Verify the database server is running
3. Check internet connection (the database is hosted on Neon Cloud)

---

## API Endpoints

Once the backend is running, you can test it:

- **Health Check**: http://localhost:8000/docs
- **Send Greeting**: POST http://localhost:8000/api/v1/greetings/send
- **Generate AI Message**: POST http://localhost:8000/api/v1/ai/generate-greeting

---

## Common Issues

**Issue**: Frontend keeps saying "Network Error"
**Solution**: 
1. Verify backend is running (check for "Uvicorn running" message)
2. Wait 10 seconds for backend to fully start
3. Refresh the frontend page (Ctrl+R or Cmd+R)
4. Check that frontend/.env has: `REACT_APP_API_BASE_URL=http://localhost:8000/api/v1`

**Issue**: Emails not sending (❌ Network Error in email)
**Solution**:
1. Check that ZEPTOMAIL_API_KEY is set in fastapi_app/.env
2. Check that ZEPTOMAIL_FROM_EMAIL is set
3. Look at backend terminal output for detailed error messages

