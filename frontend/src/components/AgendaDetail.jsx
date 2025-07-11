import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const dummyAgenda = [
  {
    id: '1',
    title: 'Rapat Koordinasi Perangkat Desa',
    date: '2025-01-15',
    content: `Rapat koordinasi perangkat desa akan dilaksanakan pada 15 Januari 2025 pukul 09.00 WIB di balai desa. Agenda utama adalah evaluasi program kerja tahun lalu dan perencanaan kegiatan tahun berjalan.`,
  },
  {
    id: '2',
    title: 'Musyawarah Dusun Timur',
    date: '2025-01-18',
    content: `Musyawarah Dusun Timur membahas pembangunan infrastruktur dan pembagian bantuan sosial. Seluruh warga Dusun Timur diundang hadir.`,
  },
  {
    id: '3',
    title: 'Pelatihan Kader Posyandu',
    date: '2025-01-20',
    content: `Pelatihan kader posyandu akan diadakan di aula desa. Materi meliputi kesehatan ibu dan anak serta administrasi posyandu.`,
  },
  {
    id: '4',
    title: 'Kerja Bakti Bersama',
    date: '2025-01-22',
    content: `Kerja bakti membersihkan lingkungan desa akan dilaksanakan serentak di seluruh dusun. Diharapkan seluruh warga berpartisipasi aktif.`,
  },
  {
    id: '5',
    title: 'Sosialisasi Program Kesehatan',
    date: '2025-01-25',
    content: `Sosialisasi program kesehatan masyarakat oleh Puskesmas akan diadakan di balai desa.`,
  },
  {
    id: '6',
    title: 'Lomba Desa Sehat',
    date: '2025-01-28',
    content: `Lomba desa sehat tingkat kecamatan akan diikuti oleh Desa Sidomulyo. Mohon dukungan seluruh warga.`,
  },
];

export default function AgendaDetail() {
  const { id } = useParams();
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    const found = dummyAgenda.find(a => a.id === id);
    setAgenda(found);
  }, [id]);

  if (!agenda) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Agenda tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Agenda</h1>
      </div>
      <section className="max-w-3xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">Agenda Desa</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{agenda.title}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(agenda.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{agenda.content}</div>
      </section>
    </div>
  );
} 