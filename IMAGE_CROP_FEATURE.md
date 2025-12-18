# Image Crop Feature - User & Developer Guide

## Overview
Users can now crop and edit team member images before saving them to the gallery. This feature provides a simple, intuitive interface for resizing and framing images.

---

## ✨ How to Use

### For Adding a New Team Member

1. **Click "+" button** in the "Meet Our Team" carousel
2. **Fill in all fields** (name, role, description)
3. **Click "Upload Image"** button
4. **Select an image** from your computer
5. ✂️ **Crop modal appears**:
   - Drag the blue rectangle to select the part you want
   - Use preset buttons (Square, 16:12, 3:4, 16:9)
   - Or manually enter width/height
6. **Click "✂️ Crop & Save"**
7. **Image is cropped** and ready to use
8. **Click "Add Member"** to save

### For Editing Existing Team Member Image

1. **Click "Edit Details"** on a team member card
2. **In the modal, click "📷 Change Image"**
3. **Select an image** from your computer
4. ✂️ **Crop modal appears** (same as above)
5. **Crop and save** the image
6. **Image preview updates** in the modal
7. **Click "Save"** to save changes

---

## 🎨 Crop Features

### Drag to Select
- Click and drag inside the preview area
- The blue rectangle shows what will be kept
- Everything outside (darkened) will be removed

### Preset Dimensions
Quick buttons to set common aspect ratios:
- **Square (1:1)** - 300×300px - Good for profile pictures
- **16:12** - 400×300px - Wide format
- **3:4** - 300×400px - Tall format  
- **16:9** - 500×300px - Widescreen

### Manual Entry
Enter exact dimensions:
- **Width** - Set custom width in pixels
- **Height** - Set custom height in pixels

### Live Preview
- Displays crop area in real-time
- Shows final dimensions
- Helps you see exactly what will be saved

---

## 📊 Technical Details

### New Files
```
frontend/src/components/ImageCropper.jsx
```

### Component Features
- Drag-and-drop crop selection
- Preset dimension buttons
- Manual width/height input
- Live preview with dimensions
- Canvas-based image processing
- Respects original image quality

### Supported Image Formats
- JPG / JPEG
- PNG
- WebP
- GIF
- BMP

### Size Limits
- Maximum file size: 10MB
- Minimum crop size: 50×50 pixels
- Recommended: 300×300 pixels or larger

---

## 🔧 Developer Guide

### Component Props

```javascript
<ImageCropper
  imageUrl={string}        // Base64 data URL of image
  onCrop={function}        // Callback when crop confirmed
  onCancel={function}      // Callback when user cancels
/>
```

### Callback Functions

**onCrop(croppedImageDataUrl)**
```javascript
handleCropEditImage = (croppedImage) => {
  setEditForm(prev => ({
    ...prev,
    image: croppedImage  // Base64 data URL
  }));
}
```

**onCancel()**
```javascript
handleCropCancel = () => {
  setCropImage(null);
  setCropMode(null);
}
```

### State Management

```javascript
// Crop modal state
const [cropImage, setCropImage] = useState(null);    // Image to crop
const [cropMode, setCropMode] = useState(null);      // 'edit' or 'new'
const [cropIndex, setCropIndex] = useState(null);    // Index if editing existing

// When uploading image
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    setCropImage(e.target.result);      // Set image to crop
    setCropMode('edit');                // Set mode
    setCropIndex(index);                // Set index if applicable
  };
  
  reader.readAsDataURL(file);
};
```

### Crop Configuration

```javascript
const [crop, setCrop] = useState({
  x: 0,           // X position of crop area
  y: 0,           // Y position of crop area
  width: 300,     // Width of crop area
  height: 300     // Height of crop area
});
```

### Canvas Processing

```javascript
// The cropper uses Canvas API to process images:
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Scale calculations for high-quality output
const scaleX = img.naturalWidth / img.width;
const scaleY = img.naturalHeight / img.height;

// Draw cropped region at full resolution
ctx.drawImage(
  img,
  crop.x * scaleX,
  crop.y * scaleY,
  crop.width * scaleX,
  crop.height * scaleY,
  0, 0,
  crop.width * scaleX,
  crop.height * scaleY
);

// Convert to Blob for output
canvas.toBlob((blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
});
```

---

## 🎯 Use Cases

### Profile Pictures
- Use Square preset (1:1)
- Center face in the crop area
- Crop size: 300×300px

### Team Gallery
- Use 16:12 or 3:4 presets
- Consistent aspect ratio
- Professional appearance

### Wide Format Cards
- Use 16:9 preset
- Landscape orientation
- Great for headers

### Custom Dimensions
- Enter exact width/height
- Match your design requirements
- Flexible options

---

## 🚀 Performance

### Image Processing
- Instant preview updates
- Smooth drag interaction
- Fast canvas rendering
- No server processing

### File Size Impact
- Original image: Any size
- After cropping: Typically 30-50% smaller
- Faster storage and loading

### Browser Support
- All modern browsers
- Chrome, Firefox, Safari, Edge
- IndexedDB for storage
- Canvas API for processing

---

## 🛠️ Customization

### Change Preset Sizes

In `ImageCropper.jsx`:
```javascript
<button
  onClick={() => setCrop({ x: 0, y: 0, width: 400, height: 400 })}
  className="..."
>
  Custom Size
</button>
```

### Change Default Crop Area

In `ImageCropper.jsx`:
```javascript
const [crop, setCrop] = useState({
  x: 0,
  y: 0,
  width: 400,  // Change default width
  height: 400  // Change default height
});
```

### Style Customization

Colors and styles are in the JSX:
```javascript
// Crop rectangle border
<div
  className="absolute border-4 border-blue-500 bg-transparent"
  // Change border-blue-500 to your color
/>

// Modal background
className="fixed inset-0 bg-black/60"
// Change bg-black/60 for different opacity
```

---

## 🐛 Troubleshooting

### Image won't crop
- Check image format (JPG, PNG, WebP supported)
- Verify image file isn't corrupted
- Try with a different image

### Crop area too small
- Minimum size is 50×50 pixels
- Increase width/height manually
- Use preset buttons for quick sizing

### Image quality lost
- Use original images at high resolution
- Avoid cropping very small areas
- PNG format preserves quality better

### Modal doesn't appear
- Check browser console for errors
- Verify ImageCropper component is imported
- Check React version compatibility

---

## 📱 Mobile Support

The crop feature works on mobile devices:
- Touch-friendly interface
- Drag works with touch gestures
- Responsive modal design
- Works on tablets and phones

---

## ⚡ Performance Optimizations

The component includes:
- Debounced drag updates
- Efficient Canvas rendering
- Lazy modal rendering
- Minimal re-renders

---

## 🔒 Data Security

- Images processed locally (no upload)
- Canvas data never sent to server
- Only final cropped image sent
- No image data stored except in IndexedDB

---

## 📚 Related Features

- **Persistent Team Images** - Saves cropped images to IndexedDB
- **Team Member Management** - Add/edit/delete with images
- **Image Storage** - Uses browser's local storage

---

## 🎓 Learning Resources

- Canvas API documentation: MDN
- Image processing: Html5 Canvas docs
- React state management: React docs
- FileReader API: MDN Web Docs

---

## ✅ Feature Checklist

- [x] Drag to select crop area
- [x] Preset dimension buttons
- [x] Manual width/height input
- [x] Live dimension display
- [x] Canvas-based processing
- [x] Mobile support
- [x] Error handling
- [x] UI/UX polish

---

**Enjoy editing your team member images! 🎨**
