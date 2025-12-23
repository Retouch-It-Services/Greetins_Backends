import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function CustomPhotoUpload() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (uploadedImage) {
      navigate('/send/custom-photo', {
        state: {
          templateImage: uploadedImage,
          templateCaption: 'Custom photo greeting',
          occasion: 'custom'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Upload Your Photo</h1>
            <p className="text-gray-300 text-center mb-8">Upload a photo and add your personalized wishes</p>
            
            <div className="space-y-6">
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-purple-400 transition-colors bg-white/5">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-lg text-gray-300 font-semibold">Click to upload photo</p>
                    <p className="text-sm text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-96 object-cover rounded-xl" />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setUploadedImage(null);
                      }}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Continue to Add Wishes →
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <h3 className="text-white font-semibold mb-2">💡 Tips:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Use high-quality photos for best results</li>
                <li>• Portrait orientation works best for greeting cards</li>
                <li>• You can add text and wishes in the next step</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomPhotoUpload;
