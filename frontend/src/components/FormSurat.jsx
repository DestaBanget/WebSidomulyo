import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  const fileRefs = useRef({});
  const { user, updateUser } = useAuth();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (e, key) => {
    setUploads({ ...uploads, [key]: e.target.files[0] });
  };

  const handleAreaClick = (key) => {
    if (fileRefs.current[key]) fileRefs.current[key].click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan ke riwayat surat user jika login
    if (user && updateUser) {
      const newSurat = {
        jenisSurat,
        tanggal: new Date().toISOString().slice(0, 10),
        status: 'Menunggu',
        nama: data.nama,
        nik: data.nik,
      };
      const updatedUser = {
        ...user,
        suratHistory: Array.isArray(user.suratHistory)
          ? [...user.suratHistory, newSurat]
          : [newSurat],
      };
      updateUser(updatedUser);
    }
    alert('Form terkirim!');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 text-center tracking-tight uppercase drop-shadow">Formulir {jenisSurat}</h2>
      <p className="text-gray-600 text-center mb-8 text-base md:text-lg">Lengkapi form di bawah ini untuk mengajukan permohonan surat. Pastikan data benar dan lengkap.</p>
      <form onSubmit={handleSubmit} className="w-full">
        {/* Section Data Diri */}
        <div className="mb-10">
          <div className="font-bold mb-4 text-primary text-lg border-l-4 border-primary pl-3">A. DATA DIRI</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Nama lengkap <span className="text-red-500">*</span></label>
              <span className="block text-xs text-red-500 mb-1">(gunakan huruf besar)</span>
              <input name="nama" value={data.nama} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:uppercase placeholder:text-gray-400 mb-4" placeholder="MASUKKAN NAMA LENGKAP" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">NIK <span className="text-red-500">*</span></label>
              <input name="nik" value={data.nik} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan NIK" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Jenis kelamin <span className="text-red-500">*</span></label>
              <select name="jenisKelamin" value={data.jenisKelamin} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" required>
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Tempat lahir <span className="text-red-500">*</span></label>
              <input name="tempatLahir" value={data.tempatLahir} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan tempat lahir" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Tanggal lahir <span className="text-red-500">*</span></label>
              <input name="tanggalLahir" type="date" value={data.tanggalLahir} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Pekerjaan</label>
              <input name="pekerjaan" value={data.pekerjaan} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan pekerjaan" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Kewarganegaraan</label>
              <input name="kewarganegaraan" value={data.kewarganegaraan} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan kewarganegaraan" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Agama <span className="text-red-500">*</span></label>
              <select name="agama" value={data.agama} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary mb-4" required>
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
              <input name="noHp" value={data.noHp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="62 Masukkan nomor ponsel" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat KTP <span className="text-red-500">*</span></label>
              <textarea name="alamatKtp" value={data.alamatKtp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan alamat KTP lengkap" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat sekarang <span className="text-red-500">*</span></label>
              <textarea name="alamatSekarang" value={data.alamatSekarang} onChange={handleChange} className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-primary placeholder:text-gray-400 mb-4" placeholder="Masukkan alamat sekarang" required />
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
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary/90 transition mt-10 text-lg tracking-wide">Kirim</button>
      </form>
    </div>
  );
}
