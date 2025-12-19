import React, { useState } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

  const addResult = (name, status, message) => {
    setTestResults((prev) => [...prev, { name, status, message, timestamp: new Date() }]);
  };

  const runTests = async () => {
    setTestResults([]);
    setLoading(true);

    try {
      // Test 1: Backend Connection
      addResult('Backend Connection', 'running', 'Testing...');
      try {
        const response = await axios.get('http://localhost:8000/', { timeout: 5000 });
        addResult('Backend Connection', 'success', 'Backend is running on port 8000');
      } catch (error) {
        addResult('Backend Connection', 'error', `Cannot reach backend: ${error.message}`);
        setLoading(false);
        return;
      }

      // Test 2: Database Connection
      addResult('Database Connection', 'running', 'Testing...');
      try {
        const response = await axios.get(`${API_BASE_URL}/team-members/test`, { timeout: 5000 });
        if (response.data.status === 'OK') {
          addResult('Database Connection', 'success', response.data.message);
        } else {
          addResult('Database Connection', 'error', response.data.message);
        }
      } catch (error) {
        addResult('Database Connection', 'error', `Database test failed: ${error.message}`);
      }

      // Test 3: Create Team Member
      addResult('Create Team Member', 'running', 'Testing...');
      try {
        const response = await axios.post(`${API_BASE_URL}/team-members`, {
          name: 'Test User',
          role: 'Tester',
          description: 'This is a test member',
          color_theme: 'from-pink-300 to-red-300',
        });
        addResult('Create Team Member', 'success', `Created member with ID: ${response.data.id}`);
      } catch (error) {
        addResult('Create Team Member', 'error', `${error.response?.status} - ${error.response?.data?.detail || error.message}`);
      }

      // Test 4: Get All Team Members
      addResult('Get All Members', 'running', 'Testing...');
      try {
        const response = await axios.get(`${API_BASE_URL}/team-members`);
        addResult('Get All Members', 'success', `Found ${response.data.length} members`);
      } catch (error) {
        addResult('Get All Members', 'error', error.message);
      }

      // Test 5: CORS
      addResult('CORS Configuration', 'success', 'Frontend can reach backend');

    } catch (error) {
      addResult('General Error', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🔧 Connection Test</h1>
          <p className="text-gray-600 mb-6">
            Check if frontend and backend are properly connected and configured.
          </p>

          <button
            onClick={runTests}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? '⏳ Running Tests...' : '▶️ Run Connection Tests'}
          </button>

          <div className="mt-8 space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  result.status === 'success'
                    ? 'bg-green-50 border-green-500'
                    : result.status === 'error'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xl ${
                      result.status === 'success'
                        ? 'text-green-600'
                        : result.status === 'error'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {result.status === 'success'
                      ? '✅'
                      : result.status === 'error'
                      ? '❌'
                      : '⏳'}
                  </span>
                  <h3 className="font-bold text-gray-800">{result.name}</h3>
                </div>
                <p
                  className={`text-sm ${
                    result.status === 'success'
                      ? 'text-green-700'
                      : result.status === 'error'
                      ? 'text-red-700'
                      : 'text-yellow-700'
                  }`}
                >
                  {result.message}
                </p>
              </div>
            ))}
          </div>

          {testResults.length > 0 && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">📋 Tips:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure backend is running: `cd fastapi_app && python -m uvicorn app.main:app --reload`</li>
                <li>• Check .env file has DATABASE_URL set</li>
                <li>• Ensure database server is running (PostgreSQL/MySQL)</li>
                <li>• Check backend logs for detailed error messages</li>
                <li>• Open browser DevTools (F12) → Network tab to see requests</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestConnection;
