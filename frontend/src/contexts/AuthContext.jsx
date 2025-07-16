import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const dummySuratHistory = [
    {
      id: 1,
      jenisSurat: "Surat Keterangan Domisili",
      tanggal: "2024-06-10",
      status: "Menunggu",
      nama: "Budi Santoso",
      nik: "3501010101010001"
    },
    {
      id: 2,
      jenisSurat: "Surat Keterangan Usaha",
      tanggal: "2024-06-09",
      status: "Diproses",
      nama: "Siti Aminah",
      nik: "3501010101010002"
    },
    {
      id: 3,
      jenisSurat: "Surat Keterangan Tidak Mampu",
      tanggal: "2024-06-08",
      status: "Selesai",
      nama: "Joko Widodo",
      nik: "3501010101010003"
    }
  ];

  // Cek localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Cek apakah suratHistory sudah sesuai id/struktur baru
      const needsUpdate = !Array.isArray(parsedUser.suratHistory) ||
        parsedUser.suratHistory.length !== dummySuratHistory.length ||
        parsedUser.suratHistory.some((s, i) => s.id !== dummySuratHistory[i].id);
      if (needsUpdate) {
        parsedUser.suratHistory = dummySuratHistory;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.type === 'admin');
    }
  }, []);

  const login = (userType, userData = null) => {
    let userObj;
    if (userType === 'admin') {
      userObj = { type: 'admin', suratHistory: [], ...userData };
      setIsAdmin(true);
      setIsLoggedIn(true);
      setUser(userObj);
    } else {
      userObj = { type: 'user', suratHistory: [], ...userData };
      setIsLoggedIn(true);
      setUser(userObj);
    }
    // Jika userData sudah punya suratHistory, jangan timpa
    if (userData && userData.suratHistory) {
      userObj.suratHistory = userData.suratHistory;
    } else if (!userObj.suratHistory || userObj.suratHistory.length === 0) {
      userObj.suratHistory = dummySuratHistory;
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
    const userObj = { type: 'user', suratHistory: [], ...userData };
    // Jika userData sudah punya suratHistory, jangan timpa
    if (userData && userData.suratHistory) {
      userObj.suratHistory = userData.suratHistory;
    } else if (!userObj.suratHistory || userObj.suratHistory.length === 0) {
      userObj.suratHistory = dummySuratHistory;
    }
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