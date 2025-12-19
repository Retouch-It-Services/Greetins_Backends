import React, { useState, useEffect } from 'react';
import { getAllTeamMembers, getTeamMemberImage, createTeamMember, deleteTeamMember, uploadTeamMemberImageBase64, updateTeamMember } from '../api/teamMembers';

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null,
    imagePreview: null,
  });

  // Role color options
  const roleColors = [
    { name: 'Pink', value: 'bg-pink-100 text-pink-500 border-pink-200' },
    { name: 'Blue', value: 'bg-blue-100 text-blue-500 border-blue-200' },
    { name: 'Green', value: 'bg-green-100 text-green-600 border-green-200' },
    { name: 'Purple', value: 'bg-purple-100 text-purple-500 border-purple-200' },
    { name: 'Orange', value: 'bg-orange-100 text-orange-500 border-orange-200' },
  ];

  const getRoleColor = (role) => {
    const colors = {
      'Designer': 'bg-pink-100 text-pink-500 border-pink-200',
      'Developer': 'bg-blue-100 text-blue-500 border-blue-200',
      'Marketer': 'bg-green-100 text-green-600 border-green-200',
      'Manager': 'bg-purple-100 text-purple-500 border-purple-200',
      'Analyst': 'bg-orange-100 text-orange-500 border-orange-200',
      'CEO': 'bg-yellow-100 text-yellow-600 border-yellow-200',
      'CTO': 'bg-indigo-100 text-indigo-500 border-indigo-200',
    };
    return colors[role] || 'bg-blue-100 text-blue-500 border-blue-200';
  };

  // Load team members from backend
  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const members = await getAllTeamMembers();
      
      // Load images for each member
      const membersWithImages = await Promise.all(
        members.map(async (member) => {
          try {
            const image = await getTeamMemberImage(member.id);
            return { ...member, image };
          } catch {
            return { ...member, image: null };
          }
        })
      );
      
      setTeamMembers(membersWithImages);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxIndex = Math.max(0, teamMembers.length - 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleCards = teamMembers.slice(currentIndex, currentIndex + 3);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target.result,
          imagePreview: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = async () => {
    if (!formData.name || !formData.role) {
      alert('Please fill in Name and Designation');
      return;
    }

    try {
      // Create team member
      const newMember = await createTeamMember({
        name: formData.name,
        role: formData.role,
        description: formData.description || `${formData.name} - ${formData.role}`,
        color_theme: 'from-blue-300 to-purple-300',
      });

      // Upload image if provided
      if (formData.image) {
        await uploadTeamMemberImageBase64(newMember.id, formData.image, 'profile.jpg');
      }

      // Reload team members
      await loadTeamMembers();
      
      // Reset form and close modal
      setFormData({ name: '', role: '', description: '', image: null, imagePreview: null });
      setShowAddModal(false);
      alert('✅ Team member added successfully!');
    } catch (error) {
      alert('❌ Failed to add team member: ' + error.message);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description || '',
      image: null,
      imagePreview: member.image,
    });
    setShowEditModal(true);
  };

  const handleUpdateMember = async () => {
    try {
      await updateTeamMember(editingMember.id, {
        name: formData.name,
        role: formData.role,
        description: formData.description,
      });

      // Upload new image if provided
      if (formData.image) {
        await uploadTeamMemberImageBase64(editingMember.id, formData.image, 'profile.jpg');
      }

      await loadTeamMembers();
      setShowEditModal(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', description: '', image: null, imagePreview: null });
      alert('✅ Team member updated successfully!');
    } catch (error) {
      alert('❌ Failed to update: ' + error.message);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(memberId);
        await loadTeamMembers();
        alert('✅ Team member deleted!');
      } catch (error) {
        alert('❌ Failed to delete: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="text-center text-gray-600">Loading team members...</div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gray-100">
      <div className="container mx-auto px-4 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Meet Our Team
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet the talented professionals behind Greetins
        </p>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Left Arrow */}
          {teamMembers.length > 3 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 text-blue-400 hover:text-blue-600 transition-colors"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Cards */}
          <div className="flex gap-6 justify-center px-8 md:px-16">
            {visibleCards.length > 0 ? visibleCards.map((member, index) => (
              <div
                key={member.id}
                className={`flex-1 max-w-sm transition-all duration-300 ${
                  index === 1 ? 'transform scale-105 z-10' : 'scale-100'
                }`}
              >
                <div 
                  className={`bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    index === 1 ? 'border-2 border-blue-400' : 'border border-gray-100'
                  }`}
                >
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden mb-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-44 object-cover"
                      />
                    ) : (
                      <div className="w-full h-44 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                        <span className="text-4xl text-gray-500">👤</span>
                      </div>
                    )}
                  </div>

                  {/* Role Badge */}
                  <div className="mb-3">
                    <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-gray-800 font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-snug line-clamp-2">
                    {member.description || `${member.name} - ${member.role}`}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditMember(member)}
                      className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-lg"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-12">
                No team members yet. Click "Add Team Member" to get started!
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {teamMembers.length > 3 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 text-blue-400 hover:text-blue-600 transition-colors"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Dot Indicators */}
        {teamMembers.length > 3 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-blue-600 w-3 h-3'
                    : 'bg-blue-300 w-2.5 h-2.5 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Add Team Member Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ➕ Add Team Member
          </button>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Team Member</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Designation/Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Designer, Developer, Manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description about this team member"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <label className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 text-center cursor-pointer">
                  📷 {formData.imagePreview ? 'Change Image' : 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ name: '', role: '', description: '', image: null, imagePreview: null });
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Team Member</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Designation/Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <label className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 text-center cursor-pointer">
                  📷 Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingMember(null);
                  setFormData({ name: '', role: '', description: '', image: null, imagePreview: null });
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMember}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceCarousel;
