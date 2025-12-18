# Image Upload - 400 Error Fix

## What Was Wrong

The image upload endpoint wasn't handling the base64 data correctly or providing helpful error messages.

## What I Fixed

### Backend (`app/api/v1/endpoints/team_members.py`)
✅ Added detailed logging to see what's happening  
✅ Better base64 decoding error handling  
✅ File size validation (max 5MB)  
✅ Specific error messages for each failure  

### Frontend (`api/teamMembers.js`)
✅ Added image size check before sending  
✅ Better error messages from backend  
✅ Connection timeout handling  
✅ Detailed console logging  

### Component (`components/TeamCarousel.jsx`)
✅ Better error display with emojis  
✅ Console logging for debugging  

## How to Debug

### Step 1: Check Backend Logs
When you try to upload an image, look at the terminal running:
```bash
python -m uvicorn app.main:app --reload
```

You should see logs like:
```
Uploading image for member: 1
Image data length: 45000
Base64 data length after cleanup: 33750
Image bytes size: 25.31 KB (0.02 MB)
Image uploaded successfully for member 1
```

If you see errors there, that's your issue!

### Step 2: Check Browser Console
Press F12 → Console tab

You should see:
```
Uploading image for member: 1
Image data length: 45000
Image size: 0.04 MB
Sending upload request...
Image uploaded successfully: {...}
```

### Step 3: Check Network Tab
Press F12 → Network tab → Upload image

Look at the POST request to `/api/v1/team-members/1/upload-image-base64`
- **Status: 200** ✅ Success
- **Status: 400** ❌ Bad request (check Response tab for error)
- **Status: 404** ❌ Member not found
- **Status: 500** ❌ Server error

## Common Issues & Fixes

### Issue 1: "Image too large"
**Problem:** Image is larger than 5MB  
**Solution:** Crop it smaller using the cropper interface

### Issue 2: "Cannot reach backend"
**Problem:** Backend not running  
**Solution:**
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload
```

### Issue 3: "Team member not found"
**Problem:** Member ID doesn't exist  
**Solution:** Reload page, make sure you're editing an existing member

### Issue 4: No error message, just 400
**Problem:** Unknown error  
**Solution:**
1. Check backend logs (terminal)
2. Check browser Network tab → Response body
3. Check browser Console for error details

## Testing Image Upload Manually

### Using curl:
```bash
# Create a team member first
curl -X POST http://localhost:8000/api/v1/team-members \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","role":"Dev","description":"Test"}'
# Note the returned ID

# Upload image (replace BASE64_DATA and ID)
curl -X POST "http://localhost:8000/api/v1/team-members/1/upload-image-base64" \
  -F "image_data=@image.jpg" \
  -F "filename=test.jpg"
```

### Using JavaScript in browser console:
```javascript
// Get the base64 data from an image
const response = await fetch('http://localhost:8000/api/v1/team-members/1/upload-image-base64', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  body: new FormData(/* form with image */)
});
console.log(await response.json());
```

## Size Limits

- **Frontend validation:** Max 5MB
- **Backend validation:** Max 5MB
- **Database:** Depends on field size (LONGBLOB in MySQL = 4GB max)

**If image is too large:**
1. Crop it to smaller dimensions using the cropper
2. Use the "Small" preset (250x250) instead of large sizes

## Performance Tips

### Smaller images = faster uploads
- Square (300x300) = ~30-100KB ✅
- Square (500x500) = ~100-300KB ✅
- Large images > 2MB = Too slow ❌

### Best Practice
1. Upload original image
2. Crop to square using "Square (300x300)" preset
3. Click "Update Preview" to verify
4. Click "✅ Save & Crop"

## Still Having Issues?

### Check These in Order:
1. ✅ Backend running? (`curl http://localhost:8000/`)
2. ✅ Member exists? (Create one first if needed)
3. ✅ Image size < 5MB? (Check cropper dimensions)
4. ✅ Browser console shows errors? (Read the error message)
5. ✅ Backend logs show errors? (Check terminal running uvicorn)

### Restart Everything:
```bash
# Terminal 1: Backend
cd fastapi_app
python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm start
```

Then try uploading again.

## Monitoring Upload

### Real-time Debug Info Shown:
- ✅ Image size in MB
- ✅ Upload progress
- ✅ Success/failure message
- ✅ Error details if it fails

### Check These Files for Logs:
- Backend: Terminal where `uvicorn` is running
- Frontend: Browser DevTools → Console tab
- Network: Browser DevTools → Network tab
