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
  const [errorFields, setErrorFields] = useState({});
  const fileRefs = useRef({});
  const nikRef = useRef(null);
  const tanggalLahirRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (e, key) => {
    setUploads({ ...uploads, [key]: e.target.files[0] });
  };

  const handleAreaClick = (key) => {
    if (fileRefs.current[key] && !loading) fileRefs.current[key].click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Anda harus login terlebih dahulu');
      setErrorFields({});
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    setErrorFields({});

    // Validasi manual NIK
    if (!/^\d{16}$/.test(data.nik)) {
      setError('NIK harus 16 digit angka');
      setErrorFields({ nik: 'NIK harus 16 digit angka' });
      setLoading(false);
      setTimeout(() => {
        if (nikRef.current) nikRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }
    // Validasi tanggal lahir tidak boleh di masa depan
    if (data.tanggalLahir && new Date(data.tanggalLahir) > new Date()) {
      setError('Tanggal lahir tidak boleh di masa depan');
      setErrorFields({ tanggalLahir: 'Tanggal lahir tidak boleh di masa depan' });
      setLoading(false);
      setTimeout(() => {
        if (tanggalLahirRef.current) tanggalLahirRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }
    // Validasi lampiran (jika ada persyaratan wajib upload)
    for (const key of Object.keys(uploads)) {
      const file = uploads[key];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          setError('Format file lampiran tidak didukung. Hanya JPG, JPEG, PNG, atau PDF.');
          setErrorFields({ [`lampiran_${key}`]: 'Format file lampiran tidak didukung.' });
          setLoading(false);
          setTimeout(() => {
            if (fileRefs.current[key]) fileRefs.current[key].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError('Ukuran file lampiran maksimal 5MB.');
          setErrorFields({ [`lampiran_${key}`]: 'Ukuran file lampiran maksimal 5MB.' });
          setLoading(false);
          setTimeout(() => {
            if (fileRefs.current[key]) fileRefs.current[key].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
          return;
        }
      }
    }

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
      <p className="text-gray-600 text-center mb-8 text-base md:text-lg">Lengkapi form di bawah ini sesuai KTP anda untuk mengajukan permohonan surat. Pastikan data benar dan lengkap.</p>
      
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
            {/* Baris 1 */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Nama lengkap <span className="text-red-500">*</span></label>
              <span className="block text-xs text-blue-500 mb-1">(gunakan nama sesuai KTP)</span>
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
              <span className="block text-xs text-gray-500 mb-1">NIK harus 16 digit angka</span>
              <input 
                name="nik" 
                value={data.nik} 
                onChange={handleChange} 
                className={`w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:outline-none placeholder:text-gray-400 mb-1 ${errorFields.nik ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:border-primary`} 
                ref={nikRef}
                placeholder="Masukkan NIK" 
                required 
                disabled={loading}
              />
              {errorFields.nik && <span className="text-xs text-red-500 mb-2 block">{errorFields.nik}</span>}
            </div>
            {/* Baris 2 */}
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
            {/* Baris 3 */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Tanggal lahir <span className="text-red-500">*</span></label>

              <input 
                name="tanggalLahir" 
                type="date" 
                value={data.tanggalLahir} 
                onChange={handleChange} 
                className={`w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:outline-none placeholder:text-gray-400 mb-1 ${errorFields.tanggalLahir ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:border-primary`} 
                ref={tanggalLahirRef}
                required 
                disabled={loading}
              />
              {errorFields.tanggalLahir && <span className="text-xs text-red-500 mb-2 block">{errorFields.tanggalLahir}</span>}
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
            {/* Baris 4 */}
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
            {/* Baris 5 */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor ponsel <span className="text-red-500">*</span></label>
              <span className="block text-xs text-gray-500 mb-1">Gunakan format 08xxxxxxxxxx</span>
              <input 
                name="noHp" 
                value={data.noHp} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" 
                placeholder="Masukkan nomor ponsel" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat KTP <span className="text-red-500">*</span></label>
              <span className="block text-xs text-gray-500 mb-1">Isi sesuai alamat pada KTP</span>
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
          </div>
          {/* Baris 6: Alamat sekarang full width */}
          <div className="mt-6">
            <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat sekarang <span className="text-red-500">*</span></label>
            <span className="block text-xs text-gray-500 mb-1">Isi alamat domisili saat ini</span>
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
        {/* Section Lampiran Persyaratan */}
        <div className="pt-8 mt-8 border-t-2 border-primary/20">
          <div className="font-bold mb-4 text-primary text-lg border-l-4 border-primary pl-3">B. LAMPIRAN PERSYARATAN</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {persyaratan.map((p, idx) => {
              // Deteksi syarat khusus pas foto
              const isPasFoto = /pas foto 4x6/i.test(p);
              const isLuarDesa = /jika penduduk luar desa, wajib membawa identitas asli/i.test(p);
              const notRequired = /jika ada|jika diperlukan|jika sudah menikah|jika kehilangan|jika suami|jika sudah berumur|atau|bermaterai|catatan umum|opsional/i.test(p);
              return (
              <div key={p} className="mb-3">
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    {p} {isPasFoto ? <span className="text-blue-600 italic ml-1">(Dibawa pada saat mengambil surat)</span> : null}
                    {isLuarDesa ? null : (!notRequired && !isPasFoto ? <span className="text-red-500">*</span> : notRequired ? <span className="text-gray-400 italic">(opsional)</span> : null)}
                  </label>
                <div
                  className="w-full border-2 border-primary rounded-lg px-4 py-8 text-center bg-white cursor-pointer flex flex-col items-center justify-center mb-1 transition hover:bg-primary/5"
                  onClick={() => handleAreaClick(p)}
                >
                  <img src="/file.svg" alt="Pilih Berkas" className="mx-auto mb-2 w-10 h-10 object-contain" />
                  <span className="text-gray-500 text-sm">{uploads[p] ? uploads[p].name : 'Pilih berkas'}</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={e => handleUpload(e, p)}
                    className="hidden"
                    ref={el => (fileRefs.current[p] = el)}
                    required={isLuarDesa ? false : (!notRequired && !isPasFoto)}
                    disabled={loading}
                  />
                  <span className="block text-xs text-gray-500 mt-2">Format file: JPG, JPEG, PNG, atau PDF. Ukuran maksimal 5MB.</span>
                </div>
                {errorFields[`lampiran_${p}`] && <span className="text-xs text-red-500 mt-1 block">{errorFields[`lampiran_${p}`]}</span>}
              </div>
              );
            })}
          </div>
        </div>
        {/* Catatan Penting */}
        <div className="mt-10 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="font-bold text-yellow-700 mb-2">Catatan Penting Saat Mengambil Surat:</div>
          <ul className="list-disc ml-6 text-yellow-800 text-sm">
            <li>Membawa HP (untuk keperluan komunikasi/konfirmasi)</li>
            <li>Membawa materai 10.000 (jika diperlukan untuk penandatanganan/pernyataan)</li>
            <li>Membawa identitas asli (KTP/KK/SIM) untuk verifikasi</li>
            <li>Pastikan semua dokumen asli dan fotokopi sudah lengkap sebelum datang ke kantor desa</li>
          </ul>
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
