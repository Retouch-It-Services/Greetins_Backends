#!/usr/bin/env python
"""
Run the Zedge image scraper and update the imageService.js file
"""

import sys
import json
from pathlib import Path

# Add the app directory to the path
app_dir = Path(__file__).parent.parent
sys.path.insert(0, str(app_dir))

from app.utils.image_scraper import scrape_all_occasions
import os


def generate_javascript_output(images_dict: dict) -> str:
    """
    Convert scraped images to JavaScript format for imageService.js
    Also includes fallback Pexels images for occasions without scraped images
    """
    # Fallback images for occasions that don't have scraped images
    fallback_images = {
        'birthday': [
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/808/small_2x/happy-birthday-template-with-colorful-balloons-free-vector.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/809/small_2x/happy-birthday-template-with-cake-and-balloons-free-vector.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/810/small_2x/birthday-party-template-with-confetti-free-vector.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/811/small_2x/colorful-birthday-celebration-template-free-vector.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/812/small_2x/birthday-wishes-template-with-gifts-free-vector.jpg',
            'https://static.vecteezy.com/system/resources/thumbnails/002/294/813/small_2x/happy-birthday-card-template-free-vector.jpg',
            'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
            'https://images.pexels.com/photos/3941683/pexels-photo-3941683.jpeg',
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
            'https://images.pexels.com/photos/3738337/pexels-photo-3738337.jpeg',
            'https://images.pexels.com/photos/7974/pexels-photo.jpg',
            'https://images.pexels.com/photos/1868392/pexels-photo-1868392.jpeg'
        ],
        'valentine': [
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
            'https://images.pexels.com/photos/9056/love-sad-girl-flowers.jpg',
            'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
            'https://images.pexels.com/photos/3848938/pexels-photo-3848938.jpeg',
            'https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg',
            'https://images.pexels.com/photos/3945703/pexels-photo-3945703.jpeg',
            'https://images.pexels.com/photos/4946604/pexels-photo-4946604.jpeg',
            'https://images.pexels.com/photos/3807522/pexels-photo-3807522.jpeg',
            'https://images.pexels.com/photos/3945725/pexels-photo-3945725.jpeg',
            'https://images.pexels.com/photos/3945704/pexels-photo-3945704.jpeg'
        ],
        'diwali': [
            'https://images.pexels.com/photos/3369152/pexels-photo-3369152.jpeg',
            'https://images.pexels.com/photos/2147556/pexels-photo-2147556.jpeg',
            'https://images.pexels.com/photos/3945712/pexels-photo-3945712.jpeg',
            'https://images.pexels.com/photos/3957984/pexels-photo-3957984.jpeg',
            'https://images.pexels.com/photos/3808510/pexels-photo-3808510.jpeg',
            'https://images.pexels.com/photos/3771095/pexels-photo-3771095.jpeg',
            'https://images.pexels.com/photos/3807519/pexels-photo-3807519.jpeg',
            'https://images.pexels.com/photos/3945718/pexels-photo-3945718.jpeg',
            'https://images.pexels.com/photos/2608532/pexels-photo-2608532.jpeg',
            'https://images.pexels.com/photos/3391478/pexels-photo-3391478.jpeg',
            'https://images.pexels.com/photos/3772564/pexels-photo-3772564.jpeg',
            'https://images.pexels.com/photos/3370542/pexels-photo-3370542.jpeg'
        ],
        'newyear': [
            'https://images.pexels.com/photos/4614200/pexels-photo-4614200.jpeg',
            'https://images.pexels.com/photos/3376916/pexels-photo-3376916.jpeg',
            'https://images.pexels.com/photos/3807508/pexels-photo-3807508.jpeg',
            'https://images.pexels.com/photos/5705176/pexels-photo-5705176.jpeg',
            'https://images.pexels.com/photos/3945714/pexels-photo-3945714.jpeg',
            'https://images.pexels.com/photos/2041383/pexels-photo-2041383.jpeg',
            'https://images.pexels.com/photos/3771169/pexels-photo-3771169.jpeg',
            'https://images.pexels.com/photos/3807512/pexels-photo-3807512.jpeg',
            'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
            'https://images.pexels.com/photos/3962278/pexels-photo-3962278.jpeg',
            'https://images.pexels.com/photos/3807513/pexels-photo-3807513.jpeg',
            'https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg'
        ]
    }
    
    js_code = """// Real greeting card images - scraped from web sources
// If no scraped images available, fallback Pexels/Vecteezy images are used
const realImages = {
"""
    
    for occasion in ['birthday', 'christmas', 'newyear', 'diwali', 'valentine']:
        # Use scraped images if available and not empty, otherwise use fallback
        images = images_dict.get(occasion, [])
        if not images:
            images = fallback_images.get(occasion, [])
        
        if images:
            js_code += f"  {occasion}: [\n"
            for img_url in images:
                # Escape quotes in URL
                safe_url = img_url.replace("'", "\\'")
                js_code += f"    '{safe_url}',\n"
            js_code += "  ],\n"
        else:
            # Empty array as last resort
            js_code += f"  {occasion}: [],\n"
    
    js_code += """};

const usedImagesByOccasion = {};

export const getRandomImage = (occasion) => {
  // Normalize occasion to match keys exactly
  let occasionKey = occasion.toLowerCase().trim();
  
  // Map variations to exact keys
  const occasionMap = {
    'birthday': 'birthday',
    'christmas': 'christmas',
    'new year': 'newyear',
    'newyear': 'newyear',
    'diwali': 'diwali',
    'valentine': 'valentine',
    'valentines': 'valentine',
    'valentines day': 'valentine'
  };
  
  occasionKey = occasionMap[occasionKey] || 'birthday'; // Default to birthday if not found
  
  const images = realImages[occasionKey];
  
  if (!images || images.length === 0) {
    console.warn(`⚠️ No images found for occasion: ${occasion}. Using birthday images.`);
    return realImages.birthday[0];
  }
  
  if (!usedImagesByOccasion[occasionKey]) {
    usedImagesByOccasion[occasionKey] = new Set();
  }
  
  const availableImages = images.filter(img => !usedImagesByOccasion[occasionKey].has(img));
  
  // Reset if all images have been used
  if (availableImages.length === 0) {
    usedImagesByOccasion[occasionKey].clear();
    availableImages.push(...images);
  }
  
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const selectedImage = availableImages[randomIndex];
  
  usedImagesByOccasion[occasionKey].add(selectedImage);
  console.log(`✅ ${occasionKey.toUpperCase()} image loaded`);
  return selectedImage;
};

export const getAIGeneratedImage = (occasion) => {
  return getRandomImage(occasion);
};
"""
    
    return js_code


