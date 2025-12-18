// Real greeting card images - curated from free sources
const realImages = {
  birthday: [
    'https://images.unsplash.com/photo-1558636508-e0db3814a4ad?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558636508-e0db3814a4ad?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1565958011504-98d3aeb64033?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1599515669200-49acba011f5d?w=400&h=500&fit=crop',
    'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg',
    'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg',
    'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg',
    'https://images.pexels.com/photos/264887/pexels-photo-264887.jpeg',
    'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
    'https://images.pexels.com/photos/1729800/pexels-photo-1729800.jpeg',
    'https://images.pexels.com/photos/1729801/pexels-photo-1729801.jpeg',
    'https://images.pexels.com/photos/1729802/pexels-photo-1729802.jpeg'
  ],
  anniversary: [
    'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg',
    'https://images.pexels.com/photos/265857/pexels-photo-265857.jpeg',
    'https://images.pexels.com/photos/265858/pexels-photo-265858.jpeg',
    'https://images.pexels.com/photos/265859/pexels-photo-265859.jpeg',
    'https://images.pexels.com/photos/265860/pexels-photo-265860.jpeg',
    'https://images.pexels.com/photos/265861/pexels-photo-265861.jpeg',
    'https://images.pexels.com/photos/265862/pexels-photo-265862.jpeg',
    'https://images.pexels.com/photos/265863/pexels-photo-265863.jpeg'
  ],
  wedding: [
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg',
    'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg',
    'https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg',
    'https://images.pexels.com/photos/1024997/pexels-photo-1024997.jpeg',
    'https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg',
    'https://images.pexels.com/photos/1024999/pexels-photo-1024999.jpeg',
    'https://images.pexels.com/photos/1025000/pexels-photo-1025000.jpeg'
  ],
  christmas: [
    '/assets/christmas/Christmas 1.png',
    '/assets/christmas/Christams 2.png',
    '/assets/christmas/Christmas 3.png',
    '/assets/christmas/Merry Christmas 4.png',
    '/assets/christmas/Merry Christmas 6.png',
    '/assets/christmas/Merry Christmas 7.png',
    '/assets/christmas/Merry Christmas 8.png',
    '/assets/christmas/Merry Christmas 9.png',
  ],
  newyear: [
    '/assets/newyear/_Happy New Year Poster 1.png',
    '/assets/newyear/_New Year\'s 2 .png',
    '/assets/newyear/_New Year\'s 3 .png',
    '/assets/newyear/New Year 4.png',
    '/assets/newyear/New Year 5.png',
    '/assets/newyear/New Year 6.png',
    '/assets/newyear/New Year 7.png',
    '/assets/newyear/New Year 8.png',
  ],
  valentine: [
    'https://images.pexels.com/photos/6798404/pexels-photo-6798404.jpeg',
    'https://images.pexels.com/photos/3927280/pexels-photo-3927280.jpeg',
    'https://images.pexels.com/photos/6708918/pexels-photo-6708918.jpeg',
    'https://images.pexels.com/photos/6709026/pexels-photo-6709026.jpeg',
    'https://images.pexels.com/photos/6694112/pexels-photo-6694112.jpeg',
    'https://images.pexels.com/photos/6708759/pexels-photo-6708759.jpeg'
  ],
  'mothers-day': [
    'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg',
    'https://images.pexels.com/photos/1257111/pexels-photo-1257111.jpeg',
    'https://images.pexels.com/photos/1257112/pexels-photo-1257112.jpeg',
    'https://images.pexels.com/photos/1257113/pexels-photo-1257113.jpeg',
    'https://images.pexels.com/photos/1257114/pexels-photo-1257114.jpeg',
    'https://images.pexels.com/photos/1257115/pexels-photo-1257115.jpeg'
  ],
  'fathers-day': [
    'https://images.pexels.com/photos/1257116/pexels-photo-1257116.jpeg',
    'https://images.pexels.com/photos/1257117/pexels-photo-1257117.jpeg',
    'https://images.pexels.com/photos/1257118/pexels-photo-1257118.jpeg',
    'https://images.pexels.com/photos/1257119/pexels-photo-1257119.jpeg',
    'https://images.pexels.com/photos/1257120/pexels-photo-1257120.jpeg',
    'https://images.pexels.com/photos/1257121/pexels-photo-1257121.jpeg'
  ],
  graduation: [
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    'https://images.pexels.com/photos/267886/pexels-photo-267886.jpeg',
    'https://images.pexels.com/photos/267887/pexels-photo-267887.jpeg',
    'https://images.pexels.com/photos/267888/pexels-photo-267888.jpeg',
    'https://images.pexels.com/photos/267889/pexels-photo-267889.jpeg',
    'https://images.pexels.com/photos/267890/pexels-photo-267890.jpeg'
  ],
  'baby-shower': [
    'https://images.pexels.com/photos/1257122/pexels-photo-1257122.jpeg',
    'https://images.pexels.com/photos/1257123/pexels-photo-1257123.jpeg',
    'https://images.pexels.com/photos/1257124/pexels-photo-1257124.jpeg',
    'https://images.pexels.com/photos/1257125/pexels-photo-1257125.jpeg',
    'https://images.pexels.com/photos/1257126/pexels-photo-1257126.jpeg',
    'https://images.pexels.com/photos/1257127/pexels-photo-1257127.jpeg'
  ],
  'thank-you': [
    'https://images.pexels.com/photos/1257128/pexels-photo-1257128.jpeg',
    'https://images.pexels.com/photos/1257129/pexels-photo-1257129.jpeg',
    'https://images.pexels.com/photos/1257130/pexels-photo-1257130.jpeg',
    'https://images.pexels.com/photos/1257131/pexels-photo-1257131.jpeg',
    'https://images.pexels.com/photos/1257132/pexels-photo-1257132.jpeg',
    'https://images.pexels.com/photos/1257133/pexels-photo-1257133.jpeg'
  ],
  'get-well': [
    'https://images.pexels.com/photos/1257134/pexels-photo-1257134.jpeg',
    'https://images.pexels.com/photos/1257135/pexels-photo-1257135.jpeg',
    'https://images.pexels.com/photos/1257136/pexels-photo-1257136.jpeg',
    'https://images.pexels.com/photos/1257137/pexels-photo-1257137.jpeg',
    'https://images.pexels.com/photos/1257138/pexels-photo-1257138.jpeg',
    'https://images.pexels.com/photos/1257139/pexels-photo-1257139.jpeg'
  ],
  congratulations: [
    'https://images.pexels.com/photos/1257140/pexels-photo-1257140.jpeg',
    'https://images.pexels.com/photos/1257141/pexels-photo-1257141.jpeg',
    'https://images.pexels.com/photos/1257142/pexels-photo-1257142.jpeg',
    'https://images.pexels.com/photos/1257143/pexels-photo-1257143.jpeg',
    'https://images.pexels.com/photos/1257144/pexels-photo-1257144.jpeg',
    'https://images.pexels.com/photos/1257145/pexels-photo-1257145.jpeg'
  ],
  sympathy: [
    'https://images.pexels.com/photos/1257146/pexels-photo-1257146.jpeg',
    'https://images.pexels.com/photos/1257147/pexels-photo-1257147.jpeg',
    'https://images.pexels.com/photos/1257148/pexels-photo-1257148.jpeg',
    'https://images.pexels.com/photos/1257149/pexels-photo-1257149.jpeg',
    'https://images.pexels.com/photos/1257150/pexels-photo-1257150.jpeg',
    'https://images.pexels.com/photos/1257151/pexels-photo-1257151.jpeg'
  ],
  diwali: [
    'https://images.pexels.com/photos/3946680/pexels-photo-3946680.jpeg',
    'https://images.pexels.com/photos/3962320/pexels-photo-3962320.jpeg',
    'https://images.pexels.com/photos/3962310/pexels-photo-3962310.jpeg',
    'https://images.pexels.com/photos/3962315/pexels-photo-3962315.jpeg',
    'https://images.pexels.com/photos/3945680/pexels-photo-3945680.jpeg',
    'https://images.pexels.com/photos/3962325/pexels-photo-3962325.jpeg'
  ]
};

