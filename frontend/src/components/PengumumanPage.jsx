import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePengumuman } from '../contexts/PengumumanContext';

export default function PengumumanPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pengumuman, loading, error } = usePengumuman();
  const [search, setSearch] = useState('');
  const heroImg = '/surat.jpg';

  const filtered = pengumuman.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    (b.desc && b.desc.toLowerCase().includes(search.toLowerCase())) ||
    (b.content && b.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Pengumuman</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow">Informasi penting dan pengumuman resmi dari pemerintah desa.</p>
          <input
            type="text"
            placeholder="Cari pengumuman..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-full border-2 border-white/80 focus:border-primary outline-none text-lg bg-white/90 placeholder-gray-400 shadow"
          />
        </div>
      </div>
      {/* Tombol Tambah Pengumuman untuk Admin */}
      {isAdmin && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-primary text-white rounded font-semibold shadow hover:bg-primary/90 transition" onClick={() => navigate('/admin/tambah-pengumuman')}>Tambah Pengumuman</button>
        </div>
      )}
      {/* Grid Cards */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-10">
        {loading ? (
          <div className="text-center text-gray-400 text-lg py-20">Memuat data...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada pengumuman ditemukan.</div>
            )}
            {filtered.map(b => (
              <Link to={`/publikasi/pengumuman/${b.id}`} key={b.id} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20 relative">
                <div className="relative h-52 overflow-hidden">
                  <img src={b.img || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col p-7">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-2 min-h-[2.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
                  <p className="text-gray-500 text-base mb-4 line-clamp-3 min-h-[4.2em]">{b.desc || b.content?.substring(0, 150) + '...'}</p>
                  <span className="text-gray-400 text-sm mt-auto font-medium">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!loading && filtered.length === pengumuman.length && (
          <div className="text-center text-gray-400 mt-12">Hasil akhir dari pengumuman</div>
        )}
      </div>
    </div>
  );
} 