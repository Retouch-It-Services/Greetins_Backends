import requests
from bs4 import BeautifulSoup
import json
import time
from urllib.parse import urljoin
import logging
import re
import urllib3

# Suppress SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DesignWizImageScraper:
    """
    Scraper for DesignWiz.com greeting card images
    """
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.base_url = "https://designwiz.com"
        self.session.verify = False  # Disable SSL verification for problematic sites
    
    def scrape_category(self, category_url: str, category_name: str, max_images: int = 12) -> list:
        """
        Scrape images from a DesignWiz blog post
        
        Args:
            category_url: Full URL to DesignWiz blog post
            category_name: Name of the category (birthday, christmas, etc.)
            max_images: Maximum number of images to scrape
        
        Returns:
            List of image URLs
        """
        logger.info(f"Scraping {category_name} from {category_url}")
        
        try:
            response = self.session.get(category_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            images = []
            
            # Method 1: Look for img tags in the article content
            img_tags = soup.find_all('img', limit=max_images * 2)
            
            for img in img_tags:
                if len(images) >= max_images:
                    break
                
                # Try to get the image URL from various attributes
                img_url = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
                
                # Skip if no URL found
                if not img_url:
                    continue
                
                # Convert relative URLs to absolute
                if img_url.startswith('/'):
                    img_url = urljoin(self.base_url, img_url)
                elif not img_url.startswith('http'):
                    img_url = urljoin(category_url, img_url)
                
                # Skip placeholder images and logos
                if any(skip in img_url.lower() for skip in ['logo', 'avatar', 'icon', 'btn', 'button', 'ad-', 'sponsored']):
                    continue
                
                # Skip if already added
                if img_url in images:
                    continue
                
                images.append(img_url)
                logger.info(f"Found image: {img_url}")
            
            # Method 2: Look for image URLs in links to full-size images
            if len(images) < max_images:
                for link in soup.find_all('a', href=True):
                    if len(images) >= max_images:
                        break
                    
                    href = link.get('href', '')
                    
                    # Check if it's an image URL
                    if any(ext in href.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                        if not href.startswith('http'):
                            href = urljoin(self.base_url, href)
                        
                        if href not in images and href.startswith('http'):
                            images.append(href)
                            logger.info(f"Found image from link: {href}")
            
            # Method 3: Look for images in picture tags
            if len(images) < max_images:
                for picture in soup.find_all('picture', limit=max_images):
                    if len(images) >= max_images:
                        break
                    
                    # Get the last source or img in picture tag
                    sources = picture.find_all(['source', 'img'])
                    if sources:
                        img_url = sources[-1].get('src') or sources[-1].get('srcset')
                        
                        if img_url:
                            # Extract URL from srcset if needed
                            if ',' in img_url:
                                img_url = img_url.split(',')[0].split()[0]
                            
                            if not img_url.startswith('http'):
                                img_url = urljoin(self.base_url, img_url)
                            
                            if img_url not in images:
                                images.append(img_url)
                                logger.info(f"Found image from picture tag: {img_url}")
            
            logger.info(f"Scraped {len(images)} images for {category_name}")
            return images
        
        except Exception as e:
            logger.error(f"Error scraping {category_name}: {str(e)}")
            return []


# Scraping functions for different occasions
def scrape_birthday_images(url: str = None) -> list:
    """Scrape birthday card images"""
    scraper = DesignWizImageScraper()
    
    if not url:
        url = 'https://designwiz.com/blog/happy-birthday-images-and-pictures-for-download/'
    
    return scraper.scrape_category(url, 'birthday', max_images=12)


def scrape_christmas_images(url: str = None) -> list:
    """Scrape Christmas card images"""
    scraper = DesignWizImageScraper()
    
    if not url:
        url = 'https://egreetings.gov.in/cards-Christmas-11.html'
    
    return scraper.scrape_category(url, 'christmas', max_images=20)


def scrape_newyear_images(url: str = None) -> list:
    """Scrape New Year card images"""
    scraper = DesignWizImageScraper()
    
    if not url:
        url = 'https://designwiz.com/blog/happy-new-year-images-and-pictures-for-download/#Gold_Elegant_New_Year_Images_Pictures'
    
    return scraper.scrape_category(url, 'newyear', max_images=12)


def scrape_valentine_images(url: str = None) -> list:
    """Scrape Valentine card images"""
    scraper = DesignWizImageScraper()
    
    if not url:
        url = 'https://designwiz.com/blog/happy-valentines-day-images-and-pictures-for-download/'
    
    return scraper.scrape_category(url, 'valentine', max_images=12)


def scrape_diwali_images(url: str = None) -> list:
    """Scrape Diwali card images"""
    scraper = DesignWizImageScraper()
    
    if not url:
        url = 'https://designwiz.com/blog/happy-diwali-images-and-pictures-for-download/'
    
    return scraper.scrape_category(url, 'diwali', max_images=12)


def scrape_all_occasions(custom_urls: dict = None) -> dict:
    """
    Scrape images for all occasions
    
    Args:
        custom_urls: Optional dictionary with custom URLs for each occasion
                    Example: {'birthday': 'https://...', 'christmas': 'https://...'}
    
    Returns:
        Dictionary with occasion names as keys and image lists as values
    """
    scraper = DesignWizImageScraper()
    
    # Default URLs
    default_urls = {
        'birthday': 'https://designwiz.com/blog/happy-birthday-images-and-pictures-for-download/',
        'christmas': 'https://egreetings.gov.in/cards-Christmas-11.html',
        'newyear': 'https://designwiz.com/blog/happy-new-year-images-and-pictures-for-download/#Gold_Elegant_New_Year_Images_Pictures',
        'valentine': 'https://designwiz.com/blog/happy-valentines-day-images-and-pictures-for-download/',
        'diwali': 'https://designwiz.com/blog/happy-diwali-images-and-pictures-for-download/'
    }
    
    # Use custom URLs if provided, otherwise use defaults
    occasions = custom_urls if custom_urls else default_urls
    
    all_images = {}
    
    for occasion, url in occasions.items():
        logger.info(f"\n{'='*60}")
        logger.info(f"Scraping {occasion.upper()} images...")
        logger.info(f"URL: {url}")
        logger.info(f"{'='*60}")
        
        images = scraper.scrape_category(url, occasion, max_images=12)
        all_images[occasion] = images
        
        time.sleep(2)  # Be respectful to server
    
    return all_images


if __name__ == "__main__":
    # Run the scraper
    print("Starting DesignWiz image scraper...")
    all_images = scrape_all_occasions()
    
    # Print results
    print("\n" + "="*60)
    print("SCRAPING RESULTS")
    print("="*60)
    
    for occasion, images in all_images.items():
        print(f"\n{occasion.upper()}: {len(images)} images")
        for i, img in enumerate(images, 1):
            print(f"  {i}. {img}")
    
    # Save to JSON file
    with open('scraped_images.json', 'w') as f:
        json.dump(all_images, f, indent=2)
    
    print("\n✅ Results saved to scraped_images.json")
