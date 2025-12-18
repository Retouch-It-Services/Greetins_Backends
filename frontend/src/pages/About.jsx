import React from 'react';
import Header from '../components/Header';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Greetins</h1>
            <p className="text-xl text-gray-600">
              AI-Enhanced Greeting Card Platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎨 Beautiful Templates</h2>
              <p className="text-gray-600">
                Choose from our curated collection of stunning greeting card templates 
                for every occasion - birthdays, holidays, celebrations, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📱 Multi-Channel Delivery</h2>
              <p className="text-gray-600">
                Send your personalized greetings via email or WhatsApp with just a few clicks. 
                Reach your loved ones wherever they are.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🤖 AI-Powered</h2>
              <p className="text-gray-600">
                Our AI helps you craft the perfect message and ensures your greetings 
                are delivered beautifully formatted and on time.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">⚡ Instant Delivery</h2>
              <p className="text-gray-600">
                No waiting, no delays. Your greeting cards are processed and delivered 
                instantly to make every moment special.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Send Some Joy?</h2>
            <p className="text-xl mb-6">Start creating beautiful greeting cards today!</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;