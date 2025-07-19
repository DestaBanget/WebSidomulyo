import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePengumuman } from '../contexts/PengumumanContext';

export default function PengumumanDetail() {
  const { id } = useParams();
  const { pengumuman } = usePengumuman();
  const [pengumumanDetail, setPengumumanDetail] = useState(null);

  useEffect(() => {
    const found = pengumuman.find(p => p.id.toString() === id);
    setPengumumanDetail(found);
  }, [id, pengumuman]);

  if (!pengumumanDetail) {
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{pengumumanDetail.title}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(pengumumanDetail.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        
        {/* Gambar Pengumuman */}
        {(pengumumanDetail.img || pengumumanDetail.image || pengumumanDetail.photo) && (
          <div className="mb-6">
            <img 
              src={pengumumanDetail.img || pengumumanDetail.image || pengumumanDetail.photo} 
              alt={pengumumanDetail.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              style={{ maxHeight: '400px' }}
              onError={(e) => {
                console.log('Gambar gagal dimuat:', pengumumanDetail.img || pengumumanDetail.image || pengumumanDetail.photo);
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Placeholder jika tidak ada gambar */}
        {!pengumumanDetail.img && !pengumumanDetail.image && !pengumumanDetail.photo && (
          <div className="mb-6 bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-gray-400 text-lg">Tidak ada gambar untuk pengumuman ini</div>
          </div>
        )}
        
        {/* Deskripsi Singkat */}
        {pengumumanDetail.desc && pengumumanDetail.desc !== pengumumanDetail.content && (
          <div className="text-gray-600 text-base mb-6 italic">
            {pengumumanDetail.desc}
          </div>
        )}
        
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{pengumumanDetail.content}</div>
      </section>
    </div>
  );
} 