import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Cek localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.type === 'admin');
    }
  }, []);

  const login = (userType, userData = null) => {
    let userObj;
    if (userType === 'admin') {
      userObj = { type: 'admin', ...userData };
      setIsAdmin(true);
      setIsLoggedIn(true);
      setUser(userObj);
    } else {
      userObj = { type: 'user', ...userData };
      setIsLoggedIn(true);
      setUser(userObj);
    }
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const userObj = { type: 'user', ...userData };
    setIsLoggedIn(true);
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider value={{ 
      isAdmin, 
      isLoggedIn, 
      user, 
      login, 
      logout, 
      register,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 