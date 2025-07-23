import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaHeading, FaNewspaper } from 'react-icons/fa';
import { useBerita } from '../contexts/BeritaContext';
import { useAuth } from '../contexts/AuthContext';
import logokamera from '/logokamera.svg';

const kategoriList = [
  'Pembangunan', 'Sosial', 'Agenda', 'Pendidikan', 'Lingkungan', 'Kesehatan',
];

export default function AddBeritaPage() {
  const navigate = useNavigate();
  const { addBerita } = useBerita();
  const { isAdmin, isLoggedIn, loading: authLoading } = useAuth();
  const [addData, setAddData] = useState({
    title: '',
    kategori: kategoriList[0],
    tanggal: '',
    img: null,
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const heroImg = '/surat.jpg';

  // Redirect jika bukan admin
  useEffect(() => {
    if (!authLoading && (!isLoggedIn || !isAdmin)) {
      console.log('User is not admin, redirecting...');
      navigate('/publikasi/berita');
    }
  }, [isLoggedIn, isAdmin, authLoading, navigate]);

  // Debug: Log authentication status
  useEffect(() => {
    console.log('Auth status:', { isAdmin, isLoggedIn, authLoading });
    const token = localStorage.getItem('token');
    console.log('Token in localStorage:', !!token);
  }, [isAdmin, isLoggedIn, authLoading]);

  // Tampilkan loading jika masih mengecek autentikasi
  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-gray-400 text-lg">Memverifikasi akses...</div>
    </div>;
  }

  // Redirect jika bukan admin
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
          
          {/* Informasi kredensial default */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">Kredensial Default Admin:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> password</p>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              *Gunakan kredensial ini untuk login pertama kali
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/publikasi/berita')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mr-3"
            >
              Kembali ke Berita
            </button>
            <button
              onClick={() => {
                // Trigger login modal by dispatching custom event
                window.dispatchEvent(new CustomEvent('openLoginModal'));
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Login Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Cegah submit ganda
    setLoading(true);
    setError('');

    try {
      // Validasi autentikasi
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Anda harus login terlebih dahulu');
      }

      if (!isAdmin) {
        throw new Error('Anda tidak memiliki akses admin');
      }

      console.log('Submitting berita with token:', !!token);

      const result = await addBerita(addData);
      
      if (result.success) {
        // Redirect ke halaman berita setelah berhasil
        setTimeout(() => navigate('/publikasi/berita'), 1200);
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error submitting berita:', error);
      setError(error.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddData({ ...addData, img: file });
      setImgPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Tambah Berita</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow text-center max-w-2xl">Isi form berikut untuk menambah berita desa</p>
        </div>
      </div>
      {/* Form Card */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-2 md:px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 tracking-tight drop-shadow">Form Tambah Berita</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">Silakan lengkapi data berikut untuk menambah berita desa. Pastikan semua data yang diinput sudah benar sebelum disimpan.</p>
        </div>
        <div className="max-w-2xl w-full bg-white/95 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-12 mx-auto mt-8 md:mt-12 animate-slide-up transition-all duration-500">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Judul Berita <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaHeading size={18} /></span>
                <input 
                  type="text" 
                  className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg" 
                  placeholder="Masukkan judul berita..." 
                  value={addData.title} 
                  onChange={e => setAddData({ ...addData, title: e.target.value })} 
                  required 
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Kategori <span className="text-red-500">*</span></label>
                <select 
                  className="w-full border-2 border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg" 
                  value={addData.kategori} 
                  onChange={e => setAddData({ ...addData, kategori: e.target.value })}
                  disabled={loading}
                >
                  {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tanggal <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaCalendarAlt size={16} /></span>
                  <input 
                    type="date" 
                    className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg" 
                    placeholder="dd/mm/yyyy" 
                    value={addData.tanggal} 
                    onChange={e => setAddData({ ...addData, tanggal: e.target.value })} 
                    required 
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gambar Berita</label>
              <div className="flex flex-col items-center gap-3">
                <label htmlFor="img-upload" className="w-full max-w-md h-48 flex items-center justify-center bg-gray-100 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-blue-50 transition group relative overflow-hidden">
                  {!imgPreview && (
                    <img src={logokamera} alt="Upload" className="w-16 h-16 opacity-70 group-hover:opacity-100" />
                  )}
                  {imgPreview && (
                    <img src={imgPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  )}
                  <input 
                    id="img-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange} 
                    disabled={loading}
                  />
                </label>
                {!imgPreview && <span className="text-gray-400 text-sm">Pilih gambar berita (jpg/png)</span>}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Isi Berita <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-primary/70"><FaNewspaper size={16} /></span>
                <textarea 
                  className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg" 
                  rows={5} 
                  placeholder="Tulis isi lengkap berita di sini..." 
                  value={addData.content || ''} 
                  onChange={e => setAddData({ ...addData, content: e.target.value })} 
                  required 
                  disabled={loading}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-primary text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:scale-[1.02] transition text-lg tracking-wide mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <FaNewspaper size={20} /> {loading ? 'Menyimpan...' : 'Simpan Berita'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
