# How to Run Greetins App

## Ports Configured
- **Backend:** Port 8000
- **Frontend:** Port 3000

## Step 1: Start Backend

**Option A - Double Click (EASY):**
1. Double-click: `START_BACKEND.bat`
2. Wait for message: "Server is running on port 8000"

**Option B - Terminal:**
```bash
cd fastapi_app
python simple_server.py
```

Output should show:
```
Greetins Backend Started
URL: http://127.0.0.1:8000
```

## Step 2: Start Frontend

Open a new terminal and run:
```bash
cd frontend
npm start
```

Should automatically open browser to: `http://localhost:3000`

## Step 3: Test the App

1. Go to "Meet Our Team" section
2. Click "Add New Team Member"
3. Fill in:
   - Name
   - Role  
   - Description
   - Color Theme
4. Click "📷 Upload Image" to add a photo
5. Click "Add Member" button

**It should work now!** ✓

## Troubleshooting

### Backend Won't Start
- Check if port 8000 is free: `netstat -ano | find "8000"`
- If something is using it, kill it or wait

### Frontend Can't Connect
- Make sure backend is running first
- Check backend console for any errors
- Port should show as listening

### Image Upload Fails
- Make sure image file is selected
- Image will be stored in memory while backend runs
- Restart backend to clear data

## Files Used
- `fastapi_app/simple_server.py` - Backend server
- `frontend/` - React application
- Both share API on port 8000

Done! The app is now working with backend port 8000 and frontend port 3000.
