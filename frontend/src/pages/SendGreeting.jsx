import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { sendGreeting } from '../api/greetings';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';
import ParticleBackground from './ParticleBackground'; // Import the 3D background

// Convert image URL to base64 for email embedding
const convertImageToBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

function SendGreeting() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get personalization data from PersonalizeCard page
  const personalizationData = location.state;
  const templateData = personalizationData?.templateData;
  
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    recipient_name: '',
    sender_whatsapp: '',
    recipient_email: '',
    recipient_whatsapp: '',
    message: location.state?.aiGeneratedMessage || location.state?.message || ''
  });
  
  useEffect(() => {
    // This effect is kept to handle updates if the user navigates back and forth
    if (location.state?.aiGeneratedMessage && formData.message !== location.state.aiGeneratedMessage) {
      setFormData(prev => ({
        ...prev,
        message: location.state.aiGeneratedMessage
      }));
    } else if (location.state?.message) {
      setFormData(prev => ({
        ...prev,
        message: location.state.message
      }));
    } 
  }, [location.state?.aiGeneratedMessage, location.state?.message, formData.message]);
  
  const cardImage = personalizationData?.uploadedImage || location.state?.cardImage || location.state?.templateImage;
  
  const getCardTitle = () => {
    if (templateData?.title) return templateData.title;
    if (templateId === 'ai-generated') {
      return location.state?.occasion || 'AI Generated Greeting';
    }
    return templateId.replace('-', ' ');
  };
  
  const getCardEmoji = () => {
    const occasion = templateData?.occasion?.toLowerCase() || location.state?.occasion?.toLowerCase() || templateId.toLowerCase();
    if (occasion.includes('christmas')) return '🎄';
    if (occasion.includes('birthday')) return '🎂';
    if (occasion.includes('new year')) return '✨';
    if (occasion.includes('diwali')) return '🪔';
    if (occasion.includes('valentine')) return '💕';
    if (occasion.includes('wedding')) return '💒';
    return '🤖';
  };
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [generatingAI, setGeneratingAI] = useState(false);

  const handleGenerateAI = async () => {
    setGeneratingAI(true);
    setStatus(''); // Clear previous status messages
    try {
      const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(
        `${API_URL}/greetings/ai/generate-greeting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occasion: templateData?.occasion || location.state?.occasion || 'greeting',
            recipient_name: formData.recipient_name || "a loved one",
            tone: "warm",
          }),
        }
      );

      if (!response.ok) {
        // Try to get a detailed error message from the backend
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.detail || `Failed to generate AI message (Status: ${response.status})`;
        setStatus({ type: 'error', message: errorMessage });
        console.error("AI Generation Error:", errorData || response.statusText);
        return; // Stop execution
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        message: data.wish
      }));
    } catch (error) {
      console.error("Network or other error generating AI message:", error);
      setStatus({ type: 'error', message: 'A network error occurred. Please check your connection.' });
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.sender_name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name' });
      return;
    }
    if (!formData.sender_email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email' });
      return;
    }
    if (deliveryMethod === 'email' && !formData.recipient_email.trim()) {
      setStatus({ type: 'error', message: 'Please enter recipient email' });
      return;
    }
    if (deliveryMethod === 'whatsapp' && !formData.recipient_whatsapp.trim()) {
      setStatus({ type: 'error', message: 'Please enter recipient WhatsApp number' });
      return;
    }
    
    // Use template title as message if message is empty
    const messageToSend = formData.message.trim() || getCardTitle();
    
    setLoading(true);
    try {
      // Convert local asset images to base64 for email embedding
      let imageToSend = cardImage;
      console.log('Original cardImage:', cardImage ? cardImage.substring(0, 100) : 'NO IMAGE');
      
      if (cardImage && cardImage.startsWith('/assets/')) {
        console.log('Converting local asset to base64...');
        const base64Image = await convertImageToBase64(cardImage);
        if (base64Image) {
          imageToSend = base64Image;
          console.log('Image converted to base64 successfully, length:', base64Image.length);
        } else {
          console.log('Failed to convert image to base64');
        }
      } else if (cardImage && cardImage.startsWith('data:image')) {
        console.log('Image is already base64, length:', cardImage.length);
      }
      
      console.log('Final imageToSend:', imageToSend ? imageToSend.substring(0, 100) : 'NO IMAGE');
      
      const response = await sendGreeting({
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        sender_whatsapp: formData.sender_whatsapp,
        recipient_email: formData.recipient_email,
        recipient_whatsapp: formData.recipient_whatsapp,
        greeting_template_id: templateId || 'birthday-1',
        message: messageToSend,
        card_image: imageToSend  // Include the uploaded or template image (converted to base64 if local)
      });
      
      // Check if the response status indicates success or failure
      if (response.success) {
        setStatus({ type: 'success', message: response.message });
      } else {
        // Status is 'failed' - treat as error
        setStatus({ type: 'error', message: response.message || 'Failed to send greeting' });
      }
    } catch (error) {
      console.error('Full error object:', error);
      
      let errorMessage = 'Network Error - Unable to send greeting';
      
      // Check for network/connection errors
      if (!error.response) {
        // Network error - no response from server
        errorMessage = `Network Error: Unable to connect to server. Please check your internet connection and try again.`;
        console.error('Network error details:', error.message);
      } else if (error.response?.status === 500) {
        // Server error
        errorMessage = error.response?.data?.detail || 'Server Error - Please try again later';
      } else if (error.response?.data?.message) {
        // API response with message field
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        // Pydantic validation errors or other details
        const detail = error.response.data.detail;
        if (Array.isArray(detail)) {
          errorMessage = detail.map(err => err.msg || JSON.stringify(err)).join(', ');
        } else if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (typeof detail === 'object') {
          errorMessage = JSON.stringify(detail);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setStatus({ type: 'error', message: errorMessage });
    }
    setLoading(false);
  };

  // Style for a dark, subtle watercolor effect on the cards
  const cardStyle = {
    backgroundColor: 'rgba(10, 10, 10, 0.4)', // A dark, semi-transparent base
    backgroundImage: `
      radial-gradient(at 10% 20%, hsla(260, 40%, 25%, 0.3) 0px, transparent 50%),
      radial-gradient(at 80% 85%, hsla(300, 35%, 20%, 0.4) 0px, transparent 50%)
    `,
    // backdropFilter: 'blur(8px)', // Removed blur from the main card
  };

  return (
    <div className="min-h-screen bg-black" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Custom styles to make form inputs transparent */}
      <style>{`
        .form-card-section input,
        .form-card-section textarea {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          backdrop-filter: blur(10px) !important;
        }
        .form-card-section input::placeholder,
        .form-card-section textarea::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .form-card-section label {
          color: #d1d5db !important; /* text-gray-300 */
        }
        header {
          background-color: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(10px) !important;
        }
      `}</style>
      {/* 3D Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <ParticleBackground />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-purple-300 hover:text-purple-100 transition-colors"
        >
          <span className="mr-2">←</span> Back to Home
        </button>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Preview Section */}
          <div style={cardStyle} className="rounded-2xl shadow-lg p-8 border border-white/10">
            {/* Card Design */}
            {/* Clean Card Design */}
            <div className="bg-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Clean Image - No Overlays */}
              <div className="h-64 overflow-hidden">
                {cardImage ? (
                  <img 
                    src={cardImage} 
                    alt={getCardTitle()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-full flex items-center justify-center">
                    <div className="text-white text-6xl">{getCardEmoji()}</div>
                  </div>
                )}
              </div>
              
              {/* AI Generated Caption Below Image */}
              <div className="p-6">
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <p className="text-gray-200 text-base leading-relaxed">
                    {formData.message || 'Your personalized AI-generated message will appear here...'}
                  </p>
                </div>
                
                <div className="text-sm text-gray-400">
                  From: {formData.sender_name || 'Your Name'}
                </div>
              </div>
            </div>
            
            {/* AI Generate Button */}
            <div className="mt-6">
              <button
                onClick={handleGenerateAI}
                className="w-full bg-white/10 text-white font-semibold py-3 px-6 rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                disabled={generatingAI}
              >
                {generatingAI ? <LoadingSpinner /> : '🤖 AI Generate Wishes'}
              </button>
            </div>

            {/* Preview Info */}
            <div className="mt-4 p-3 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>{deliveryMethod === 'email' ? '📧 Email' : '💬 WhatsApp'}</span>
                <span>{templateId}</span>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div style={cardStyle} className="form-card-section rounded-2xl shadow-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send Your Greeting</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <FormInput
                label="Your Name"
                placeholder="Enter your full name"
                value={formData.sender_name}
                onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                required
              />

              <FormInput
                label="Your Email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.sender_email}
                onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                required
              />
              
              <FormInput
                label="Recipient Name"
                placeholder="Enter recipient's name"
                value={formData.recipient_name}
                onChange={(e) => setFormData({...formData, recipient_name: e.target.value})}
                required
              />

              <FormInput
                label="Recipient Email"
                type="email"
                placeholder="recipient@example.com"
                value={formData.recipient_email}
                onChange={(e) => setFormData({...formData, recipient_email: e.target.value})}
                required
              />
              
              <FormInput
                label="Personal Message (Optional - will use card title if empty)"
                placeholder="Write your heartfelt message here..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
              />
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all font-semibold text-lg"
              >
                {loading ? <LoadingSpinner /> : `Send via ${deliveryMethod === 'email' ? 'Email' : 'WhatsApp'}`}
              </button>
            </form>
            
            {status && (
              <div className={`mt-6 p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {status.type === 'success' ? '✅' : '❌'} {String(status.message)}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SendGreeting;