import React, { useState } from 'react';

function ImageUploadComponent({ onImageUpload, currentImage = null, title = "Upload Image" }) {
  const [preview, setPreview] = useState(currentImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      setPreview(imageData);
      onImageUpload(imageData);
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read image');
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = files;
      handleFileChange({ target: input });
    }
  };

  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-semibold text-gray-700">{title}</label>
      
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative border-3 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />
        
        <div className="pointer-events-none">
          {loading ? (
            <>
              <div className="text-4xl mb-2 animate-spin">⏳</div>
              <p className="text-gray-600 font-semibold">Uploading...</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3">📸</div>
              <p className="text-gray-700 font-semibold mb-1">Click or Drag to Upload</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF (Max 5MB)</p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Preview:</p>
          <div className="relative rounded-lg overflow-hidden border-2 border-blue-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => {
                setPreview(null);
                onImageUpload(null);
                setError(null);
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
              title="Remove image"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">Click ✕ to remove image</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploadComponent;
