import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall, publicApiCall, API_BASE_URL } from '../config/api';

const AgendaContext = createContext();

export const useAgenda = () => {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error('useAgenda must be used within an AgendaProvider');
  }
  return context;
};

export const AgendaProvider = ({ children }) => {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgenda = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== Starting fetchAgenda ===');
      
      // Clear any invalid tokens that might cause issues
      const token = localStorage.getItem('token');
      console.log('Token in localStorage:', !!token);
      
      if (token) {
        try {
          console.log('Testing token validity...');
          // Test if token is valid by calling a protected endpoint
          const tokenTest = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!tokenTest.ok) {
            console.log('Token invalid, clearing from localStorage');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          } else {
            console.log('Token is valid');
          }
        } catch (err) {
          console.log('Token test failed, clearing from localStorage:', err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      console.log('Calling publicApiCall for /agenda...');
      
      // Use publicApiCall for agenda (never sends token)
      const response = await publicApiCall('/agenda');
      console.log('Response received:', response);
      
      // Mengambil semua agenda tanpa pagination
      setAgenda(response.agenda || []);
      console.log('Agenda set successfully:', response.agenda?.length || 0, 'items');
      
    } catch (err) {
      console.error('Error fetching agenda:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      // Fallback to empty array if API fails
      setAgenda([]);
    } finally {
      setLoading(false);
      console.log('=== fetchAgenda completed ===');
    }
  };

  const addAgenda = async (agendaData) => {
    try {
      console.log('=== Starting addAgenda ===');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      // Prepare headers
      const headers = {};
      if (agendaData instanceof FormData) {
        // For FormData, don't set Content-Type (browser will set it with boundary)
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Making API call to /agenda with token');
      
      const response = await fetch(`${API_BASE_URL}/agenda`, {
        method: 'POST',
        headers,
        body: agendaData instanceof FormData ? agendaData : JSON.stringify(agendaData)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Gagal menambahkan agenda');
      }

      const data = await response.json();
      console.log('Agenda added successfully:', data);
      
      // Refresh agenda list
      await fetchAgenda();
      
      return data;
    } catch (err) {
      console.error('Error in addAgenda:', err);
      throw err;
    }
  };

  const updateAgenda = async (id, agendaData) => {
    try {
      const response = await apiCall(`/agenda/${id}`, {
        method: 'PUT',
        body: JSON.stringify(agendaData)
      });
      
      // Refresh agenda list
      await fetchAgenda();
      
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteAgenda = async (id) => {
    try {
      const response = await apiCall(`/agenda/${id}`, {
        method: 'DELETE'
      });
      
      // Refresh agenda list
      await fetchAgenda();
      
      return response;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    console.log('AgendaProvider mounted, calling fetchAgenda...');
    fetchAgenda();
  }, []);

  const value = {
    agenda,
    loading,
    error,
    fetchAgenda,
    addAgenda,
    updateAgenda,
    deleteAgenda
  };

  return (
    <AgendaContext.Provider value={value}>
      {children}
    </AgendaContext.Provider>
  );
}; 