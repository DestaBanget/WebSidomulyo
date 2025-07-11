import React from 'react';
import { useParams } from 'react-router-dom';
import { useBerita } from '../contexts/BeritaContext';

export default function BeritaDetail() {
  const { id } = useParams();
  const { berita, loading } = useBerita();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Memuat data...</div>;

  const found = berita.find(b => String(b.id) === String(id));
  if (!found) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Berita</h1>
      </div>
      {/* Konten Detail */}
      <section className="max-w-3xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Berita Desa</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{found.title}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(found.tanggal || found.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{found.content}</div>
      </section>
    </div>
  );
} 