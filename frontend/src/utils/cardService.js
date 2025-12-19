// Card Service - Comprehensive card templates similar to ecardforest.com
// Each card has design details and professional layouts
// Images scraped from Pexels and other free stock photo websites

const cardTemplates = {
  birthday: {
    category: 'Birthday',
    emoji: '🎂',
    color: '#FF6B9D',
    description: 'Celebrate special moments',
    cards: [
      {
        id: 'birthday-1',
        name: 'Birthday Card with Heart Illustrations',
        image: 'https://images.pexels.com/photos/2072149/pexels-photo-2072149.jpeg',
        tag: 'Modern',
        description: 'Vibrant birthday card with heart illustrations'
      },
      {
        id: 'birthday-2',
        name: 'Happy Birthday on Marble Surface',
        image: 'https://images.pexels.com/photos/2072153/pexels-photo-2072153.jpeg',
        tag: 'Elegant',
        description: 'Celebratory birthday card on elegant marble'
      },
      {
        id: 'birthday-3',
        name: 'Time to Celebrate Textile',
        image: 'https://images.pexels.com/photos/1959418/pexels-photo-1959418.jpeg',
        tag: 'Classic',
        description: 'Soft fabric background birthday card'
      },
      {
        id: 'birthday-4',
        name: 'Birthday with Confetti Celebration',
        image: 'https://images.pexels.com/photos/3123915/pexels-photo-3123915.jpeg',
        tag: 'Festive',
        description: 'Vibrant celebration with confetti and balloon'
      },
      {
        id: 'birthday-5',
        name: 'Cozy Birthday Dessert',
        image: 'https://images.pexels.com/photos/34935967/pexels-photo-34935967.jpeg',
        tag: 'Sweet',
        description: 'Warm birthday scene with dessert and candles'
      },
      {
        id: 'birthday-6',
        name: 'Colorful Party Supplies Flatlay',
        image: 'https://images.pexels.com/photos/7123101/pexels-photo-7123101.jpeg',
        tag: 'Vibrant',
        description: 'Playful birthday party flatlay composition'
      },
      {
        id: 'birthday-7',
        name: 'Birthday Card with Rose Petals',
        image: 'https://images.pexels.com/photos/4041237/pexels-photo-4041237.jpeg',
        tag: 'Romantic',
        description: 'Elegant card surrounded by rose petals'
      },
      {
        id: 'birthday-8',
        name: 'Birthday Card with Macarons',
        image: 'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg',
        tag: 'Sophisticated',
        description: 'Charming card with flowers and macarons'
      }
    ]
  },
  
  christmas: {
    category: 'Christmas',
    emoji: '🎄',
    color: '#C41E3A',
    description: 'Festive holiday wishes',
    cards: [
      {
        id: 'christmas-1',
        name: 'Christmas Wreath with Red Berries',
        image: 'https://images.pexels.com/photos/695971/pexels-photo-695971.jpeg',
        tag: 'Traditional',
        description: 'Vibrant Christmas wreath with festive berries'
      },
      {
        id: 'christmas-2',
        name: 'Christmas Candy Canes and Ornaments',
        image: 'https://images.pexels.com/photos/290220/pexels-photo-290220.jpeg',
        tag: 'Classic',
        description: 'Close-up of holiday decorations on tree'
      },
      {
        id: 'christmas-3',
        name: 'Christmas Gifts and Baubles Flatlay',
        image: 'https://images.pexels.com/photos/1303094/pexels-photo-1303094.jpeg',
        tag: 'Festive',
        description: 'Rustic wooden background with gifts'
      },
      {
        id: 'christmas-4',
        name: 'Merry Christmas Greeting Tag',
        image: 'https://images.pexels.com/photos/1652421/pexels-photo-1652421.jpeg',
        tag: 'Elegant',
        description: 'Classic Merry Christmas tag on tree'
      },
      {
        id: 'christmas-5',
        name: 'Holiday Gift Boxes with Ribbons',
        image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg',
        tag: 'Decorative',
        description: 'Colorful wrapped gifts on wooden surface'
      },
      {
        id: 'christmas-6',
        name: 'Artistic Holiday Card Designs',
        image: 'https://images.pexels.com/photos/3358727/pexels-photo-3358727.jpeg',
        tag: 'Creative',
        description: 'Watercolor paintings and brushes'
      },
      {
        id: 'christmas-7',
        name: 'Woman in Santa Outfit',
        image: 'https://images.pexels.com/photos/35036457/pexels-photo-35036457.jpeg',
        tag: 'Fun',
        description: 'Festive Santa costume celebration'
      },
      {
        id: 'christmas-8',
        name: 'Decorated Christmas Tree',
        image: 'https://images.pexels.com/photos/35073030/pexels-photo-35073030.jpeg',
        tag: 'Joyful',
        description: 'Traditional Christmas tree with ornaments'
      }
    ]
  },
  
  newyear: {
    category: 'New Year',
    emoji: '✨',
    color: '#FFD700',
    description: 'Fresh start and new beginnings',
    cards: [
      {
        id: 'newyear-1',
        name: 'New Year Card with Pine Sprigs',
        image: 'https://images.pexels.com/photos/5709035/pexels-photo-5709035.jpeg',
        tag: 'Minimalist',
        description: 'Elegant minimalist New Year card'
      },
      {
        id: 'newyear-2',
        name: 'Happy New Year Calligraphy',
        image: 'https://images.pexels.com/photos/8715542/pexels-photo-8715542.jpeg',
        tag: 'Artistic',
        description: 'Beautiful calligraphy on New Year card'
      },
      {
        id: 'newyear-3',
        name: 'Woman with New Year Card and Wine',
        image: 'https://images.pexels.com/photos/6224413/pexels-photo-6224413.jpeg',
        tag: 'Celebratory',
        description: 'Festive New Year celebration'
      },
      {
        id: 'newyear-4',
        name: 'New Year 2021 Calligraphy Cards',
        image: 'https://images.pexels.com/photos/6149109/pexels-photo-6149109.jpeg',
        tag: 'Modern',
        description: 'Contemporary festive calligraphy'
      },
      {
        id: 'newyear-5',
        name: 'Christmas Cards Still Life',
        image: 'https://images.pexels.com/photos/6149049/pexels-photo-6149049.jpeg',
        tag: 'Artistic',
        description: 'Beautiful arrangement of holiday cards'
      },
      {
        id: 'newyear-6',
        name: 'New Year Card Writing',
        image: 'https://images.pexels.com/photos/8715539/pexels-photo-8715539.jpeg',
        tag: 'Handmade',
        description: 'Creating New Year card by hand'
      },
      {
        id: 'newyear-7',
        name: 'New Year with Pine Branches',
        image: 'https://images.pexels.com/photos/7985204/pexels-photo-7985204.jpeg',
        tag: 'Natural',
        description: 'Card with natural pine decorations'
      },
      {
        id: 'newyear-8',
        name: 'Winter Landscape New Year',
        image: 'https://images.pexels.com/photos/6530841/pexels-photo-6530841.jpeg',
        tag: 'Scenic',
        description: 'Cozy winter landscape scene'
      }
    ]
  },
  
  diwali: {
    category: 'Diwali',
    emoji: '🪔',
    color: '#FF6B35',
    description: 'Festival of lights and joy',
    cards: [
      {
        id: 'diwali-1',
        name: 'Happy Diwali Lamps',
        image: 'https://images.pexels.com/photos/3946680/pexels-photo-3946680.jpeg',
        tag: 'Traditional',
        description: 'Traditional oil lamps design'
      },
      {
        id: 'diwali-2',
        name: 'Happy Diwali Lights',
        image: 'https://images.pexels.com/photos/3962320/pexels-photo-3962320.jpeg',
        tag: 'Bright',
        description: 'Festive lights celebration'
      },
      {
        id: 'diwali-3',
        name: 'Happy Diwali Fireworks',
        image: 'https://images.pexels.com/photos/3962310/pexels-photo-3962310.jpeg',
        tag: 'Vibrant',
        description: 'Fireworks display'
      },
      {
        id: 'diwali-4',
        name: 'Happy Diwali Rangoli',
        image: 'https://images.pexels.com/photos/3962315/pexels-photo-3962315.jpeg',
        tag: 'Colorful',
        description: 'Beautiful rangoli design'
      },
      {
        id: 'diwali-5',
        name: 'Happy Diwali Sweets',
        image: 'https://images.pexels.com/photos/3945680/pexels-photo-3945680.jpeg',
        tag: 'Sweet',
        description: 'Festival sweets design'
      },
      {
        id: 'diwali-6',
        name: 'Happy Diwali Gold',
        image: 'https://images.pexels.com/photos/3962325/pexels-photo-3962325.jpeg',
        tag: 'Elegant',
        description: 'Golden celebration design'
      },
      {
        id: 'diwali-7',
        name: 'Happy Diwali Lotus',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        tag: 'Serene',
        description: 'Lotus flower design'
      },
      {
        id: 'diwali-8',
        name: 'Happy Diwali Blessings',
        image: 'https://images.pexels.com/photos/3738337/pexels-photo-3738337.jpeg',
        tag: 'Spiritual',
        description: 'Blessings and wishes'
      }
    ]
  },
  
  valentine: {
    category: 'Valentine',
    emoji: '💕',
    color: '#FF1493',
    description: 'Express your love and affection',
    cards: [
      {
        id: 'valentine-1',
        name: 'Heart-Shaped Lollipops Love Card',
        image: 'https://images.pexels.com/photos/6798404/pexels-photo-6798404.jpeg',
        tag: 'Romantic',
        description: 'Heart lollipops with love card'
      },
      {
        id: 'valentine-2',
        name: 'Romantic Poem Card',
        image: 'https://images.pexels.com/photos/3927280/pexels-photo-3927280.jpeg',
        tag: 'Poetic',
        description: 'Handwritten romantic message'
      },
      {
        id: 'valentine-3',
        name: 'Man Holding Valentine Card',
        image: 'https://images.pexels.com/photos/6708918/pexels-photo-6708918.jpeg',
        tag: 'Modern',
        description: 'Valentine card celebration photo'
      },
      {
        id: 'valentine-4',
        name: 'Woman with Valentine Card',
        image: 'https://images.pexels.com/photos/6709026/pexels-photo-6709026.jpeg',
        tag: 'Playful',
        description: 'Stylish Valentine card photo'
      },
      {
        id: 'valentine-5',
        name: 'Stupid Cupid Scrabble Card',
        image: 'https://images.pexels.com/photos/6694112/pexels-photo-6694112.jpeg',
        tag: 'Fun',
        description: 'Creative Scrabble tile card'
      },
      {
        id: 'valentine-6',
        name: 'Couple Kissing with Rose',
        image: 'https://images.pexels.com/photos/6708759/pexels-photo-6708759.jpeg',
        tag: 'Intimate',
        description: 'Romantic couple celebration'
      }
    ]
  },
};

