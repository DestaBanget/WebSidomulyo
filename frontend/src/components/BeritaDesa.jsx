import React from 'react';
import { Link } from 'react-router-dom';
import { useBerita } from '../contexts/BeritaContext';

const kategoriColor = {
  Pembangunan: 'bg-primary/90 text-white',
  Sosial: 'bg-green-500/90 text-white',
  Agenda: 'bg-yellow-400/90 text-gray-800',
  Pendidikan: 'bg-pink-500/90 text-white',
  Lingkungan: 'bg-emerald-600/90 text-white',
  Kesehatan: 'bg-red-500/90 text-white',
  Pariwisata: 'bg-blue-500/90 text-white',
  Prestasi: 'bg-purple-500/90 text-white',
  Kuliner: 'bg-orange-500/90 text-white',
};

export default function BeritaDesa() {
  const { berita, loading, error } = useBerita();

  // Loading state
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Berita Desa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
              <div className="h-52 bg-gray-200"></div>
              <div className="p-7">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Berita Desa</h2>
        <div className="text-center py-10">
          <div className="text-red-500 mb-4">⚠️ Gagal memuat berita</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (!berita || berita.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Berita Desa</h2>
        <div className="text-center py-10">
          <div className="text-gray-500 mb-4">📰 Belum ada berita tersedia</div>
          <p className="text-gray-600">Berita akan ditampilkan di sini setelah ditambahkan oleh admin.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Berita Desa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {berita.slice(0, 6).map((b) => (
          <Link
            to={`/publikasi/berita/${b.id}`}
            key={b.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20 relative"
            style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)'}}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={b.img || '/surat.jpg'}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/surat.jpg';
                }}
              />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${kategoriColor[b.kategori] || 'bg-primary text-white'}`}>
                {b.kategori}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-7">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-3 min-h-[3.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
              <span className="text-gray-400 text-sm mt-auto font-medium">
                {new Date(b.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-inner group-hover:shadow-primary/10 transition-all duration-500" />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/publikasi/berita" className="inline-block px-7 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition text-lg animate-bounce">
          Lihat Berita
        </Link>
      </div>
    </section>
  );
} 