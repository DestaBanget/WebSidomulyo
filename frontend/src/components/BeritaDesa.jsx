import React from 'react';
import { Link } from 'react-router-dom';

const berita = [
  {
    id: 1,
    title: 'Pembangunan Jalan Baru di Dusun Krajan Selesai Lebih Cepat',
    kategori: 'Pembangunan',
    tanggal: '2024-06-01',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Penyaluran Bantuan Sosial Tahap II untuk Warga Kurang Mampu',
    kategori: 'Sosial',
    tanggal: '2024-05-28',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Lomba 17 Agustus: Meriahkan HUT RI ke-79 di Desa Sidomulyo',
    kategori: 'Agenda',
    tanggal: '2024-05-20',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Pelatihan Digitalisasi Administrasi untuk Perangkat Desa',
    kategori: 'Pendidikan',
    tanggal: '2024-05-15',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Gotong Royong Bersihkan Lingkungan Menjelang Musim Hujan',
    kategori: 'Lingkungan',
    tanggal: '2024-05-10',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Sosialisasi Program Kesehatan Ibu dan Anak di Balai Desa',
    kategori: 'Kesehatan',
    tanggal: '2024-05-05',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
];

const kategoriColor = {
  Pembangunan: 'bg-primary/90 text-white',
  Sosial: 'bg-green-500/90 text-white',
  Agenda: 'bg-yellow-400/90 text-gray-800',
  Pendidikan: 'bg-pink-500/90 text-white',
  Lingkungan: 'bg-emerald-600/90 text-white',
  Kesehatan: 'bg-red-500/90 text-white',
};

export default function BeritaDesa() {
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
                src={b.img}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700"
              />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${kategoriColor[b.kategori] || 'bg-primary text-white'}`}>
                {b.kategori}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-7">
              <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-3 min-h-[3.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
              <span className="text-gray-400 text-sm mt-auto font-medium">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-inner group-hover:shadow-primary/10 transition-all duration-500" />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <a href="/publikasi/berita" className="inline-block px-7 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition text-lg">Lihat Berita</a>
      </div>
    </section>
  );
} 