def main():
    """Main execution function"""
    print("[*] Starting image scraper...")
    print("="*60)
    
    # Scrape all images
    all_images = scrape_all_occasions()
    
    # Print summary
    print("\n" + "="*60)
    print("SCRAPING SUMMARY")
    print("="*60)
    
    total_images = 0
    for occasion, images in all_images.items():
        count = len(images)
        total_images += count
        status = "[OK]" if count > 0 else "[FAIL]"
        print(f"{status} {occasion.upper()}: {count} images scraped")
    
    print(f"\n[TOTAL] Total: {total_images} images scraped")
    
    # Save raw JSON
    output_json = Path(__file__).parent / "scraped_images.json"
    with open(output_json, 'w') as f:
        json.dump(all_images, f, indent=2)
    print(f"\n[SAVED] JSON to: {output_json}")
    
    # Generate and save JavaScript
    js_output = generate_javascript_output(all_images)
    
    # Calculate correct path to frontend
    # From: fastapi_app/run_scraper.py
    # To:   frontend/src/utils/imageService.js
    # Need to go up 2 levels: fastapi_app -> project root -> frontend
    project_root = Path(__file__).parent.parent.parent
    output_js = project_root / "frontend" / "src" / "utils" / "imageService.js"
    
    # Create directory if it doesn't exist
    output_js.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_js, 'w') as f:
        f.write(js_output)
    
    print(f"[UPDATED] JavaScript: {output_js}")
    print(f"           Full path: {output_js.resolve()}")
    
    print("\n[SUCCESS] imageService.js has been updated with scraped images.")
    print("[INFO] You can now restart your frontend to see the new images!")


if __name__ == "__main__":
    main()
