import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TeamCarousel from '../components/TeamCarousel'; 
import { Suspense } from 'react';
import SolarSystemWrapper from '../components/SolarSystemWrapper';

// Add custom animations
const customStyles = `
  @keyframes swing {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    75% { transform: rotate(-3deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes scroll-text {
    from { transform: translateX(50%); }
    to { transform: translateX(-50%); }
  }

  .scroll-container {
    overflow: hidden;
  }

  .scroll-text {
    animation: scroll-text 30s linear infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}

function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: '🎨', title: 'Beautiful Templates', desc: 'Stunning designs for every occasion' },
    { icon: '⚡', title: 'Instant Delivery', desc: 'Send greetings in seconds' },
    { icon: '📱', title: 'Multi-Channel', desc: 'Email & WhatsApp delivery' },
    { icon: '🤖', title: 'AI-Powered', desc: 'Smart message suggestions' }
  ];

  return (
    <div className="min-h-screen" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Suspense fallback={null}>
          <SolarSystemWrapper />
        </Suspense>
      </div>
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4 scroll-container">
                <div className="scroll-text whitespace-nowrap">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight inline-block">
                    Create & Send
                    <span className="block text-yellow-300">Amazing Greetings</span>
                  </h1>
                </div>
                <div className="scroll-container">
                  <p className="text-xl text-purple-100 leading-relaxed scroll-text whitespace-nowrap inline-block">
                    Design personalized greeting cards with AI assistance and send them instantly via Email or WhatsApp to make every occasion memorable.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/cards')}
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  🎨 Create Cards Now
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="flex space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50K+</div>
                  <div className="text-sm text-purple-200">Cards Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">100+</div>
                  <div className="text-sm text-purple-200">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">24/7</div>
                  <div className="text-sm text-purple-200">Available</div>
                </div>
              </div>
            </div>
            
            {/* Right Card Gallery */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-6 text-center">Featured Templates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}} onClick={() => navigate('/cards')}>
                      <div className="w-full h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">🎂</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center font-medium">Birthday Cards</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer" style={{animation: 'swing 4s ease-in-out infinite', animationDelay: '1s'}} onClick={() => navigate('/cards')}>
                      <div className="w-full h-32 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">🎄</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center font-medium">Christmas Cards</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer" style={{animation: 'float 3.5s ease-in-out infinite', animationDelay: '0.5s'}} onClick={() => navigate('/cards')}>
                      <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">🎊</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center font-medium">New Year Cards</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer animate-pulse" style={{animationDuration: '2.5s'}} onClick={() => navigate('/cards')}>
                      <div className="w-full h-24 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">💕</span>
                      </div>
                      <p className="text-xs text-gray-600 text-center font-medium">Valentine Cards</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button 
                    onClick={() => navigate('/cards')}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    View All Cards →
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Popular Greeting Categories
                </h2>
                <p className="text-xl text-gray-300">
                  Choose from our most loved greeting card collections
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { name: 'Birthday', emoji: '🎂', count: '25+ Cards', color: 'from-pink-400 to-red-400' },
                  { name: 'Christmas', emoji: '🎄', count: '30+ Cards', color: 'from-green-400 to-red-400' },
                  { name: 'New Year', emoji: '✨', count: '20+ Cards', color: 'from-blue-400 to-purple-400' },
                  { name: 'Diwali', emoji: '🪔', count: '15+ Cards', color: 'from-yellow-400 to-orange-400' },
                  { name: 'Valentine', emoji: '💕', count: '18+ Cards', color: 'from-pink-400 to-red-500' }
                ].map((category, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate('/cards')}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      {category.emoji}
                    </div>
                    <h3 className="text-lg font-bold text-white text-center mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-300 text-center">{category.count}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-300">
                  Create and send beautiful greetings in just 3 simple steps
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                {[
                  { step: '1', title: 'Choose Template', desc: 'Select from our beautiful collection of greeting card templates', icon: '🎨' },
                  { step: '2', title: 'Personalize', desc: 'Add your message, customize with AI assistance, and make it unique', icon: '✏️' },
                  { step: '3', title: 'Send Instantly', desc: 'Share via Email or WhatsApp with just one click', icon: '📤' }
                ].map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.desc}</p>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
        </section>

        {/* Meet Our Team Section */}
        <TeamCarousel />

        {/* Features Section */}
        <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Greetins?
            </h2>
            <p className="text-xl text-gray-300">
              The most advanced greeting card platform with AI-powered features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </section>


        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center bg-black/30 backdrop-blur-sm py-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Spread Some Joy?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Greetins to make their special moments even more memorable.
            </p>
            <button 
              onClick={() => navigate('/cards')}
              className="bg-white text-purple-600 px-10 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now 🚀
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Greetins</h3>
              <p className="text-gray-400">
                AI-Enhanced greeting cards for every special moment.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Templates</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">About</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Contact</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Help Center</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            {/* Website Link */}
            <div className="mb-4">
              <a href="https://risinternational.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                www.risinternational.com
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-4">
              <a href="https://www.facebook.com/share/1FmZVWtD9n/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a href="https://x.com/retouchin_it" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a href="https://www.instagram.com/risinternational_services?igsh=bnd2MHl5c2s3eDA0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a href="https://youtube.com/@risinternational-net?si=thU1_Kr2dw0lvyC6" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
            
            <p>&copy; 2025 Greetins. All rights reserved.</p>
          </div>
        </div>
        </footer>
      </div>    </div>
  );
}
export default Landing;
