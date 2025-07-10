import React, { useState, useEffect } from 'react';

const dummyBerita = [
  {
    id: 1,
    title: 'Pembangunan Jembatan Baru di Dusun Timur',
    desc: 'Jembatan penghubung antar dusun kini telah selesai dibangun dan siap digunakan warga.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Pelatihan UMKM: Meningkatkan Daya Saing Produk Lokal',
    desc: 'Pelatihan UMKM diikuti puluhan pelaku usaha desa untuk meningkatkan kualitas produk.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Gotong Royong Bersihkan Lingkungan',
    desc: 'Warga desa bersama perangkat desa melakukan gotong royong membersihkan lingkungan.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Bantuan Sosial untuk Warga Terdampak Banjir',
    desc: 'Penyaluran bantuan sosial kepada warga yang terdampak banjir di beberapa dusun.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Lomba 17 Agustus: Meriahkan HUT RI',
    desc: 'Berbagai lomba diadakan untuk memeriahkan HUT RI ke-80 di desa.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Sosialisasi Kesehatan Ibu dan Anak',
    desc: 'Sosialisasi pentingnya kesehatan ibu dan anak diadakan di balai desa.',
    date: '2025-01-11',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
];

export default function BeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/berita')
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat data');
        return res.json();
      })
      .then(data => setBerita(data))
      .catch(() => setBerita(dummyBerita))
      .finally(() => setLoading(false));
  }, []);

  const filtered = berita.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-primary/80" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Berita</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow">Dapatkan berita terkini seputar kehidupan dan perkembangan desa kami.</p>
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-full border-2 border-white/80 focus:border-primary outline-none text-lg bg-white/90 placeholder-gray-400 shadow"
          />
        </div>
      </div>
      {/* Grid Cards */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-10">
        {loading ? (
          <div className="text-center text-gray-400 text-lg py-20">Memuat data...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada berita ditemukan.</div>
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
        {!loading && filtered.length === berita.length && (
          <div className="text-center text-gray-400 mt-12">Hasil akhir dari berita</div>
        )}
      </div>
    </div>
  );
} 