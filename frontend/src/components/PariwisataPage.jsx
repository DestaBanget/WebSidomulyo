import React, { useState, useEffect } from 'react';

const dummyPariwisata = [
  {
    nama: 'Pantai Selat Baru Pamesi',
    img: '/contoh-pantai.jpg',
  },
  {
    nama: 'Taman Andam Dewi Pamesi',
    img: '/contoh-taman.jpg',
  },
  {
    nama: 'Hutan Mangrove Sebauk Pamesi',
    img: '/contoh-mangrove.jpg',
  },
];

export default function PariwisataPage() {
  const [pariwisata, setPariwisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/pariwisata')
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat data');
        return res.json();
      })
      .then(data => setPariwisata(data))
      .catch(() => setPariwisata(dummyPariwisata))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[320px] md:min-h-[420px]" style={{
        background: 'linear-gradient(180deg, rgba(30,64,175,0.85) 0%, rgba(30,64,175,0.0) 100%), url(/contoh-pariwisata.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Pariwisata</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Terpesona oleh pesona alam dan keunikan budaya. Temukan pengalaman tak terlupakan di destinasi pariwisata kami.</p>
        </div>
      </div>

      {/* Destinasi Wisata */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-400 text-lg py-20">Memuat data...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pariwisata.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada destinasi ditemukan.</div>
            )}
            {pariwisata.map((d) => (
              <div key={d.nama || d.id} className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 group transition hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="h-48 w-full bg-gray-200 relative">
                  <img src={d.img} alt={d.nama} className="object-cover w-full h-full group-hover:brightness-90 transition" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-lg md:text-xl font-bold text-center drop-shadow-lg">{d.nama}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && pariwisata.length > 0 && (
          <div className="text-center text-gray-500 mt-10">Hasil akhir dari pariwisata</div>
        )}
      </section>
    </div>
  );
} 