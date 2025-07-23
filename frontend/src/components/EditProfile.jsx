import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || '',
        email: user.email || '',
        no_hp: user.no_hp || ''
      });
      setImagePreview(user.profile_image || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('File foto tidak valid. Hanya format JPG, JPEG, PNG, atau GIF yang diperbolehkan.');
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB!');
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.onerror = () => {
        setError('Gagal membaca file gambar');
        setSelectedFile(null);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('no_hp', formData.no_hp);
      
      if (selectedFile) {
        formDataToSend.append('foto', selectedFile);
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type, let browser set it with boundary for FormData
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengupdate profil');
      }

      setSuccess(data.message);
      
      // Update user data in context
      if (updateUser && data.user) {
        updateUser(data.user);
      }

      // Clear selected file after successful upload
      setSelectedFile(null);

    } catch (error) {
      console.error('Profile update error:', error);
      if (error.message.includes('Failed to fetch')) {
        setError('Tidak dapat terhubung ke server. Pastikan server berjalan.');
      } else if (error.message.includes('413')) {
        setError('Ukuran foto terlalu besar. Gunakan foto yang lebih kecil.');
      } else {
        // Jika pesan error terlalu generic, tampilkan pesan fallback
        if (
          error.message === 'Terjadi kesalahan server' ||
          error.message === 'Internal Server Error'
        ) {
          setError('Gagal mengunggah foto. Pastikan format file JPG/PNG dan ukuran maksimal 5MB.');
        } else {
          setError(error.message || 'Terjadi kesalahan saat mengupdate profil');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Edit Profil</h3>
        <p className="text-gray-600">Silakan login terlebih dahulu untuk mengedit profil.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-primary mb-6">Edit Profil</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2 text-lg md:text-xl font-bold">
          <span className="text-2xl">🚫</span>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Foto Profil
          </label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl font-bold text-white border-4 border-white shadow-lg overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.nama ? user.nama[0].toUpperCase() : 'U'
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image-input"
              />
              <label
                htmlFor="profile-image-input"
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors border border-blue-200"
              >
                {imagePreview ? 'Ganti Foto' : 'Pilih Foto'}
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-200"
                >
                  Hapus Foto
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 text-center">
              Format: JPG, PNG. Maksimal 5MB
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={user.username || ''}
            disabled
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Username tidak dapat diubah</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap *
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="contoh@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor HP
          </label>
          <input
            type="tel"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="081234567890"
          />
          <p className="text-xs text-gray-500 mt-1">Format: 081234567890</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-white py-3 px-6 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
} 