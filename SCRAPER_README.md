# 🎨 Zedge Image Scraper for Greetins

This tool scrapes high-quality greeting card images from Zedge.net and automatically updates the frontend image service.

## 📋 Features

- ✅ Scrapes images from Zedge.net for multiple occasions
- ✅ Supports: Birthday, Christmas, New Year, Valentine's Day, Diwali
- ✅ Automatically updates `imageService.js` with scraped URLs
- ✅ Respects server rate limiting (delays between requests)
- ✅ Saves raw data to JSON for reference

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd fastapi_app
pip install -r requirements.txt
```

The requirements now include:
- `requests` - For HTTP requests
- `beautifulsoup4` - For HTML parsing

### 2. Run the Scraper

```bash
# From the fastapi_app directory
python run_scraper.py
```

### 3. What Happens

The scraper will:
1. Visit Zedge.net category pages for each occasion
2. Extract image URLs from the HTML
3. Save raw data to `scraped_images.json`
4. Update `frontend/src/utils/imageService.js` with the scraped URLs
5. Print a summary of scraped images

### 4. Example Output

```
🎨 Starting Zedge image scraper...
============================================================
📊 SCRAPING SUMMARY
============================================================
✅ BIRTHDAY: 12 images scraped
✅ CHRISTMAS: 12 images scraped
✅ NEWYEAR: 10 images scraped
✅ VALENTINE: 10 images scraped
✅ DIWALI: 12 images scraped

📈 Total: 56 images scraped

💾 Saved JSON to: app/utils/scraped_images.json
💾 Updated: frontend/src/utils/imageService.js

✅ All done! The imageService.js has been updated with scraped images.
🚀 You can now restart your frontend to see the new images!
```

## 📍 Zedge Category URLs

The scraper uses these Zedge category pages:

- **Birthday**: https://www.zedge.net/category/wallpapers/birthday
- **Christmas**: https://www.zedge.net/category/wallpapers/christmas
- **New Year**: https://www.zedge.net/category/wallpapers/new%20year
- **Valentine**: https://www.zedge.net/category/wallpapers/valentine
- **Diwali**: https://www.zedge.net/category/wallpapers/diwali

## 🔧 How It Works

### Image Scraping Process

1. **HTTP Request**: Fetches the Zedge category page
2. **HTML Parsing**: Uses BeautifulSoup to parse the HTML
3. **Image Extraction**: Looks for image URLs in:
   - `img` tags with `data-src` or `src` attributes
   - JSON data embedded in the HTML
4. **Validation**: Only keeps valid image URLs
5. **Rate Limiting**: Waits 2 seconds between category scrapes

### Image Service Update

After scraping, the tool generates a new `imageService.js` with:
- One array per occasion (birthday, christmas, newyear, valentine, diwali)
- Each array containing 10-12 high-quality image URLs
- Randomization logic to show different images on each visit

## 📝 Files Created/Modified

### Created:
- `fastapi_app/app/utils/image_scraper.py` - Main scraper class
- `fastapi_app/run_scraper.py` - Runner script
- `fastapi_app/app/utils/scraped_images.json` - Raw scraped data (auto-generated)

### Modified:
- `requirements.txt` - Added beautifulsoup4 and requests
- `frontend/src/utils/imageService.js` - Updated with scraped URLs

## ⚠️ Important Notes

### Legal Considerations

- ✅ Web scraping is legal in most jurisdictions
- ✅ Zedge allows automated access for personal use
- ℹ️ Always check website's `robots.txt` and terms of service
- ⏱️ The scraper includes rate limiting (2 second delays) to be respectful

### Best Practices

1. **Run sparingly**: No need to run the scraper every day
2. **Monitor results**: Check the output to ensure all categories are scraped
3. **Backup images**: Keep the `scraped_images.json` as a backup
4. **Handle failures**: If a category fails to scrape, it will be empty in the JSON

## 🛠️ Customization

### Modify Number of Images

Edit `run_scraper.py` and change the `max_images` parameter:

```python
images = scraper.scrape_category(url, occasion, max_images=15)  # Get 15 images instead of 12
```

### Add New Occasion

1. Add to `occasions` dict in `image_scraper.py`:
```python
'newoccasion': 'https://www.zedge.net/category/wallpapers/newoccasion'
```

2. Run the scraper - it will automatically include the new occasion

### Change Scraping Strategy

Modify `_scrape_from_json()` in `image_scraper.py` to extract images from different HTML structures if needed.

## 🐛 Troubleshooting

### No images scraped?

1. Check your internet connection
2. Verify Zedge.net is accessible
3. Check if Zedge changed their HTML structure
4. Look at the log messages for specific errors

### Script fails with permission error?

Make sure you have write permissions to:
- `fastapi_app/app/utils/` (for JSON output)
- `frontend/src/utils/` (for imageService.js update)

### Frontend still shows old images?

1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart the frontend development server

## 📊 Data Structure

### scraped_images.json Format

```json
{
  "birthday": [
    "https://url1.jpg",
    "https://url2.jpg",
    ...
  ],
  "christmas": [...],
  "newyear": [...],
  "valentine": [...],
  "diwali": [...]
}
```

### Generated imageService.js Format

```javascript
const realImages = {
  birthday: ['https://url1.jpg', ...],
  christmas: [...],
  // etc.
};

export const getRandomImage = (occasion) => {
  // Randomly selects and rotates through images
  // Ensures no duplicates until all are shown
};
```

## 🔄 Automated Updates (Optional)

To automatically update images on a schedule, you can:

1. Add a cron job (Linux/Mac):
```bash
# Run scraper every week on Sunday at 2 AM
0 2 * * 0 cd /path/to/fastapi_app && python run_scraper.py
```

2. Add a Windows Task Scheduler task:
- Schedule `python run_scraper.py` to run weekly

## 📞 Support

If you encounter issues:

1. Check the log output in terminal
2. Verify Zedge.net is still using the expected HTML structure
3. Try scraping a single category to isolate the issue
4. Check that beautifulsoup4 and requests are installed

## 🎉 Success!

Once the scraper completes successfully:

1. Your frontend will display real greeting card images from Zedge
2. Each occasion category shows only its relevant images
3. Images rotate randomly without repetition
4. No placeholder images!

Enjoy your AI-powered greeting card application! 🎊
