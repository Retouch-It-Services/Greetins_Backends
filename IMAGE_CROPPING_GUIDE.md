# Image Cropping Feature - Quick Visual Guide

## What's New?

When you upload an image for a team member, you now see a **crop tool** before the image is saved.

---

## 📸 Step-by-Step Guide

### Step 1: Click Upload Button
```
Team Member Card
  ↓ (hover and click edit button)
Upload Modal Appears
  ↓ (click "📷 Change Image")
File Browser Opens
```

### Step 2: Select Image
```
Choose Image from Computer
  ↓
File Selected
  ↓
Image Preview Appears
```

### Step 3: See Crop Tool
```
┌─────────────────────────────────────┐
│         Crop Image Modal            │
├─────────────────────────────────────┤
│                                     │
│    [        Image Preview      ]    │
│    [  with blue crop area      ]    │
│    [  (drag to reposition)     ]    │
│                                     │
│  Quick Presets:                     │
│  [Square] [16:12] [3:4] [16:9]     │
│                                     │
│  Width:  [300] px                   │
│  Height: [300] px                   │
│                                     │
│  [Cancel]  [✂️ Crop & Save]        │
└─────────────────────────────────────┘
```

### Step 4: Adjust Crop Area

**Option A: Drag**
- Click inside the blue rectangle
- Drag to move it around
- The blue area = what you keep
- The dark area = what gets removed

**Option B: Preset Buttons**
Click any preset:
- **Square (1:1)** - 300×300px
- **16:12** - 400×300px
- **3:4** - 300×400px
- **16:9** - 500×300px

**Option C: Manual Entry**
- Enter Width in pixels
- Enter Height in pixels
- Press Enter or click elsewhere

### Step 5: Click Crop & Save
```
Click [✂️ Crop & Save]
  ↓
Image Gets Cropped
  ↓
Modal Closes
  ↓
Cropped Image Shows in Preview
```

### Step 6: Confirm & Save
```
Review Cropped Image
  ↓
Click [Save] to save changes
  ↓
Image Saved to IndexedDB
  ↓
Team Member Updated
```

---

## 🎯 Visual Examples

### Before Cropping
```
Original Image (too wide)
┌──────────────────────────────────┐
│                                  │
│  Person's face is small          │
│  Lots of background around       │
│  Take up unnecessary space       │
│                                  │
│         😊                       │
│                                  │
└──────────────────────────────────┘
```

### During Cropping
```
Select Area to Keep
┌──────────────────────────────────┐
│ 🔆 (dark/removed)               │
│ ┌──────────────────┐ 🔆         │
│ │                  │             │
│ │   😊 (keep)     │ (removed)  │
│ │                  │             │
│ └──────────────────┘             │
│ 🔆 (dark/removed)               │
└──────────────────────────────────┘

Blue border = crop area
Dark area = will be removed
```

### After Cropping
```
Cropped Result (perfect!)
┌──────────────────┐
│                  │
│      😊          │
│   (centered)     │
│                  │
└──────────────────┘
```

---

## 🎨 Preset Presets Visual

### Square 1:1 (300×300)
```
┌─────────────┐
│             │
│    Face     │
│             │
└─────────────┘
Profile pictures, avatars
```

### 16:12 (400×300)
```
┌──────────────────┐
│                  │
│  Face + Torso    │
│                  │
└──────────────────┘
Half-length portraits
```

### 3:4 (300×400)
```
┌──────────┐
│          │
│          │
│  Full    │
│  Body    │
│          │
└──────────┘
Vertical/Portrait photos
```

### 16:9 (500×300)
```
┌──────────────────────────┐
│                          │
│  Wide landscape shot    │
│                          │
└──────────────────────────┘
Headers, wide banners
```

---

## ⌨️ Keyboard Shortcuts

| Action | How |
|--------|-----|
| Drag crop area | Click + hold + move mouse |
| Change width | Click in Width field, type number |
| Change height | Click in Height field, type number |
| Crop & save | Click "✂️ Crop & Save" button |
| Cancel | Click "Cancel" button |

---

## 🎬 Common Workflows

### Workflow 1: Quick Square Crop
```
1. Upload image
2. Click [Square] preset
3. Click [✂️ Crop & Save]
4. Done! (20 seconds)
```

