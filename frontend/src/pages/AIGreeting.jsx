import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRandomImage, getAIGeneratedImage } from '../utils/imageService';

function AIGreeting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    occasion: '',
    recipientName: '',
    relationship: '',
    tone: 'friendly',
    language: 'english'
  });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardImage, setCardImage] = useState('');

  const occasions = [
    'Birthday', 'Christmas', 'New Year', 'Diwali', 'Valentine', 'Anniversary', 
    'Graduation', 'Wedding', 'Thank You', 'Get Well Soon'
  ];

  const relationships = [
    'Friend', 'Family Member', 'Colleague', 'Boss', 'Partner', 'Child', 
    'Parent', 'Sibling', 'Neighbor', 'Teacher'
  ];

  const tones = [
    { value: 'friendly', label: '😊 Friendly' },
    { value: 'formal', label: '🎩 Formal' },
    { value: 'funny', label: '😄 Funny' },
    { value: 'romantic', label: '💕 Romantic' },
    { value: 'inspirational', label: '✨ Inspirational' }
  ];

  const generateGreeting = async () => {
    setLoading(true);
    try {
      const { generateAIGreeting } = await import('../api/aiGreeting');
      const result = await generateAIGreeting(formData);
      setGeneratedMessage(result.message);
      
      // Generate AI image for this occasion
      const newImage = getAIGeneratedImage(formData.occasion);
      setCardImage(newImage);
    } catch (error) {
      console.error('Error generating greeting:', error);
      setGeneratedMessage(`Dear ${formData.recipientName}, sending you warm wishes and positive vibes! May your day be filled with happiness and joy. You're truly special! 💫`);
      const newImage = getAIGeneratedImage(formData.occasion || 'birthday');
      setCardImage(newImage);
    }
    setLoading(false);
  };

  const useThisGreeting = () => {
    navigate('/send/ai-generated', { 
      state: { 
        message: generatedMessage,
        occasion: formData.occasion,
        cardImage: cardImage
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        >
          <span className="mr-2">←</span> Back to Home
        </button>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🤖 AI Greeting Generator
            </h1>
            <p className="text-xl text-gray-600">
              Let AI create the perfect personalized greeting for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell us about your greeting</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Occasion <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {occasions.map(occasion => (
                      <button
                        key={occasion}
                        type="button"
                        onClick={() => setFormData({...formData, occasion})}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          formData.occasion === occasion
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>
                
                <FormInput
                  label="Recipient Name"
                  placeholder="Enter recipient's name"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Relationship
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tone of Message
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {tones.map(tone => (
                      <button
                        key={tone.value}
                        type="button"
                        onClick={() => setFormData({...formData, tone: tone.value})}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          formData.tone === tone.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={generateGreeting}
                  disabled={!formData.occasion || !formData.recipientName || loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all font-semibold text-lg"
                >
                  {loading ? <LoadingSpinner /> : '✨ Generate AI Greeting'}
                </button>
              </div>
            </div>
            
            {/* Generated Message */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your AI-Generated Greeting</h2>
              
              {!generatedMessage && !loading && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🤖</div>
                  <p className="text-gray-500 text-lg">
                    Fill out the form and click "Generate" to create your personalized greeting!
                  </p>
                </div>
              )}
              
              {loading && (
                <div className="text-center py-12">
                  <LoadingSpinner />
                  <p className="text-gray-500 mt-4">AI is crafting your perfect greeting...</p>
                </div>
              )}
              
              {generatedMessage && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {generatedMessage}
                    </p>
                  </div>
                  
                  {/* Clean Card Preview */}
                  <div className="mb-6">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      {/* Clean Image */}
                      <div className="h-48 overflow-hidden">
                        {cardImage ? (
                          <img 
                            src={cardImage} 
                            alt={formData.occasion}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-full flex items-center justify-center">
                            <div className="text-white text-4xl">
                              {formData.occasion === 'Christmas' && '🎄'}
                              {formData.occasion === 'Birthday' && '🎂'}
                              {formData.occasion === 'New Year' && '✨'}
                              {formData.occasion === 'Diwali' && '🪔'}
                              {formData.occasion === 'Valentine' && '💕'}
                              {!formData.occasion && '🤖'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* AI Caption Below */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{formData.occasion || 'AI Greeting'}</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">
                            {generatedMessage ? generatedMessage.substring(0, 80) + '...' : 'AI-generated message will appear here'}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">From: You</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={useThisGreeting}
                      className="flex-1 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                    >
                      ✅ Use This Greeting
                    </button>
                    <button
                      onClick={generateGreeting}
                      className="flex-1 bg-gray-600 text-white p-3 rounded-xl hover:bg-gray-700 transition-colors font-semibold"
                    >
                      🔄 Generate New
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      💡 Tip: You can edit this message when sending your greeting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIGreeting;