import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, uploadFile } from '../config/api';

const initialData = {
  nama: '',
  nik: '',
  jenisKelamin: '',
  tempatLahir: '',
  tanggalLahir: '',
  pekerjaan: '',
  kewarganegaraan: '',
  agama: '',
  noHp: '',
  alamatKtp: '',
  alamatSekarang: '',
};

export default function FormSurat({ jenisSurat, persyaratan }) {
  const [data, setData] = useState(initialData);
  const [uploads, setUploads] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileRefs = useRef({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (e, key) => {
    setUploads({ ...uploads, [key]: e.target.files[0] });
  };

  const handleAreaClick = (key) => {
    if (fileRefs.current[key]) fileRefs.current[key].click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Anda harus login terlebih dahulu');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      
      // Data surat
      formData.append('nama', data.nama);
      formData.append('nik', data.nik);
      formData.append('jenis_kelamin', data.jenisKelamin);
      formData.append('tempat_lahir', data.tempatLahir);
      formData.append('tanggal_lahir', data.tanggalLahir);
      formData.append('pekerjaan', data.pekerjaan);
      formData.append('kewarganegaraan', data.kewarganegaraan);
      formData.append('agama', data.agama);
      formData.append('no_hp', data.noHp);
      formData.append('alamat_ktp', data.alamatKtp);
      formData.append('alamat_sekarang', data.alamatSekarang);
      formData.append('jenis_surat', jenisSurat);

      // Upload files
      Object.keys(uploads).forEach((key, index) => {
        if (uploads[key]) {
          formData.append('files', uploads[key]);
          formData.append(`jenis_persyaratan_${index}`, key);
        }
      });

      const result = await uploadFile('/surat', formData);

      setSuccess(true);
      setData(initialData);
      setUploads({});
      
      // Redirect ke halaman surat saya setelah 2 detik
      setTimeout(() => {
        navigate('/profil');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 mx-auto w-full text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">Login Diperlukan</h2>
        <p className="text-gray-600 mb-6">Anda harus login terlebih dahulu untuk mengajukan surat.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 text-center tracking-tight uppercase drop-shadow">Formulir {jenisSurat}</h2>
      <p className="text-gray-600 text-center mb-8 text-base md:text-lg">Lengkapi form di bawah ini untuk mengajukan permohonan surat. Pastikan data benar dan lengkap.</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Surat berhasil diajukan! Anda akan dialihkan ke halaman profil dalam beberapa detik.
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        {/* Section Data Diri */}
        <div className="mb-10">
          <div className="font-bold mb-4 text-primary text-lg border-l-4 border-primary pl-3">A. DATA DIRI</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Nama lengkap <span className="text-red-500">*</span></label>
              <span className="block text-xs text-red-500 mb-1">(gunakan huruf besar)</span>
              <input 
                name="nama" 
                value={data.nama} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:uppercase placeholder:text-gray-400 mb-4" 
                placeholder="MASUKKAN NAMA LENGKAP" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">NIK <span className="text-red-500">*</span></label>
              <input 
                name="nik" 
                value={data.nik} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan NIK" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Jenis kelamin <span className="text-red-500">*</span></label>
              <select 
                name="jenisKelamin" 
                value={data.jenisKelamin} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" 
                required
                disabled={loading}
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Tempat lahir <span className="text-red-500">*</span></label>
              <input 
                name="tempatLahir" 
                value={data.tempatLahir} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan tempat lahir" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Tanggal lahir <span className="text-red-500">*</span></label>
              <input 
                name="tanggalLahir" 
                type="date" 
                value={data.tanggalLahir} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Pekerjaan</label>
              <input 
                name="pekerjaan" 
                value={data.pekerjaan} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan pekerjaan" 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Kewarganegaraan</label>
              <input 
                name="kewarganegaraan" 
                value={data.kewarganegaraan} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan kewarganegaraan" 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Agama <span className="text-red-500">*</span></label>
              <select 
                name="agama" 
                value={data.agama} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" 
                required
                disabled={loading}
              >
                <option value="">Pilih agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor ponsel <span className="text-red-500">*</span></label>
              <input 
                name="noHp" 
                value={data.noHp} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="62 Masukkan nomor ponsel" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat KTP <span className="text-red-500">*</span></label>
              <textarea 
                name="alamatKtp" 
                value={data.alamatKtp} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan alamat KTP lengkap" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat sekarang <span className="text-red-500">*</span></label>
              <textarea 
                name="alamatSekarang" 
                value={data.alamatSekarang} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan alamat sekarang" 
                required 
                disabled={loading}
              />
            </div>
          </div>
        </div>
        {/* Section Lampiran Persyaratan */}
        <div className="pt-8 mt-8 border-t-2 border-primary/20">
          <div className="font-bold mb-4 text-primary text-lg border-l-4 border-primary pl-3">B. LAMPIRAN PERSYARATAN</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {persyaratan.map((p, idx) => (
              <div key={p} className="mb-3">
                <label className="block mb-1 text-sm font-semibold text-gray-700">{p} <span className="text-red-500">*</span></label>
                <div
                  className="w-full border-2 border-primary rounded-lg px-4 py-8 text-center bg-white cursor-pointer flex flex-col items-center justify-center mb-1 transition hover:bg-primary/5"
                  onClick={() => !loading && handleAreaClick(p)}
                >
                  <img src="/file.svg" alt="Pilih Berkas" className="mx-auto mb-2 w-10 h-10 object-contain" />
                  <span className="text-gray-500 text-sm">{uploads[p] ? uploads[p].name : 'Pilih berkas'}</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={e => handleUpload(e, p)}
                    className="hidden"
                    ref={el => (fileRefs.current[p] = el)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition mt-10 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
    </div>
  );
}
