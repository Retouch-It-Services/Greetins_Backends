import React from 'react';

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-500 rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
    </div>
  );
}

export default Hero;