import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaHeading, FaAlignLeft, FaNewspaper } from 'react-icons/fa';
import logokamera from '/logokamera.svg';

const kategoriList = [
  'Pembangunan', 'Sosial', 'Agenda', 'Pendidikan', 'Lingkungan', 'Kesehatan', 'Pariwisata'
];

export default function AddBeritaPage() {
  const navigate = useNavigate();
  const [addData, setAddData] = useState({
    title: '',
    kategori: kategoriList[0],
    tanggal: '',
    img: '',
    desc: '',
    content: '',
  });
  const [success, setSuccess] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const heroImg = '/surat.jpg';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi submit, bisa dihubungkan ke backend nanti
    setSuccess(true);
    setTimeout(() => navigate('/publikasi/berita'), 1200);
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
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Judul Berita</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaHeading size={18} /></span>
                <input type="text" className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg" placeholder="Masukkan judul berita..." value={addData.title} onChange={e => setAddData({ ...addData, title: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Kategori</label>
                <select className="w-full border-2 border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg" value={addData.kategori} onChange={e => setAddData({ ...addData, kategori: e.target.value })}>
                  {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tanggal</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70"><FaCalendarAlt size={16} /></span>
                  <input type="date" className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition text-lg" placeholder="dd/mm/yyyy" value={addData.tanggal} onChange={e => setAddData({ ...addData, tanggal: e.target.value })} required />
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
                  <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {!imgPreview && <span className="text-gray-400 text-sm">Pilih gambar berita (jpg/png)</span>}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-primary/70"><FaAlignLeft size={16} /></span>
                <textarea className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg" rows={2} placeholder="Deskripsi singkat berita..." value={addData.desc || ''} onChange={e => setAddData({ ...addData, desc: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Isi Berita</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-primary/70"><FaNewspaper size={16} /></span>
                <textarea className="w-full border-2 border-primary/20 rounded-lg px-10 py-2 focus:outline-none focus:border-primary focus:shadow-lg transition placeholder:text-gray-400 text-lg" rows={5} placeholder="Tulis isi lengkap berita di sini..." value={addData.content || ''} onChange={e => setAddData({ ...addData, content: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-primary text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:scale-[1.02] transition text-lg tracking-wide mt-4 flex items-center justify-center gap-2">
              <FaNewspaper size={20} /> Simpan Berita
            </button>
            {success && <div className="text-green-600 text-center font-semibold mt-2 animate-fade-in">Berita berhasil ditambahkan!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
