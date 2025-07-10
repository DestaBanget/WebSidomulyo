import React from 'react';

const destinasi = [
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinasi.map((d) => (
            <div key={d.nama} className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 group transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="h-48 w-full bg-gray-200 relative">
                <img src={d.img} alt={d.nama} className="object-cover w-full h-full group-hover:brightness-90 transition" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl font-bold text-center drop-shadow-lg">{d.nama}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-500 mt-10">Hasil akhir dari pariwisata</div>
      </section>
    </div>
  );
} 