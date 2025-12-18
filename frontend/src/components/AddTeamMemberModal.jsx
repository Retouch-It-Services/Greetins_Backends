import React, { useState } from 'react';
import { createTeamMember, uploadTeamMemberImageBase64 } from '../api/teamMembers';
import ImageCropper from './ImageCropper';

const AddTeamMemberModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    color_theme: 'from-pink-300 to-red-300',
  });
  const [cropImage, setCropImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorThemes = [
    { label: 'Pink to Red', value: 'from-pink-300 to-red-300' },
    { label: 'Blue to Cyan', value: 'from-blue-300 to-cyan-300' },
    { label: 'Orange to Yellow', value: 'from-orange-300 to-yellow-300' },
    { label: 'Green to Emerald', value: 'from-green-300 to-emerald-300' },
    { label: 'Indigo to Purple', value: 'from-indigo-300 to-purple-300' },
    { label: 'Red to Pink', value: 'from-red-300 to-pink-300' },
    { label: 'Cyan to Blue', value: 'from-cyan-300 to-blue-300' },
    { label: 'Amber to Orange', value: 'from-amber-300 to-orange-300' },
    { label: 'Teal to Green', value: 'from-teal-300 to-green-300' },
    { label: 'Violet to Purple', value: 'from-violet-300 to-purple-300' },
  ];

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCropImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setImageData(croppedImage);
    setCropImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const memberData = {
        name: formData.name,
        role: formData.role,
        description: formData.description,
        color_theme: formData.color_theme,
      };

      console.log('Sending member data:', memberData);

      // Create team member
      const newMember = await createTeamMember(memberData);

      console.log('Member created:', newMember);

      // Upload image if provided
      if (imageData) {
        console.log('Uploading image for member:', newMember.id);
        await uploadTeamMemberImageBase64(newMember.id, imageData, 'profile.jpg');
        console.log('Image uploaded successfully');
      }

      alert('Team member added successfully!');
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding team member:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      alert('Failed to add team member: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      role: '',
      description: '',
      color_theme: 'from-pink-300 to-red-300',
    });
    setImageData(null);
    setCropImage(null);
    onClose();
  };

  if (cropImage) {
    return (
      <ImageCropper
        imageUrl={cropImage}
        onCrop={handleCropComplete}
        onCancel={() => setCropImage(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Team Member</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter member name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter role (e.g., Designer)"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
              placeholder="Enter member description"
              rows={3}
            />
          </div>

          {/* Color Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Color Theme</label>
            <select
              name="color_theme"
              value={formData.color_theme}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              {colorThemes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image Preview */}
          {imageData && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Preview</label>
              <img src={imageData} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            </div>
          )}

          {/* Upload Image Button */}
          <div>
            <label className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 text-center cursor-pointer">
              📷 Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
