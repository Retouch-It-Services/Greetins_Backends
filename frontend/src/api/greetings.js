import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const sendGreeting = async (greetingData) => {
  try {
    console.log('[API] Sending greeting to:', `${API_BASE_URL}/greetings/send`);
    console.log('[API] Payload:', greetingData);
    
    const response = await axios.post(`${API_BASE_URL}/greetings/send`, greetingData);
    
    console.log('[API] Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error sending greeting:');
    console.error('[API] Status:', error.response?.status);
    console.error('[API] Data:', error.response?.data);
    console.error('[API] Message:', error.message);
    console.error('[API] Full error:', error);
    throw error;
  }
};