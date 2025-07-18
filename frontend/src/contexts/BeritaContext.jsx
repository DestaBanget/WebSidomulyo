import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultBerita } from '../components/BeritaDesa';
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
      
      const response = await fetch(`${API_BASE_URL}/berita`);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data berita');
      }
      
      const data = await response.json();
      setBerita(data.berita || []);
    } catch (error) {
      console.error('Error fetching berita:', error);
      setError(error.message);
      // Fallback ke data dummy jika API gagal
      setBerita(defaultBerita);
    } finally {
      setLoading(false);
    }
  };

  const addBerita = async (beritaData) => {
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

      const data = await uploadFile('/berita', formData);
      
      // Refresh berita list
      await fetchBerita();
      
      return { success: true, berita: data.berita };
    } catch (error) {
      return { success: false, error: error.message };
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