// Get all categories
export const getCategories = () => {
  return Object.keys(cardTemplates).map(key => ({
    key,
    ...cardTemplates[key]
  }));
};

// Get cards for a specific category
export const getCardsByCategory = (categoryKey) => {
  const category = cardTemplates[categoryKey];
  if (!category) return [];
  return category.cards;
};

// Get a specific card by ID
export const getCardById = (cardId) => {
  for (const category of Object.values(cardTemplates)) {
    const card = category.cards.find(c => c.id === cardId);
    if (card) return card;
  }
  return null;
};

// Get all cards
export const getAllCards = () => {
  const allCards = [];
  for (const category of Object.values(cardTemplates)) {
    allCards.push(...category.cards);
  }
  return allCards;
};

// Search cards by name or description
export const searchCards = (query) => {
  const lowerQuery = query.toLowerCase();
  return getAllCards().filter(card =>
    card.name.toLowerCase().includes(lowerQuery) ||
    card.description.toLowerCase().includes(lowerQuery) ||
    card.tag.toLowerCase().includes(lowerQuery)
  );
};

// Get random card from category
export const getRandomCardFromCategory = (categoryKey) => {
  const cards = getCardsByCategory(categoryKey);
  if (cards.length === 0) return null;
  return cards[Math.floor(Math.random() * cards.length)];
};

// Get cards by tag
export const getCardsByTag = (tag) => {
  return getAllCards().filter(card => card.tag.toLowerCase() === tag.toLowerCase());
};

export default cardTemplates;
