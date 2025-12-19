import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TemplateCard({ template, onTemplateClick }) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onTemplateClick) {
      onTemplateClick(template.id);
    }
  };

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 relative overflow-hidden">
          {template.image && !imageError ? (
            <img 
              src={template.image} 
              alt={template.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`${template.gradient} h-full flex items-center justify-center`}>
              <div className="text-white text-center">
                <div className="text-4xl mb-2">
                  {template.occasion === 'Christmas' && '🎄'}
                  {template.occasion === 'New Year' && '✨'}
                  {template.occasion === 'Birthday' && '🎂'}
                  {template.occasion === 'Diwali' && '🪔'}
                  {template.occasion === 'Valentine' && '💕'}
                  {template.occasion === 'Wedding' && '💒'}
                </div>
                <h3 className="text-lg font-semibold">{template.title}</h3>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold drop-shadow-lg">{template.title}</h3>
            <p className="text-sm opacity-90 drop-shadow">{template.category}</p>
          </div>
        </div>
        <div className="p-4">
          {template.preview && (
            <p className="text-sm text-gray-600 mb-3">{template.preview}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{template.occasion}</span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;