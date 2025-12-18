# 🎨 Web Scraper Setup - Complete Guide

## What Was Created

I've set up a complete **web scraper system** to extract real greeting card images from Zedge.net and automatically update your frontend with fresh, high-quality images.

## 📂 New Files Created

### 1. **Scraper Code**
- `fastapi_app/app/utils/image_scraper.py` - Main scraper class with:
  - `ZedgeImageScraper` class for scraping Zedge.net
  - Functions to scrape each occasion (birthday, christmas, newyear, valentine, diwali)
  - HTML and JSON parsing capabilities
  - Rate limiting and error handling

### 2. **Runner Script**
- `fastapi_app/run_scraper.py` - Main script that:
  - Calls the scraper for all occasions
  - Generates JavaScript code
  - Automatically updates `frontend/src/utils/imageService.js`
  - Saves raw data to JSON

### 3. **Batch Script (Windows)**
- `run-scraper.bat` - Double-click to run scraper on Windows
  - Automatically installs dependencies
  - Runs the scraper
  - Shows success/error messages

### 4. **Documentation**
- `SCRAPER_README.md` - Complete documentation with:
  - How to use the scraper
  - Customization options
  - Troubleshooting guide
  - Legal considerations

## 📋 Updated Files

- `requirements.txt` - Added:
  - `requests==2.31.0` (HTTP library)
  - `beautifulsoup4==4.12.2` (HTML parser)

## 🚀 How to Use

### **Option 1: Windows Users (Easiest)**

1. **Double-click** `run-scraper.bat` in your project root
2. Wait for the scraper to complete
3. Done! Your images are updated

### **Option 2: Command Line (Any OS)**

```bash
# Navigate to project root
cd c:\Users\user\Documents\GitHub\Greetins_Backends

# Run the scraper
cd fastapi_app
python run_scraper.py
```

### **Option 3: Manual Control**

```bash
# Just run the scraper
cd fastapi_app
python -c "from app.utils.image_scraper import scrape_all_occasions; import json; all_img = scrape_all_occasions(); print('Done!')"
```

## ✨ What Happens When You Run It

### Step 1: Scraping
The scraper visits these Zedge.net pages:
- https://www.zedge.net/category/wallpapers/birthday
- https://www.zedge.net/category/wallpapers/christmas
- https://www.zedge.net/category/wallpapers/new%20year
- https://www.zedge.net/category/wallpapers/valentine
- https://www.zedge.net/category/wallpapers/diwali

### Step 2: Image Extraction
For each page, it extracts:
- Image URLs from HTML img tags
- Images from JSON data embedded in the page
- Validates all URLs (must start with http)

### Step 3: Data Processing
- Collects up to 12 images per occasion
- Saves raw data to `scraped_images.json`
- Generates JavaScript code

### Step 4: Update Frontend
- Automatically updates `frontend/src/utils/imageService.js`
- Frontend now uses scraped images instead of placeholders

### Step 5: Verification
Prints a summary like:
```
✅ BIRTHDAY: 12 images scraped
✅ CHRISTMAS: 12 images scraped
✅ NEWYEAR: 10 images scraped
✅ VALENTINE: 10 images scraped
✅ DIWALI: 12 images scraped

📈 Total: 56 images scraped
```

## 🎯 Expected Results

### Before Scraping:
```
birthday → Placeholder images from via.placeholder.com
christmas → Placeholder images from via.placeholder.com
newyear → Placeholder images from unsplash.com
etc.
```

### After Scraping:
```
birthday → Real birthday images from Zedge.net
christmas → Real Christmas images from Zedge.net
newyear → Real New Year images from Zedge.net
valentine → Real Valentine images from Zedge.net
diwali → Real Diwali images from Zedge.net
```

## 🔧 How the Scraper Works

### HTML Parsing
```python
# Finds image URLs in HTML tags
<img class="wall-img" data-src="https://example.com/image.jpg" />

# Extracts: https://example.com/image.jpg
```

### Image Randomization
The updated `imageService.js` ensures:
- Each occasion shows ONLY its own images (no mixing)
- Images rotate randomly
- No duplicates until all images are shown
- Different images on each page visit

### Rate Limiting
- 2-second delay between category scrapes
- Respectful to Zedge servers
- Prevents IP blocking

## ⚠️ Important Notes

### ✅ Ethical Web Scraping
- ✅ Legal for personal use (check Zedge's ToS)
- ✅ Includes rate limiting
- ✅ Only requests public content
- ✅ Not overloading servers

### 🛡️ Image Rights
- Images on Zedge are user-submitted wallpapers
- Most are free to use (check individual licenses)
- For commercial use, verify image licenses

## 🔄 Troubleshooting

### Q: Scraper completes but no images?
**A:** Zedge might have changed their HTML structure. Contact support with error details.

### Q: Getting 404 or connection errors?
**A:** Check your internet connection. Zedge.net might be temporarily down.

### Q: Frontend still shows old images?
**A:** 
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Restart frontend dev server: `npm start`

### Q: Script says Python not found?
**A:** Add Python to your system PATH or specify full path to python.exe

## 📊 Output Files

After running the scraper:

1. **`fastapi_app/app/utils/scraped_images.json`**
   - Raw scraped data
   - Backup reference
   - Shows all extracted URLs

2. **`frontend/src/utils/imageService.js`** (Updated)
   - JavaScript with image arrays
   - Used by React components
   - Includes randomization logic

## 🚀 Next Steps

1. **Run the scraper** using `run-scraper.bat` or `python run_scraper.py`
2. **Restart your frontend** if it's running
3. **Refresh the browser** to see new images
4. **Test each category**:
   - Click "Create Cards Now"
   - Select Birthday → See birthday images only
   - Select Christmas → See Christmas images only
   - etc.

## 📞 Custom Occasions

Want to scrape images for a different occasion (e.g., "Anniversary")?

1. Find the Zedge category URL
2. Edit `image_scraper.py` and add to `scrape_all_occasions()`:
```python
'anniversary': 'https://www.zedge.net/category/wallpapers/anniversary'
```
3. Run the scraper - it will automatically include the new occasion

## 🎉 Success Indicators

You'll know it worked when:

- ✅ Console shows "X images scraped" for each occasion
- ✅ `scraped_images.json` is created with image URLs
- ✅ `imageService.js` is updated with real URLs
- ✅ Frontend displays different, real greeting card images
- ✅ Each occasion shows only its own themed images

## 📧 Questions?

Refer to `SCRAPER_README.md` for detailed documentation!

---

**Happy scraping! 🎨🖼️**
