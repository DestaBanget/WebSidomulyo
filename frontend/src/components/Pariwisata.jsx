import React from 'react';

const wisata = [
  {
    id: 1,
    nama: 'Bukit Sidomulyo',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    nama: 'Air Terjun Sumber Rejeki',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    nama: 'Kebun Teh Sidomulyo',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    nama: 'Embung Desa',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    nama: 'Kampung Wisata Edukasi',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    nama: 'Agrowisata Jeruk',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Pariwisata() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Pariwisata Desa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {wisata.slice(0, 3).map((w) => (
          <div
            key={w.id}
            className="relative rounded-3xl overflow-hidden shadow-xl group h-56 md:h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20"
            style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)'}}
          >
            <img
              src={w.img}
              alt={w.nama}
              className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex items-end">
              <span className="w-full text-center text-xl md:text-2xl font-bold text-white py-4 bg-gradient-to-t from-black/60 to-transparent tracking-tight drop-shadow-lg">
                {w.nama}
              </span>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-inner group-hover:shadow-primary/10 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
} 