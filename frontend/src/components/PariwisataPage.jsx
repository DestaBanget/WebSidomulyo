import React, { useState } from 'react';
import Pariwisata from './Pariwisata';

export const initialPariwisata = [
  { id: '8', nama: 'Taman Bunga Sidomulyo', date: '2024-06-09', img: '/surat2.jpeg' },
  { id: '7', nama: 'Wisata Sawah Indah', date: '2024-06-09', img: '/surat.jpg' },
  { id: '1', nama: 'Bukit Sidomulyo', date: '2024-06-01', img: '/surat.jpg' },
  { id: '2', nama: 'Air Terjun Sumber Rejeki', date: '2024-05-28', img: '/surat2.jpeg' },
  { id: '3', nama: 'Kebun Teh Sidomulyo', date: '2024-05-20', img: '/surat.jpg' },
  { id: '4', nama: 'Embung Desa', date: '2024-05-15', img: '/surat2.jpeg' },
  { id: '5', nama: 'Kampung Wisata Edukasi', date: '2024-05-10', img: '/surat.jpg' },
  { id: '6', nama: 'Agrowisata Jeruk', date: '2024-05-05', img: '/surat2.jpeg' },
];

export default function PariwisataPage() {
  const [pariwisata] = useState(initialPariwisata);
  const sortedPariwisata = [...pariwisata].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden" style={{
        background: `url('/surat.jpg') center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">Pariwisata</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2 text-white">Terpesona oleh pesona alam dan keunikan budaya. Temukan pengalaman tak terlupakan di destinasi pariwisata kami.</p>
        </div>
      </div>
      {/* Destinasi Wisata */}
      <Pariwisata showAll data={sortedPariwisata} />
    </div>
  );
} 