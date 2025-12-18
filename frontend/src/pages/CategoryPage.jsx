import React, { useState, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useVideoTexture, Plane } from '@react-three/drei';
import Header from '../components/Header';
import './CategoryPage.css'; // Make sure this CSS file is imported

// This component holds the 3D video scene
function VideoScene() {
  const { viewport } = useThree();
  // This path MUST match the video file name in your `public` folder
  const videoPath = '/Video.mp4'; 
  const texture = useVideoTexture(videoPath);

  const planeRef = useRef();
  const videoAspectRatio = 16 / 9;

  // This function runs on every frame, creating the animation
  useFrame((state, delta) => {
    if (planeRef.current) {
      // Subtle zoom and rotation for a more dynamic feel
      planeRef.current.rotation.z += delta * 0.05;
      // Subtle zoom for a dynamic feel
      planeRef.current.scale.lerp({ x: 1.2, y: 1.2, z: 1 }, delta * 0.5);
    }
  });

  return (
    <Plane 
      ref={planeRef} 
      args={[1, 1]} 
      // This scales the video to fill the screen while maintaining aspect ratio
      scale={[viewport.width, viewport.height, 1]}
    >
      <meshBasicMaterial map={texture} toneMapped={false} />
    </Plane>
  );
}

function CategoryPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'birthday', name: 'Birthday', emoji: '🎂', count: 156, color: 'from-pink-400 to-red-400' },
    { id: 'anniversary', name: 'Anniversary', emoji: '💍', count: 89, color: 'from-purple-400 to-pink-400' },
    { id: 'wedding', name: 'Wedding', emoji: '💒', count: 124, color: 'from-rose-400 to-pink-500' },
    { id: 'baby', name: 'New Baby', emoji: '👶', count: 67, color: 'from-blue-300 to-cyan-400' },
    { id: 'graduation', name: 'Graduation', emoji: '🎓', count: 45, color: 'from-indigo-400 to-blue-500' },
    { id: 'thankyou', name: 'Thank You', emoji: '🙏', count: 78, color: 'from-green-400 to-teal-400' },
    { id: 'getwell', name: 'Get Well', emoji: '🌸', count: 34, color: 'from-yellow-300 to-orange-400' },
    { id: 'sympathy', name: 'Sympathy', emoji: '🕊️', count: 23, color: 'from-gray-400 to-slate-500' },
    { id: 'christmas', name: 'Christmas', emoji: '🎄', count: 198, color: 'from-green-500 to-red-500' },
    { id: 'newyear', name: 'New Year', emoji: '🎊', count: 87, color: 'from-blue-500 to-purple-600' },
    { id: 'valentine', name: 'Valentine', emoji: '💕', count: 145, color: 'from-pink-500 to-red-600' },
    { id: 'mothersday', name: 'Mother\'s Day', emoji: '🌹', count: 92, color: 'from-pink-400 to-rose-500' }
  ];

  const sidebarCategories = [
    { id: 'all', name: 'All Categories', count: categories.reduce((sum, cat) => sum + cat.count, 0) },
    { id: 'holidays', name: 'Holidays', count: 482 },
    { id: 'personal', name: 'Personal Events', count: 381 },
    { id: 'special', name: 'Special Occasions', count: 267 }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate('/templates', { state: { selectedCategory: categoryId } });
  };

  return (
    <div className="category-page-container">
      {/* 3D Animated Background */}
      <div className="background-canvas">
        {/* This is the correct, working background implementation */}
        <Canvas>
          <Suspense fallback={null}>
            <VideoScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Page Content */}
      <div className="content-overlay">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <div className="flex gap-8">
            
            {/* Left Sidebar */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-6 items-stretch">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {sidebarCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-500/20 text-purple-200 font-medium'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-400">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Popular</h3>
                <div className="space-y-3">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <span className="text-lg">{category.emoji}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">{category.name}</div>
                        <div className="text-xs text-gray-400">{category.count} cards</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1">
              <div className="mb-6 p-4 rounded-lg bg-black/20">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {sidebarCategories.find(c => c.id === selectedCategory)?.name || 'All Categories'}
                </h1>
                <p className="text-gray-300">
                  Choose from {categories.length} different card categories
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 hover:shadow-purple-500/20 transition-shadow cursor-pointer overflow-hidden"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className={`bg-gradient-to-br ${category.color} h-32 flex items-center justify-center`}>
                      <span className="text-4xl">{category.emoji}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.count} cards available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;