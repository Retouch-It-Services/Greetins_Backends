# Quick Checklist - Image Upload 400 Error

## 🔍 Before Uploading Image

### Step 1: Start Backend
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload
```
✅ Should show: `Uvicorn running on http://127.0.0.1:8000`

### Step 2: Start Frontend
```bash
cd frontend
npm start
```
✅ Should open browser at `http://localhost:3000`

### Step 3: Verify Backend Connection
Open browser: `http://localhost:8000/api/v1/team-members/test`
✅ Should show: `{"status":"OK","message":"Database connected"...}`

## ✍️ Adding Team Member

1. ✅ Click "Add New Team Member"
2. ✅ Fill in: Name, Role, Description
3. ✅ Choose Color Theme
4. ✅ Click "📷 Upload Image"
5. ✅ Choose an image file

## ✂️ Cropping Image

1. ✅ Click "📐 Quick Presets" → "Square (300x300)"
2. ✅ Click "👁️ Update Preview"
3. ✅ Check preview looks good
4. ✅ Click "✅ Save & Crop"

## 🐛 If You Get 400 Error

### Check 1: Backend Logs
Look at terminal running `uvicorn app.main:app --reload`

Search for:
- ✅ "Uploading image for member:" - Good
- ❌ "Error decoding/saving image:" - Image problem
- ❌ "Image too large:" - Crop smaller
- ❌ "Image bytes size:" - Check size < 5MB

### Check 2: Browser Console
Press F12 → Console tab

Search for:
- ✅ "Image uploaded successfully:" - Good
- ❌ "Upload failed:" - Read the message
- ❌ "Cannot reach backend:" - Start backend
- ❌ "Request failed with status code 400" - Check backend logs

### Check 3: Image Size
In browser console, you'll see: "Image size: X.XX MB"
- ✅ < 1 MB - Good
- ⚠️ 1-5 MB - OK but slow
- ❌ > 5 MB - TOO LARGE, crop smaller

## 🎯 What Happens When Successful

### Frontend Shows:
```
✅ Image uploaded successfully!
```

### Backend Logs Show:
```
Uploading image for member: 1
Image data length: 45000
Base64 data length after cleanup: 33750
Image bytes size: 25.31 KB (0.02 MB)
Image uploaded successfully for member 1
```

### Database Gets:
- Member record with ID
- Image data as binary blob
- Image filename

## 📋 Most Common Issues

| Issue | Solution |
|-------|----------|
| 400 error | Check backend logs first |
| Cannot reach backend | Start: `python -m uvicorn app.main:app --reload` |
| Image too large | Crop to Square (300x300) |
| Team member not found | Reload page, try again |
| Timeout error | Image too large, crop smaller |
| CORS error | Frontend & backend must both run |

## 🚀 Quick Fix for 400 Error

1. **Stop backend** (Ctrl+C)
2. **Stop frontend** (Ctrl+C)
3. **Restart backend:**
   ```bash
   cd fastapi_app
   python -m uvicorn app.main:app --reload
   ```
4. **Restart frontend:**
   ```bash
   cd frontend
   npm start
   ```
5. **Try again:** Add new member and upload image

## 📱 Check These Before Asking for Help

- [ ] Backend running?
- [ ] Frontend running?
- [ ] Database connected (test endpoint returns OK)?
- [ ] Image < 5MB?
- [ ] Using Square (300x300) preset?
- [ ] Checked backend logs for errors?
- [ ] Checked browser console for errors?
- [ ] Restarted both servers?

## ✅ Success Looks Like

1. Click "Add New Team Member"
2. Fill form → Select image → Crop to square → "Save & Crop"
3. See: "✅ Image uploaded successfully!"
4. See: Team member appears in carousel with image
5. Refresh page → Image still there ✨

---

**Need help?**
1. Check backend logs (terminal running uvicorn)
2. Check browser console (F12 → Console)
3. Read IMAGE_UPLOAD_FIX.md for detailed troubleshooting
