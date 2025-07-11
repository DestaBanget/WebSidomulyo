import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const dummyPengumuman = [
  {
    id: '1',
    title: 'Pemadaman Listrik Sementara',
    date: '2025-01-13',
    content: `Akan ada pemadaman listrik di wilayah Dusun Barat pada 15 Januari 2025 pukul 09.00-15.00 WIB. Mohon warga mempersiapkan diri dan mengantisipasi kebutuhan listrik selama pemadaman berlangsung.`,
  },
  {
    id: '2',
    title: 'Pendaftaran Bantuan Sosial Dibuka',
    date: '2025-01-12',
    content: `Pendaftaran bantuan sosial untuk warga kurang mampu dibuka hingga 20 Januari 2025. Silakan datang ke kantor desa dengan membawa dokumen pendukung.`,
  },
  {
    id: '3',
    title: 'Jadwal Posyandu Bulan Januari',
    date: '2025-01-11',
    content: `Posyandu akan dilaksanakan pada 18 Januari 2025 di balai desa mulai pukul 08.00 WIB. Diharapkan seluruh ibu dan balita hadir tepat waktu.`,
  },
  {
    id: '4',
    title: 'Penutupan Jalan Sementara',
    date: '2025-01-10',
    content: `Jalan utama desa akan ditutup sementara untuk perbaikan mulai 16 Januari 2025. Mohon warga menggunakan jalur alternatif.`,
  },
  {
    id: '5',
    title: 'Pengambilan KTP Elektronik',
    date: '2025-01-09',
    content: `Warga yang telah melakukan perekaman KTP elektronik dapat mengambil KTP di kantor desa pada jam kerja.`,
  },
  {
    id: '6',
    title: 'Pendaftaran Lomba Desa Sehat',
    date: '2025-01-08',
    content: `Pendaftaran lomba desa sehat dibuka hingga 25 Januari 2025 untuk seluruh warga. Segera daftarkan diri Anda!`,
  },
];

export default function PengumumanDetail() {
  const { id } = useParams();
  const [pengumuman, setPengumuman] = useState(null);

  useEffect(() => {
    const found = dummyPengumuman.find(p => p.id === id);
    setPengumuman(found);
  }, [id]);

  if (!pengumuman) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Pengumuman tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Pengumuman</h1>
      </div>
      <section className="max-w-3xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">Pengumuman Desa</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{pengumuman.title}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(pengumuman.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{pengumuman.content}</div>
      </section>
    </div>
  );
} 