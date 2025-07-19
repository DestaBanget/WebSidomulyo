import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, uploadFile } from '../config/api';

const BeritaContext = createContext();

export function useBerita() {
  return useContext(BeritaContext);
}

export function BeritaProvider({ children }) {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching berita from:', `${API_BASE_URL}/berita`);
      const response = await fetch(`${API_BASE_URL}/berita`);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Gagal mengambil data berita' }));
        throw new Error(errorData.error || 'Gagal mengambil data berita');
      }
      
      const data = await response.json();
      console.log('Berita data received:', data);
      
      setBerita(data.berita || []);
    } catch (error) {
      console.error('Error fetching berita:', error);
      setError(error.message);
      setBerita([]); // Set empty array instead of fallback to dummy data
    } finally {
      setLoading(false);
    }
  };

  const addBerita = async (beritaData) => {
    try {
      console.log('=== Starting addBerita ===');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append('title', beritaData.title);
      formData.append('content', beritaData.content);
      formData.append('kategori', beritaData.kategori);
      formData.append('tanggal', beritaData.tanggal);
      
      if (beritaData.img) {
        formData.append('img', beritaData.img);
      }

      console.log('Making API call to /berita with token');
      
      const response = await fetch(`${API_BASE_URL}/berita`, {
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
        throw new Error(errorData.error || 'Gagal menambahkan berita');
      }

      const data = await response.json();
      console.log('Berita added successfully:', data);
      
      // Refresh berita list
      await fetchBerita();
      
      return { success: true, berita: data.berita };
    } catch (err) {
      console.error('Error in addBerita:', err);
      return { success: false, error: err.message };
    }
  };

  const updateBerita = async (id, beritaData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const formData = new FormData();
      formData.append('title', beritaData.title);
      formData.append('content', beritaData.content);
      formData.append('kategori', beritaData.kategori);
      formData.append('tanggal', beritaData.tanggal);
      
      if (beritaData.img) {
        formData.append('img', beritaData.img);
      }

      const response = await fetch(`${API_BASE_URL}/berita/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengupdate berita');
      }

      const data = await response.json();
      
      // Refresh berita list
      await fetchBerita();
      
      return { success: true, berita: data.berita };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteBerita = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/berita/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menghapus berita');
      }

      // Refresh berita list
      await fetchBerita();
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <BeritaContext.Provider value={{ 
      berita, 
      loading, 
      error,
      fetchBerita,
      addBerita,
      updateBerita,
      deleteBerita
    }}>
      {children}
    </BeritaContext.Provider>
  );
} 