import React, { useState } from 'react';
import { API_BASE_URL, uploadFile } from '../config/api';

export default function PengaduanMasyarakat() {
  const [data, setData] = useState({
    nama: '',
    email: '',
    noHp: '',
    alamat: '',
    nik: '', // tambah NIK
    tanggal_pengaduan: '', // ubah dari tanggal ke tanggal_pengaduan
    judul: '',
    uraian: '',
    lampiran: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleUpload = (e) => {
    setData({ ...data, lampiran: e.target.files[0] });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('nama', data.nama);
      formData.append('email', data.email);
      formData.append('no_hp', data.noHp);
      formData.append('alamat', data.alamat);
      formData.append('judul', data.judul);
      formData.append('uraian', data.uraian);
      formData.append('nik', data.nik); // kirim NIK
      formData.append('tanggal_pengaduan', data.tanggal_pengaduan); // kirim tanggal_pengaduan
      
      if (data.lampiran) {
        formData.append('lampiran', data.lampiran);
      }

      await uploadFile('/pengaduan', formData);

      setSuccess(true);
      setData({
        nama: '',
        email: '',
        noHp: '',
        alamat: '',
        nik: '', // reset NIK
        tanggal_pengaduan: '', // reset tanggal_pengaduan
        judul: '',
        uraian: '',
        lampiran: null,
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[500px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Pengaduan Masyarakat</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-2">Sistem terbuka untuk menyalurkan permasalahan dan memperbaiki pelayanan. Kami mendengar, bertindak, dan membangun solusi bersama untuk meningkatkan kualitas hidup.</p>
        </div>
      </div>

      {/* Alur Pelayanan */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-center text-primary font-bold text-base mb-10 tracking-widest">ALUR PELAYANAN PENGADUAN</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-4"><span className="inline-block bg-blue-100 p-4 rounded-full"><svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M5 4v16h14V4H5zm2 2h10v12H7V6zm2 2v2h2V8h-2zm0 4v2h2v-2h-2z" fill="#1e40af"/></svg></span></div>
            <div className="font-bold mb-1">Isi Formulir</div>
            <div className="text-gray-600 text-sm">Masukkan data diri pelapor serta uraikan pengaduan dengan jelas</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4"><span className="inline-block bg-blue-100 p-4 rounded-full"><svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17h-2v-.07A8.001 8.001 0 014.07 13H7v-2H4.07A8.001 8.001 0 0111 4.07V7h2V4.07A8.001 8.001 0 0119.93 11H17v2h2.93A8.001 8.001 0 0113 19.93z" fill="#1e40af"/></svg></span></div>
            <div className="font-bold mb-1">Unduh Bukti Pelaporan</div>
            <div className="text-gray-600 text-sm">Scan qrcode pada bukti pelaporan untuk memonitoring pengaduan yang telah dibuat</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4"><span className="inline-block bg-blue-100 p-4 rounded-full"><svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M9 17v-2h6v2H9zm-4-4v-2h14v2H5zm2-4V7h10v2H7z" fill="#1e40af"/></svg></span></div>
            <div className="font-bold mb-1">Lakukan Monitoring</div>
            <div className="text-gray-600 text-sm">Pantau aktifitas proses pengaduan secara real time</div>
          </div>
        </div>
      </section>

      {/* Formulir Pengaduan */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-center text-primary font-bold text-base mb-8 tracking-widest">FORMULIR PENGADUAN</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Pengaduan berhasil dikirim! Tim kami akan segera memproses pengaduan Anda.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Data Diri */}
          <div>
            <div className="font-bold text-primary mb-4">A. DATA DIRI</div>
            <label className="block mb-1 text-sm font-semibold">Nama lengkap <span className="text-red-500">*</span></label>
            <input 
              name="nama" 
              value={data.nama} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">Email <span className="text-red-500">*</span></label>
            <input 
              name="email" 
              type="email"
              value={data.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">Nomor ponsel <span className="text-red-500">*</span></label>
            <input 
              name="noHp" 
              value={data.noHp} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">Alamat</label>
            <textarea 
              name="alamat" 
              value={data.alamat} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">NIK <span className="text-red-500">*</span></label>
            <input 
              name="nik" 
              value={data.nik} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
              maxLength={20}
            />
            <label className="block mb-1 text-sm font-semibold">Tanggal Pengaduan <span className="text-red-500">*</span></label>
            <input 
              name="tanggal_pengaduan" 
              type="date"
              value={data.tanggal_pengaduan} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <div className="text-xs text-gray-500 mt-2">Data diri pelapor dijamin kerahasiaannya oleh pemerintah desa.</div>
          </div>
          {/* Uraian Pengaduan */}
          <div>
            <div className="font-bold text-primary mb-4">B. URAIAN PENGADUAN</div>
            <label className="block mb-1 text-sm font-semibold">Judul <span className="text-red-500">*</span></label>
            <input 
              name="judul" 
              value={data.judul} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">Uraian <span className="text-red-500">*</span></label>
            <textarea 
              name="uraian" 
              value={data.uraian} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" 
              required 
              disabled={loading}
            />
            <label className="block mb-1 text-sm font-semibold">Lampiran (jika ada)</label>
            <div
              className="w-full border-2 border-primary rounded-lg px-4 py-10 text-center bg-white cursor-pointer flex flex-col items-center justify-center mb-3 transition hover:bg-blue-50"
              onClick={() => !loading && document.getElementById('lampiran-input').click()}
            >
              <img src="/logokamera.svg" alt="Tambah Gambar" className="mx-auto mb-2 w-12 h-12 object-contain" />
              <span className="text-gray-500 text-sm">{data.lampiran ? data.lampiran.name : 'Tambah Gambar'}</span>
              <input 
                id="lampiran-input" 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                onChange={handleUpload} 
                className="hidden" 
                disabled={loading}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <button 
              type="submit" 
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
} 