### Workflow 2: Custom Size
```
1. Upload image
2. Enter Width: 400
3. Enter Height: 500
4. Drag to reposition
5. Click [✂️ Crop & Save]
6. Done! (30 seconds)
```

### Workflow 3: Fine-tune Position
```
1. Upload image
2. Click preset
3. Drag crop area to perfect position
4. Adjust width/height if needed
5. Click [✂️ Crop & Save]
6. Done! (60 seconds)
```

---

## 💡 Pro Tips

### Tip 1: Center the Face
When cropping portraits:
- Make sure the face is centered
- Leave equal space on both sides
- Check top/bottom spacing

### Tip 2: Use Presets First
- Start with a preset that matches your needs
- Then fine-tune with dragging
- Much faster than manual entry

### Tip 3: Check the Numbers
- Display shows crop dimensions
- Good reference for consistency
- All team members can have same size

### Tip 4: Save to Consistency
- Use same preset for all team members
- Gallery looks more professional
- Consistent visual style

### Tip 5: High-Quality Source
- Crop from high-resolution originals
- Better final result
- More flexibility in positioning

---

## ❌ Common Mistakes to Avoid

### ❌ Don't: Crop too small
```
❌ DON'T DO THIS:
┌─────┐
│ 😊 │  Too tight, loses context
└─────┘

✅ DO THIS INSTEAD:
┌──────────────┐
│              │
│      😊      │  Good framing
│              │
└──────────────┘
```

### ❌ Don't: Off-center framing
```
❌ DON'T DO THIS:
┌──────────────┐
│😊             │  Face pushed to side
│              │
└──────────────┘

✅ DO THIS INSTEAD:
┌──────────────┐
│              │
│      😊      │  Face centered
│              │
└──────────────┘
```

### ❌ Don't: Inconsistent sizes
```
❌ MIXED SIZES (looks unprofessional):
[Profile 1] [Profile 2] [Profile 3]
300×300      400×400      250×250
Different sizes, awkward layout

✅ CONSISTENT SIZES (looks great):
[Profile 1] [Profile 2] [Profile 3]
300×300      300×300      300×300
Same size, professional appearance
```

---

## 🔄 Supported Image Formats

| Format | Support | Best For |
|--------|---------|----------|
| JPG/JPEG | ✅ Yes | Photos, portraits |
| PNG | ✅ Yes | Graphics with transparency |
| WebP | ✅ Yes | Modern browsers |
| GIF | ✅ Yes | Animations |
| BMP | ✅ Yes | Simple graphics |

---

## 📏 Recommended Sizes

### For Different Uses

| Use Case | Dimensions | Preset |
|----------|-----------|--------|
| Profile Avatar | 300×300px | Square |
| Team Directory | 300×400px | 3:4 |
| Company Website | 400×300px | 16:12 |
| Wide Gallery | 500×300px | 16:9 |
| Custom Needs | Your size | Manual |

---

## 🚀 Workflow Timeline

```
Total Time: About 45 seconds per image

0s   Upload image
5s   Modal opens
10s  Select preset or drag
25s  Fine-tune if needed
35s  Click Crop & Save
40s  Image saves
45s  Ready to use!
```

---

## ✨ Benefits

✅ **Better Control** - Crop exactly how you want
✅ **Faster** - Presets save time
✅ **Consistent** - All team members same size
✅ **Professional** - Polished appearance
✅ **Local Processing** - No server upload
✅ **High Quality** - Canvas-based processing

---

## 🆘 Need Help?

### What if crop area is too small?
- Manually increase Width or Height
- Or use larger preset

### What if I can't drag the crop area?
- Make sure you're clicking inside the blue rectangle
- Try using manual width/height instead
- Clear browser cache if still stuck

### What if image quality looks bad?
- Use high-resolution original image
- Don't crop to very small size
- PNG format works better than JPG

### What if modal doesn't appear?
- Check image format (JPG, PNG, WebP, GIF)
- Check file size (under 10MB recommended)
- Try different image
- Refresh browser

---

## 📱 Mobile Friendly

The crop tool works great on mobile:
- **Touch-friendly** buttons and interface
- **Responsive** design adapts to screen size
- **Works on** phones, tablets, desktops
- **Same features** everywhere

---

## 🎯 Next Steps

1. **Try it out!** Upload a team member image
2. **Experiment** with different presets
3. **Master** the dragging technique
4. **Build** your perfect team gallery

---

**Happy cropping! 🎨✂️**
