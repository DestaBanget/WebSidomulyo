import React, { useState, useEffect } from 'react';

const dummyPengumuman = [
  {
    id: 1,
    title: 'Pemadaman Listrik Sementara',
    desc: 'Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB.',
    date: '2025-01-13',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Pendaftaran Bantuan Sosial Dibuka',
    desc: 'Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025.',
    date: '2025-01-12',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Jadwal Posyandu Bulan Januari',
    desc: 'Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Penutupan Jalan Sementara',
    desc: 'Jalan utama desa akan ditutup sementara untuk perbaikan mulai 16 Januari 2025.',
    date: '2025-01-10',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Pengambilan KTP Elektronik',
    desc: 'Warga yang telah melakukan perekaman KTP elektronik dapat mengambil KTP di kantor desa.',
    date: '2025-01-09',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Pendaftaran Lomba Desa Sehat',
    desc: 'Pendaftaran lomba desa sehat dibuka hingga 25 Januari 2025 untuk seluruh warga.',
    date: '2025-01-08',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
];

export default function PengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/pengumuman')
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat data');
        return res.json();
      })
      .then(data => setPengumuman(data))
      .catch(() => setPengumuman(dummyPengumuman))
      .finally(() => setLoading(false));
  }, []);

  const filtered = pengumuman.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center bg-primary/80">
        <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Pengumuman" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />
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
      {/* Grid Cards */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
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
              <div key={b.id} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20 relative">
                <div className="relative h-52 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col p-7">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-2 min-h-[2.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
                  <p className="text-gray-500 text-base mb-4 line-clamp-3 min-h-[4.2em]">{b.desc}</p>
                  <span className="text-gray-400 text-sm mt-auto font-medium">{new Date(b.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
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