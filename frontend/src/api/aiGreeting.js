import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://greetins-backend.onrender.com/api/v1';

export const generateAIGreeting = async (greetingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/generate-greeting`, {
      occasion: greetingData.occasion,
      recipient_name: greetingData.recipientName,
      relationship: greetingData.relationship,
      tone: greetingData.tone,
      language: greetingData.language || 'english'
    });
    return response.data;
  } catch (error) {
    console.error('Error generating AI greeting:', error);
    // Fallback to local generation if API fails
    return generateLocalGreeting(greetingData);
  }
};

const generateLocalGreeting = (data) => {
  const greetingTemplates = {
    birthday: {
      friendly: `Happy Birthday ${data.recipientName}! 🎉 Hope your special day is filled with happiness, laughter, and all your favorite things. Here's to another amazing year ahead!`,
      formal: `Dear ${data.recipientName}, I would like to extend my warmest birthday wishes to you. May this new year of your life bring you success, good health, and prosperity.`,
      funny: `Another year older, another year wiser... or so they say! 😄 Happy Birthday ${data.recipientName}! Don't worry, you're not getting older, you're just becoming a classic!`,
      romantic: `Happy Birthday to the most amazing person in my life! 💕 ${data.recipientName}, you make every day brighter just by being you. I love you more with each passing year!`,
      inspirational: `Happy Birthday ${data.recipientName}! ✨ May this new chapter of your life be filled with new adventures, dreams coming true, and endless possibilities. You're capable of amazing things!`
    },
    christmas: {
      friendly: `Merry Christmas ${data.recipientName}! 🎄 Wishing you a holiday season filled with cozy moments, cherished memories, and all the joy your heart can hold!`,
      formal: `Season's Greetings ${data.recipientName}. May this Christmas bring you peace, prosperity, and happiness throughout the coming year.`,
      funny: `Ho Ho Ho! 🎅 Merry Christmas ${data.recipientName}! I hope Santa brings you everything on your list... and that you've been good this year (or at least good at hiding it)!`,
      romantic: `Merry Christmas my love! 💕 ${data.recipientName}, you're the best gift I could ever ask for. Here's to spending many more magical holidays together!`,
      inspirational: `Merry Christmas ${data.recipientName}! ✨ May the spirit of Christmas fill your heart with love, your home with joy, and your life with laughter. Believe in the magic of new beginnings!`
    },
    newyear: {
      friendly: `Happy New Year ${data.recipientName}! 🎊 Here's to 365 new days of opportunities, adventures, and making amazing memories together!`,
      formal: `Dear ${data.recipientName}, as we welcome the New Year, I wish you success, good health, and prosperity in all your endeavors.`,
      funny: `Happy New Year ${data.recipientName}! 🥳 New year, new me... just kidding, you're stuck with the same awesome me! Let's make this year legendary!`,
      romantic: `Happy New Year my darling! 💕 ${data.recipientName}, I can't wait to create more beautiful memories with you in the year ahead. You're my forever and always!`,
      inspirational: `Happy New Year ${data.recipientName}! ✨ This is your year to shine, to grow, and to achieve everything you've dreamed of. Believe in yourself - I believe in you!`
    },
    diwali: {
      friendly: `Happy Diwali ${data.recipientName}! 🪔 May the festival of lights brighten your life with happiness, prosperity, and endless joy!`,
      formal: `Warm Diwali greetings to you and your family, ${data.recipientName}. May this auspicious festival bring peace, prosperity, and good fortune to your home.`,
      funny: `Happy Diwali ${data.recipientName}! 🎆 May your life be as bright as the Diwali lights and as sweet as the mithai (but with fewer calories)!`,
      romantic: `Happy Diwali my love! 💕 ${data.recipientName}, you light up my world brighter than any Diwali lamp. Here's to celebrating many more festivals together!`,
      inspirational: `Happy Diwali ${data.recipientName}! ✨ May this festival of lights illuminate your path to success and fill your life with positivity and new opportunities!`
    },
    valentine: {
      friendly: `Happy Valentine's Day ${data.recipientName}! 💝 You're such a wonderful friend, and I'm grateful to have you in my life!`,
      formal: `Dear ${data.recipientName}, wishing you a pleasant Valentine's Day filled with appreciation for all the meaningful relationships in your life.`,
      funny: `Happy Valentine's Day ${data.recipientName}! 😄 Roses are red, violets are blue, you're pretty awesome, and this poem is too!`,
      romantic: `My dearest ${data.recipientName}, Happy Valentine's Day! 💕 You are my heart, my soul, my everything. I fall in love with you more each day!`,
      inspirational: `Happy Valentine's Day ${data.recipientName}! ✨ Remember that you are loved, you are valued, and you bring so much light into this world!`
    }
  };

  const occasion = data.occasion.toLowerCase();
  const tone = data.tone || 'friendly';
  
  const template = greetingTemplates[occasion]?.[tone] || 
                  greetingTemplates[occasion]?.friendly || 
                  `Dear ${data.recipientName}, sending you warm wishes and positive vibes on this special occasion! 💫`;

  return {
    message: template,
    occasion: data.occasion,
    tone: tone
  };
};