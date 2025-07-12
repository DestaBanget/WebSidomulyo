import React, { useState, useEffect } from 'react';

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

export default function FormSurat({ jenisSurat, persyaratan, onClose }) {
  const [data, setData] = useState(initialData);
  const [uploads, setUploads] = useState({});

  // Mencegah scroll pada body saat modal terbuka
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (e, key) => {
    setUploads({ ...uploads, [key]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
    alert('Form terkirim!');
    if (onClose) onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative overflow-y-auto max-h-[90vh] mx-4">
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl z-10"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">Permohonan {jenisSurat}</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Lengkapi form di bawah ini untuk mengajukan permohonan surat. Pastikan data benar dan lengkap.</p>
        <div className="mb-4">
          <div className="font-bold mb-2 text-primary">A. DATA DIRI</div>
          <label className="block mb-1 text-sm font-semibold">Nama lengkap <span className="text-red-500">*</span></label>
          <span className="block text-xs text-red-500 mb-1">(gunakan huruf besar)</span>
          <input name="nama" value={data.nama} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:uppercase placeholder:text-gray-400 mb-3" placeholder="MASUKKAN NAMA LENGKAP" required />
          <label className="block mb-2 text-sm font-semibold">NIK *</label>
          <input name="nik" value={data.nik} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan NIK" required />
          <label className="block mb-2 text-sm font-semibold">Jenis kelamin *</label>
          <select name="jenisKelamin" value={data.jenisKelamin} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" required>
            <option value="">Pilih jenis kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <label className="block mb-2 text-sm font-semibold">Tempat lahir *</label>
          <input name="tempatLahir" value={data.tempatLahir} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan tempat lahir" required />
          <label className="block mb-2 text-sm font-semibold">Tanggal lahir *</label>
          <input name="tanggalLahir" type="date" value={data.tanggalLahir} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" required />
          <label className="block mb-2 text-sm font-semibold">Pekerjaan</label>
          <input name="pekerjaan" value={data.pekerjaan} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan pekerjaan" />
          <label className="block mb-2 text-sm font-semibold">Kewarganegaraan</label>
          <input name="kewarganegaraan" value={data.kewarganegaraan} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan kewarganegaraan" />
          <label className="block mb-2 text-sm font-semibold">Agama *</label>
          <select name="agama" value={data.agama} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-3" required>
            <option value="">Pilih agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <label className="block mb-2 text-sm font-semibold">Nomor ponsel *</label>
          <input name="noHp" value={data.noHp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="62 Masukkan nomor ponsel" required />
          <label className="block mb-2 text-sm font-semibold">Alamat KTP *</label>
          <textarea name="alamatKtp" value={data.alamatKtp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan alamat KTP lengkap" required />
          <label className="block mb-2 text-sm font-semibold">Alamat sekarang *</label>
          <textarea name="alamatSekarang" value={data.alamatSekarang} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-400 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 placeholder:text-gray-400 mb-3" placeholder="Masukkan alamat sekarang" required />
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2 text-primary">B. LAMPIRAN PERSYARATAN</div>
          {persyaratan.map((p, idx) => (
            <div key={p} className="mb-3">
              <label className="block mb-1 text-sm font-semibold">{p} *</label>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleUpload(e, p)} className="block w-full border rounded px-2 py-1" required />
            </div>
          ))}
        </div>
        <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition">Kirim</button>
      </form>
    </div>
  );
}
