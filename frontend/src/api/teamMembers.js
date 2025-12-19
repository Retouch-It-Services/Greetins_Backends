import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://greetins-backend.onrender.com/api/v1';

// Get all team members
export const getAllTeamMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team-members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Get single team member
export const getTeamMember = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team-members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team member:', error);
    throw error;
  }
};

// Get team member image
export const getTeamMemberImage = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team-members/${memberId}/image`);
    return response.data.image;
  } catch (error) {
    console.error('Error fetching team member image:', error);
    return null;
  }
};

// Create new team member
export const createTeamMember = async (memberData) => {
  try {
    console.log('Creating team member with data:', memberData);
    const response = await axios.post(`${API_BASE_URL}/team-members/`, memberData);
    console.log('Team member created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating team member:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    
    // Provide more helpful error messages
    if (error.response?.status === 400) {
      const detail = error.response?.data?.detail;
      throw new Error(`Bad request: ${detail || 'Invalid data'}`);
    } else if (error.response?.status === 500) {
      throw new Error('Server error: Database connection failed. Check backend logs.');
    } else if (!error.response) {
      throw new Error('Cannot connect to backend. Is it running on port 8000?');
    }
    throw error;
  }
};

// Upload team member image
export const uploadTeamMemberImage = async (memberId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${API_BASE_URL}/team-members/${memberId}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Upload team member image as base64
export const uploadTeamMemberImageBase64 = async (memberId, imageData, filename) => {
  try {
    console.log('Uploading image for member:', memberId);
    console.log('Image data length:', imageData.length);
    
    // Check image size before sending
    const imageSizeInMB = new Blob([imageData]).size / (1024 * 1024);
    console.log('Image size:', imageSizeInMB.toFixed(2), 'MB');
    
    if (imageSizeInMB > 5) {
      throw new Error(`Image too large: ${imageSizeInMB.toFixed(2)} MB (max 5 MB). Please crop it smaller.`);
    }
    
    const formData = new FormData();
    formData.append('image_data', imageData);
    formData.append('filename', filename);

    console.log('Sending upload request...');
    
    const response = await axios.post(
      `${API_BASE_URL}/team-members/${memberId}/upload-image-base64/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      }
    );
    
    console.log('Image uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading base64 image:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Provide helpful error message
    if (error.response?.status === 400) {
      const detail = error.response?.data?.detail;
      throw new Error(`Upload failed: ${detail}`);
    } else if (error.response?.status === 404) {
      throw new Error('Team member not found');
    } else if (error.response?.status === 413) {
      throw new Error('Image too large. Please crop it smaller.');
    } else if (!error.response) {
      throw new Error('Cannot reach backend. Is it running on port 8000?');
    }
    throw error;
  }
};

// Update team member
export const updateTeamMember = async (memberId, memberData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/team-members/${memberId}`,
      memberData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

// Delete team member
export const deleteTeamMember = async (memberId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/team-members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};
