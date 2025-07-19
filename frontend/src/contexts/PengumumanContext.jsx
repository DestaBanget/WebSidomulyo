import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, uploadFile } from '../config/api';

const PengumumanContext = createContext();

export function usePengumuman() {
  return useContext(PengumumanContext);
}

export function PengumumanProvider({ children }) {
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/pengumuman`);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengumuman');
      }
      
      const data = await response.json();
      setPengumuman(data.pengumuman || []);
    } catch (error) {
      console.error('Error fetching pengumuman:', error);
      setError(error.message);
      // Fallback ke data dummy jika API gagal
      setPengumuman([]);
    } finally {
      setLoading(false);
    }
  };

  const addPengumuman = async (pengumumanData) => {
    try {
      console.log('=== Starting addPengumuman ===');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append('title', pengumumanData.title);
      formData.append('content', pengumumanData.content);
      formData.append('kategori', pengumumanData.kategori);
      formData.append('tanggal', pengumumanData.tanggal);
      
      if (pengumumanData.desc) {
        formData.append('desc', pengumumanData.desc);
      }
      
      if (pengumumanData.img) {
        formData.append('img', pengumumanData.img);
      }

      console.log('Making API call to /pengumuman with token');
      
      const response = await fetch(`${API_BASE_URL}/pengumuman`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Gagal menambahkan pengumuman');
      }

      const data = await response.json();
      console.log('Pengumuman added successfully:', data);
      
      // Refresh pengumuman list
      await fetchPengumuman();
      
      return { success: true, pengumuman: data.pengumuman };
    } catch (err) {
      console.error('Error in addPengumuman:', err);
      return { success: false, error: err.message };
    }
  };

  const updatePengumuman = async (id, pengumumanData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const formData = new FormData();
      formData.append('title', pengumumanData.title);
      formData.append('content', pengumumanData.content);
      formData.append('kategori', pengumumanData.kategori);
      formData.append('tanggal', pengumumanData.tanggal);
      
      if (pengumumanData.desc) {
        formData.append('desc', pengumumanData.desc);
      }
      
      if (pengumumanData.img) {
        formData.append('img', pengumumanData.img);
      }

      const response = await fetch(`${API_BASE_URL}/pengumuman/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengupdate pengumuman');
      }

      const data = await response.json();
      
      // Refresh pengumuman list
      await fetchPengumuman();
      
      return { success: true, pengumuman: data.pengumuman };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deletePengumuman = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/pengumuman/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menghapus pengumuman');
      }

      // Refresh pengumuman list
      await fetchPengumuman();
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <PengumumanContext.Provider value={{ 
      pengumuman, 
      loading, 
      error,
      fetchPengumuman,
      addPengumuman,
      updatePengumuman,
      deletePengumuman
    }}>
      {children}
    </PengumumanContext.Provider>
  );
} 