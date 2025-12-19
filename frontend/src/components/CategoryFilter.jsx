import React from 'react';

const categories = [
  { id: 'all', name: 'All Cards', icon: '🎉' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'new year', name: 'New Year', icon: '✨' },
  { id: 'diwali', name: 'Diwali', icon: '🪔' },
  { id: 'valentine', name: 'Valentine', icon: '💝' }
];

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
            activeCategory === category.id
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-purple-50 border'
          }`}
        >
          <span>{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;