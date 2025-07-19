import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaHeading, FaMapMarkerAlt, FaClock, FaAlignLeft, FaImage, FaSave } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useAgenda } from '../contexts/AgendaContext';
import logokamera from '/logokamera.svg';

export default function AddAgendaPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const { addAgenda } = useAgenda();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    tanggal: '',
    waktu: '',
    lokasi: '',
    deskripsi: '',
    status: 'Akan Datang',
    img: null
  });

  // Redirect jika bukan admin
  React.useEffect(() => {
    if (!isAdmin && !loading) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        img: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validasi form
      if (!formData.title || !formData.tanggal || !formData.waktu || !formData.lokasi || !formData.deskripsi) {
        throw new Error('Semua field harus diisi');
      }

      // Buat FormData untuk upload file
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('tanggal', formData.tanggal);
      submitData.append('waktu', formData.waktu);
      submitData.append('lokasi', formData.lokasi);
      submitData.append('deskripsi', formData.deskripsi);
      submitData.append('status', formData.status);
      
      if (formData.img) {
        submitData.append('img', formData.img);
      }

      // Kirim data ke backend menggunakan context
      await addAgenda(submitData);

      setSuccess(true);
      setTimeout(() => {
        navigate('/publikasi/agenda');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan agenda');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const heroImg = '/surat.jpg';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Tambah Agenda</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow text-center max-w-2xl">Isi form berikut untuk menambah agenda kegiatan desa</p>
        </div>
      </div>
      
      {/* Form Card */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-2 md:px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 tracking-tight drop-shadow">Form Tambah Agenda</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">Silakan lengkapi data berikut untuk menambah agenda kegiatan desa. Pastikan semua data yang diinput sudah benar sebelum disimpan.</p>
        </div>
        <div className="max-w-2xl w-full bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-12 mx-auto mt-8 md:mt-12 animate-slide-up transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Judul Agenda */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Judul Agenda <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaHeading size={18} /></span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg"
                  placeholder="Masukkan judul agenda..."
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Tanggal dan Waktu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tanggal <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaCalendarAlt size={16} /></span>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Waktu <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaClock size={16} /></span>
                  <input
                    type="time"
                    name="waktu"
                    value={formData.waktu}
                    onChange={handleChange}
                    className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Lokasi <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaMapMarkerAlt size={16} /></span>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg"
                  placeholder="Masukkan lokasi kegiatan..."
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border-2 border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg"
                disabled={loading}
              >
                <option value="Akan Datang">Akan Datang</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Deskripsi <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-primary/70"><FaAlignLeft size={16} /></span>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg resize-none"
                  placeholder="Masukkan deskripsi detail tentang agenda ini..."
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gambar Agenda (Opsional)</label>
              <div className="flex flex-col items-center gap-3">
                <label htmlFor="img-upload" className="w-full max-w-md h-48 flex items-center justify-center bg-gray-100 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-blue-50 transition group relative overflow-hidden">
                  {!formData.img && (
                    <img src={logokamera} alt="Upload" className="w-16 h-16 opacity-70 group-hover:opacity-100" />
                  )}
                  {formData.img && (
                    <img src={URL.createObjectURL(formData.img)} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  )}
                  <input 
                    id="img-upload" 
                    name="img"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange} 
                    disabled={loading}
                  />
                </label>
                {!formData.img && <span className="text-gray-400 text-sm">Pilih gambar agenda (jpg/png)</span>}
              </div>
              {formData.img && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">File dipilih: {formData.img.name}</p>
                  <div className="mt-2 relative inline-block">
                    <img
                      src={URL.createObjectURL(formData.img)}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, img: null })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Agenda berhasil ditambahkan! Mengalihkan ke halaman agenda...
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-primary text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:scale-[1.02] transition text-lg tracking-wide mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <FaSave size={20} /> {loading ? 'Menyimpan...' : 'Simpan Agenda'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 