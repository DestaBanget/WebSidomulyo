import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const dummyPariwisata = [
  {
    id: '1',
    nama: 'Bukit Sidomulyo',
    date: '2024-06-01',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Bukit Sidomulyo menawarkan pemandangan alam yang indah dan udara segar. Tempat ini cocok untuk hiking, camping, dan menikmati sunrise. Fasilitas umum tersedia dan akses jalan sudah baik.`,
  },
  {
    id: '2',
    nama: 'Air Terjun Sumber Rejeki',
    date: '2024-05-28',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Air terjun alami dengan suasana asri, cocok untuk wisata keluarga dan piknik. Terdapat area bermain anak dan warung makan di sekitar lokasi.`,
  },
  {
    id: '3',
    nama: 'Kebun Teh Sidomulyo',
    date: '2024-05-20',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Kebun teh yang luas dan hijau, menawarkan wisata edukasi dan spot foto menarik. Pengunjung dapat belajar proses pengolahan teh dari petani lokal.`,
  },
  {
    id: '4',
    nama: 'Embung Desa',
    date: '2024-05-15',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Embung desa berfungsi sebagai penampungan air sekaligus destinasi wisata air. Tersedia perahu sewa dan area memancing.`,
  },
  {
    id: '5',
    nama: 'Kampung Wisata Edukasi',
    date: '2024-05-10',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Kampung wisata edukasi menawarkan berbagai kegiatan belajar berbasis alam untuk anak-anak dan keluarga.`,
  },
  {
    id: '6',
    nama: 'Agrowisata Jeruk',
    date: '2024-05-05',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    deskripsi: `Wisata petik jeruk langsung dari kebun, edukasi pertanian, dan area bermain anak.`,
  },
];

export default function PariwisataDetail() {
  const { id } = useParams();
  const [wisata, setWisata] = useState(null);

  useEffect(() => {
    const found = dummyPariwisata.find(w => w.id === id);
    setWisata(found);
  }, [id]);

  if (!wisata) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Destinasi tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Pariwisata</h1>
      </div>
      <section className="max-w-3xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <img src={wisata.img} alt={wisata.nama} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{wisata.nama}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(wisata.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{wisata.deskripsi}</div>
      </section>
    </div>
  );
} 