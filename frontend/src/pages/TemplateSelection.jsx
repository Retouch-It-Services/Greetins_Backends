import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import TemplateCard from '../components/TemplateCard';
import { getRandomImage } from '../utils/imageService';

const generateAICaption = (occasion, title) => {
  const captions = {
    Christmas: [
      '🎄 May your Christmas be merry and bright with love and laughter!',
      '✨ Wishing you magical moments and cherished memories this Christmas!',
      '🎅 Sending warm Christmas wishes filled with joy and peace!',
      '🎁 May the spirit of Christmas bring you happiness and wonder!'
    ],
    Birthday: [
      '🎂 Another year of amazing adventures and beautiful memories awaits!',
      '🎉 Celebrating you and all the joy you bring to the world!',
      '✨ May this new year of life be your best one yet!',
      '🎈 Wishing you endless happiness on your special day!'
    ],
    'New Year': [
      '✨ New year, new dreams, new possibilities ahead!',
      '🎆 Cheers to fresh starts and exciting adventures!',
      '🎉 May this year bring you success and happiness!',
      '✨ Here\'s to making this year absolutely amazing!'
    ],
    Diwali: [
      '🪔 May the festival of lights brighten your path to success!',
      '✨ Wishing you prosperity and joy this Diwali!',
      '🎆 May your life be as colorful as the Diwali celebrations!',
      '🕯️ Light up your world with happiness and love!'
    ]
  };
  
  const occasionCaptions = captions[occasion] || captions.Birthday;
  return occasionCaptions[Math.floor(Math.random() * occasionCaptions.length)];
};

const createTemplate = (id, title, occasion, category) => ({
  id,
  title,
  category,
  occasion,
  gradient: `bg-gradient-to-br from-purple-500 to-pink-500`,
  image: getRandomImage(occasion.toLowerCase()),
  preview: generateAICaption(occasion, title)
});

const baseTemplates = [
  { id: 'birthday-1', title: 'Happy Birthday', occasion: 'Birthday', category: 'Personal' },
  { id: 'christmas-1', title: 'Merry Christmas', occasion: 'Christmas', category: 'Festival' },
  { id: 'newyear-1', title: 'Happy New Year', occasion: 'New Year', category: 'Celebration' },
  { id: 'diwali-1', title: 'Happy Diwali', occasion: 'Diwali', category: 'Festival' },
  { id: 'valentine-1', title: 'Valentine\'s Day', occasion: 'Valentine', category: 'Love' }
];

function TemplateSelection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [templates, setTemplates] = useState([]);
  
  useEffect(() => {
    // Generate templates with random images and AI captions
    const generatedTemplates = baseTemplates.map(base => 
      createTemplate(base.id, base.title, base.occasion, base.category)
    );
    setTemplates(generatedTemplates);
  }, []);
  
  // Generate new content when template is clicked
  const handleTemplateClick = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // Generate new image and caption for this template
      const newImage = getRandomImage(template.occasion);
      const newCaption = generateAICaption(template.occasion, template.title);
      
      console.log('Generated image:', newImage);
      console.log('Generated caption:', newCaption);
      
      // Navigate with fresh content
      navigate(`/send/${templateId}`, {
        state: {
          templateImage: newImage,
          templateCaption: newCaption,
          occasion: template.occasion
        }
      });
    }
  };
  
  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.occasion.toLowerCase() === activeCategory);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <CategoryFilter 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onTemplateClick={handleTemplateClick}
                />
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cards found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateSelection;