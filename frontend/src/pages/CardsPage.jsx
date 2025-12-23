import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useVideoTexture, Plane } from '@react-three/drei';
import Header from '../components/Header';
import { getRandomImage } from '../utils/imageService';
import './CardsPage.css'; // Import the new CSS file

// This component holds the 3D video scene
function VideoScene() {
  // This path MUST match the video file name in your `public` folder
  const videoPath = '/Video.mp4'; 
  const texture = useVideoTexture(videoPath);

  const planeRef = useRef();

  // This function runs on every frame, creating the animation
  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <Plane ref={planeRef} args={[1, 1]} scale={[16, 9, 1]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </Plane>
  );
}
const categories = [
  { id: 'all', name: 'All Cards', count: 150 },
  { id: 'custom', name: '📸 Upload Photo', count: 0 },
  { id: 'birthday', name: 'Birthday', count: 25 },
  { id: 'anniversary', name: 'Anniversary', count: 18 },
  { id: 'wedding', name: 'Wedding', count: 22 },
  { id: 'christmas', name: 'Christmas', count: 20 },
  { id: 'newyear', name: 'New Year', count: 15 },
  { id: 'valentine', name: "Valentine's Day", count: 16 },
  { id: 'mothers-day', name: "Mother's Day", count: 12 },
  { id: 'fathers-day', name: "Father's Day", count: 10 },
  { id: 'graduation', name: 'Graduation', count: 14 },
  { id: 'baby-shower', name: 'Baby Shower', count: 13 },
  { id: 'thank-you', name: 'Thank You', count: 18 },
  { id: 'get-well', name: 'Get Well Soon', count: 8 },
  { id: 'congratulations', name: 'Congratulations', count: 16 },
  { id: 'sympathy', name: 'Sympathy', count: 6 }
];

const generateCards = (category, count = 24) => {
  const cards = [];
  const categoryForImages = category === 'all' ? 'birthday' : category;
  
  for (let i = 1; i <= count; i++) {
    cards.push({
      id: `${category}-${i}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Card ${i}`,
      image: getRandomImage(categoryForImages),
      category: category
    });
  }
  return cards;
};

function CardsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('birthday');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'custom') {
      navigate('/custom-upload');
    } else {
      setActiveCategory(categoryId);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const generatedCards = generateCards(activeCategory);
      setCards(generatedCards);
      setLoading(false);
    }, 300);
  }, [activeCategory]);

  const handleCardClick = (card) => {
    navigate(`/send/${card.id}`, {
      state: {
        templateImage: card.image,
        templateCaption: `Beautiful ${card.category} greeting card`,
        occasion: card.category
      }
    });
  };

  return (
    <div className="cards-page-container">
      {/* 3D Animated Background */}
      <div className="background-canvas">
        <Canvas>
          <Suspense fallback={null}>
            <VideoScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Page Content */}
      <div className="content-overlay">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            
            {/* Left Sidebar - Categories */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-semibold text-white">Categories</h2>
                </div>
                <div className="p-4">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-200 flex justify-between items-center ${
                        activeCategory === category.id
                          ? 'bg-purple-500/20 text-purple-200'
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        activeCategory === category.id
                          ? 'bg-purple-500/30 text-purple-200'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Cards Grid */}
            <div className="flex-1">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                      {categories.find(c => c.id === activeCategory)?.name || 'All Cards'}
                    </h1>
                    <div className="text-sm text-gray-400">
                      {cards.length} cards available
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="bg-white/10 aspect-[3/4] rounded-lg mb-3"></div>
                          <div className="bg-white/10 h-4 rounded mb-2"></div>
                          <div className="bg-white/10 h-3 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {cards.map(card => (
                        <div
                          key={card.id}
                          onClick={() => handleCardClick(card)}
                          className="group cursor-pointer bg-black/20 rounded-lg border border-white/10 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={card.image}
                              alt={card.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors duration-200 truncate">
                              {card.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 capitalize">
                              {card.category.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!loading && cards.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-medium text-gray-300 mb-2">No cards found</h3>
                      <p className="text-gray-400">Try selecting a different category</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsPage;