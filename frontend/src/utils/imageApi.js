// Free image APIs for fetching category-specific images
const UNSPLASH_ACCESS_KEY = 'your-unsplash-key'; // Replace with actual key
const PEXELS_API_KEY = 'your-pexels-key'; // Replace with actual key

// Category-specific search terms
const categorySearchTerms = {
  birthday: ['birthday cake', 'birthday party', 'celebration', 'balloons'],
  anniversary: ['anniversary', 'couple celebration', 'romantic dinner', 'love'],
  wedding: ['wedding', 'bride groom', 'wedding ceremony', 'marriage'],
  christmas: ['christmas tree', 'santa claus', 'christmas gifts', 'holiday'],
  newyear: ['new year', 'fireworks', 'celebration', 'party'],
  valentine: ['valentine heart', 'romantic', 'love couple', 'red roses'],
  'mothers-day': ['mother child', 'mom flowers', 'mothers day', 'family'],
  'fathers-day': ['father child', 'dad family', 'fathers day', 'parent'],
  graduation: ['graduation cap', 'diploma', 'graduate', 'achievement'],
  'baby-shower': ['baby shower', 'newborn', 'baby gifts', 'pregnancy'],
  'thank-you': ['thank you', 'gratitude', 'appreciation', 'flowers'],
  'get-well': ['get well', 'recovery', 'health', 'healing'],
  congratulations: ['congratulations', 'success', 'achievement', 'celebration'],
  sympathy: ['sympathy', 'condolence', 'flowers', 'peaceful']
};

// Fallback placeholder images
const placeholderImages = {
  birthday: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  anniversary: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  christmas: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
  newyear: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400',
  valentine: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
  'mothers-day': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  'fathers-day': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
  graduation: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
  'baby-shower': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
  'thank-you': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  'get-well': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
  congratulations: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  sympathy: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400'
};

// Get random search term for category
const getRandomSearchTerm = (category) => {
  const terms = categorySearchTerms[category] || ['greeting card'];
  return terms[Math.floor(Math.random() * terms.length)];
};

// Fetch from Unsplash
export const fetchUnsplashImage = async (category) => {
  try {
    const searchTerm = getRandomSearchTerm(category);
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${searchTerm}&orientation=portrait&w=400&h=500`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.urls.regular;
    }
  } catch (error) {
    console.log('Unsplash API error:', error);
  }
  return null;
};

// Fetch from Pexels
export const fetchPexelsImage = async (category) => {
  try {
    const searchTerm = getRandomSearchTerm(category);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=1&orientation=portrait`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium;
      }
    }
  } catch (error) {
    console.log('Pexels API error:', error);
  }
  return null;
};

// Main function to get category-specific image
export const getCategoryImage = async (category) => {
  // Try Unsplash first
  let imageUrl = await fetchUnsplashImage(category);
  
  // If Unsplash fails, try Pexels
  if (!imageUrl) {
    imageUrl = await fetchPexelsImage(category);
  }
  
  // If both fail, use placeholder
  if (!imageUrl) {
    imageUrl = placeholderImages[category] || placeholderImages.birthday;
  }
  
  return imageUrl;
};

// Generate multiple images for a category
export const getCategoryImages = async (category, count = 24) => {
  const images = [];
  
  // Use placeholder images as base
  const baseImage = placeholderImages[category] || placeholderImages.birthday;
  
  for (let i = 0; i < count; i++) {
    // For demo, use placeholder with different parameters
    const imageUrl = `${baseImage}&sig=${i}`;
    images.push(imageUrl);
  }
  
  return images;
};