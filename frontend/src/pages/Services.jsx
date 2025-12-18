import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TeamCarousel from '../components/TeamCarousel';

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: '🎨',
      title: 'Greeting Card Design',
      description: 'Professional greeting card templates for every occasion. Birthdays, holidays, celebrations, and more - beautifully designed and ready to personalize.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Messages',
      description: 'Smart AI generates heartfelt, personalized messages tailored to your occasion and recipient. Save time while expressing genuine emotions.'
    },
    {
      icon: '📧',
      title: 'Email Delivery Service',
      description: 'Send stunning greeting cards directly to any email address worldwide. Professional formatting ensures perfect display in all email clients.'
    },
    {
      icon: '💬',
      title: 'WhatsApp Integration',
      description: 'Share greetings instantly via WhatsApp. Connect with loved ones on their preferred messaging platform with one-click sharing.'
    },
    {
      icon: '✨',
      title: 'Custom Personalization',
      description: 'Add your personal touch with custom messages, photos, and styling. Make every card uniquely yours with our easy-to-use editor.'
    },
    {
      icon: '⚡',
      title: 'Instant Delivery',
      description: 'Real-time processing and instant delivery. Your greetings reach recipients in seconds, perfect for last-minute celebrations.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive greeting card solutions powered by AI technology
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl hover:border-purple-300 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <button 
                  onClick={() => navigate('/cards')}
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center"
                >
                  Learn More 
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Greetins</h2>
            <p className="text-xl text-gray-600">The complete solution for digital greeting cards</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for everyone</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Instant sending to email and WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Professional designs and AI-powered content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The talented people behind Greetins</p>
          </div>
          <TeamCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Create beautiful greeting cards in minutes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/cards')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Creating Now
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white border-2 border-purple-600 text-purple-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