const usedImagesByOccasion = {};

export const getRandomImage = (occasion) => {
  // Normalize occasion to match keys exactly
  let occasionKey = occasion ? occasion.toLowerCase().trim() : 'birthday';
  
  // Map variations to exact keys
  const occasionMap = {
    'birthday': 'birthday',
    'christmas': 'christmas',
    'new year': 'newyear',
    'newyear': 'newyear',
    'diwali': 'diwali',
    'valentine': 'valentine',
    'valentines': 'valentine',
    'valentines day': 'valentine',
    'anniversary': 'anniversary',
    'wedding': 'wedding',
    'mothers-day': 'mothers-day',
    'mothers day': 'mothers-day',
    'fathers-day': 'fathers-day',
    'fathers day': 'fathers-day',
    'graduation': 'graduation',
    'baby-shower': 'baby-shower',
    'baby shower': 'baby-shower',
    'thank-you': 'thank-you',
    'thank you': 'thank-you',
    'get-well': 'get-well',
    'get well': 'get-well',
    'congratulations': 'congratulations',
    'sympathy': 'sympathy'
  };
  
  occasionKey = occasionMap[occasionKey] || 'birthday';
  
  const images = realImages[occasionKey];
  
  if (!images || images.length === 0) {
    console.warn(`[WARNING] No images for ${occasion}`);
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
  console.log(`[OK] ${occasionKey.toUpperCase()} image loaded`);
  return selectedImage;
};

export const getAIGeneratedImage = (occasion) => {
  return getRandomImage(occasion);
};
