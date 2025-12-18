import React, { useState, useEffect } from 'react';
import { loadTeamMembers, saveTeamMembers } from '../image/teamMemberData';
import ImageUploadComponent from './ImageUploadComponent';

function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  useEffect(() => {
    // Load team members from localStorage
    const members = loadTeamMembers();
    setTeamMembers(members);
  }, []);

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageUpload = (imageData) => {
    setEditForm({ ...editForm, image: imageData });
  };

  const handleSave = () => {
    const updatedMembers = teamMembers.map(member =>
      member.id === editingId ? editForm : member
    );
    setTeamMembers(updatedMembers);
    saveTeamMembers(updatedMembers);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const getVisibleMembers = () => {
    const members = [];
    const total = teamMembers.length;
    
    for (let i = 0; i < Math.min(3, total); i++) {
      const index = (currentSlide + i) % total;
      members.push(teamMembers[index]);
    }
    return members;
  };

  // If editing, show modal
  if (editingId) {
    const member = teamMembers.find(m => m.id === editingId);
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Team Member</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-blue-50"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editForm.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-blue-50"
                  placeholder="Enter role"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-blue-50 h-20 resize-none"
                  placeholder="Enter description"
                />
              </div>

              <ImageUploadComponent 
                onImageUpload={handleImageUpload}
                currentImage={editForm.image}
                title="Team Member Image"
              />

              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600">
            Talented professionals making Greetins amazing
          </p>
        </div>

        {/* Slider Container */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrevSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all text-blue-600 hover:bg-blue-50 z-10"
          >
            ‹
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
            {getVisibleMembers().map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border-4 border-blue-100 hover:border-blue-300"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 relative">
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {member.role}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{member.description}</p>
                  
                  <button
                    onClick={() => handleEditClick(member)}
                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl text-lg"
                    title="Edit member"
                  >
                    ✎
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all text-blue-600 hover:bg-blue-50 z-10"
          >
            ›
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-blue-600 w-8'
                  : 'bg-blue-300 w-3 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
