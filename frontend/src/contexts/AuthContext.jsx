import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek localStorage saat mount
  useEffect(() => {
    const verifyToken = async (retryCount = 0) => {
      const token = localStorage.getItem('token');
      console.log('AuthContext: Checking token on mount:', !!token, 'retry:', retryCount);
      
      if (token) {
        try {
          console.log('AuthContext: Verifying token with backend...');
          // Verify token dengan backend
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('AuthContext: Token verification response status:', response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('AuthContext: Token valid, setting user data:', data.user);
            setUser(data.user);
            setIsLoggedIn(true);
            setIsAdmin(data.user.role === 'admin');
          } else {
            console.log('AuthContext: Token invalid, clearing localStorage');
            throw new Error('Token invalid');
          }
        } catch (error) {
          console.error('AuthContext: Token verification failed:', error);
          
          // Retry up to 3 times for network errors
          if (retryCount < 3 && (error.name === 'TypeError' || error.message.includes('fetch'))) {
            console.log(`AuthContext: Retrying token verification (${retryCount + 1}/3)...`);
            setTimeout(() => verifyToken(retryCount + 1), 1000 * (retryCount + 1));
            return;
          }
          
          // Token invalid or max retries reached, hapus dari localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } else {
        console.log('AuthContext: No token found in localStorage');
      }
      
      setLoading(false);
    };

    verifyToken();

    // Listen for storage changes (when localStorage is modified from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        console.log('AuthContext: Storage changed, re-verifying token...');
        verifyToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for custom event when localStorage is modified programmatically
    const handleCustomStorageChange = () => {
      console.log('AuthContext: Custom storage event, re-verifying token...');
      verifyToken();
    };

    window.addEventListener('localStorageChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChanged', handleCustomStorageChange);
    };
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login to:', `${API_BASE_URL}/auth/login`);
      console.log('AuthContext: Login credentials:', { username, password: '***' });
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      console.log('AuthContext: Login response status:', response.status);
      console.log('AuthContext: Login response headers:', response.headers);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = 'Login gagal';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If we can't parse JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        console.log('AuthContext: Login failed with error:', errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('AuthContext: Login successful, received data:', { 
        token: data.token ? '***' : 'missing',
        user: data.user 
      });

      // Simpan token dan user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('AuthContext: Token and user data saved to localStorage');

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('localStorageChanged'));

      setUser(data.user);
      setIsLoggedIn(true);
      setIsAdmin(data.user.role === 'admin');
      console.log('AuthContext: State updated - isLoggedIn:', true, 'isAdmin:', data.user.role === 'admin');

      return { success: true, user: data.user };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: 'Tidak dapat terhubung ke server. Pastikan backend berjalan.' 
        };
      }
      
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration to:', `${API_BASE_URL}/auth/register`);
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log('Registration response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Registrasi gagal';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // Simpan token dan user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('localStorageChanged'));

      setUser(data.user);
      setIsLoggedIn(true);
      setIsAdmin(data.user.role === 'admin');

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return { 
          success: false, 
          error: 'Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:5000' 
        };
      }
      
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out user');
    setIsAdmin(false);
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('localStorageChanged'));
    
    console.log('AuthContext: User logged out, state reset');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  // Helper function untuk API calls dengan auth
  const apiCall = async (endpoint, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers
        },
        ...options
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request gagal');
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAdmin, 
      isLoggedIn, 
      user, 
      loading,
      login, 
      logout, 
      register,
      updateUser,
      apiCall
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 