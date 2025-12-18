# Quick Fix Guide - Team Member Image Upload

## Current Status ✓
- Backend: Port 8000
- Frontend: Port 5176  
- Database: PostgreSQL (Neon Cloud)
- CORS: Configured for port 5176

## How to Run

### Step 1: Start Backend
Open Terminal 1 and run:
```bash
cd fastapi_app
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

You should see:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Start Frontend  
Open Terminal 2 and run:
```bash
cd frontend
npm start
```

Should open in browser at `http://localhost:5176`

### Step 3: Test the API
Open Terminal 3 and run:
```bash
cd fastapi_app
python test_api.py
```

## Expected Output

### Creating Team Member
```
=================== TEST 1 ===================
Backend running on port 8000... OK

[TEST 2] Creating team member...
Status: 200
ID: 1
Name: John Doe
Role: Senior Developer
```

### Uploading Image
```
[TEST 3] Uploading image for member ID 1...
Status: 200
Message: Image uploaded successfully
Size: 450 bytes
```

## In the App

1. Go to "Meet Our Team" section
2. Click "Add New Team Member" button
3. Fill in:
   - Name: (e.g., "Alice")
   - Role: (e.g., "Designer")
   - Description: (e.g., "Creative designer")
   - Color Theme: Pick any theme
4. Click "📷 Upload Image" to select an image
5. Crop the image
6. Click "Add Member"

## If You Get an Error

### Error: "Cannot reach backend. Is it running on port 8000?"
- Make sure backend is running (see Step 1)
- Check if port 8000 is being used: `netstat -ano | find "8000"`

### Error: "Failed to add team member"
- Check backend console for detailed error messages
- Database might not be connected
- Check .env file has DATABASE_URL

### Error: "Cannot upload image"
- Image might be too large (max 5MB)
- Try a smaller image
- Check browser console (F12) for more details

## Debug Mode

To see detailed logs:
1. Backend terminal shows: `[CREATE MEMBER]`, `[UPLOAD IMAGE]` messages
2. Browser console (F12 > Console) shows request details
3. Check network tab to see exact API responses

## Files Modified
- `app/main.py` - Added CORS for port 5176
- `app/api/v1/endpoints/team_members.py` - Added detailed logging
- `test_api.py` - New test script
- `run_backend.py` - Alternative backend starter

## Questions?
Check the browser console (F12) and backend terminal output for error messages.
