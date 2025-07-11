import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pariwisata({ showAll = false, isAdmin = false, data: dataProp }) {
  const [wisata, setWisata] = useState(dataProp || []);
  useEffect(() => {
    if (!dataProp) {
      fetch('/api/pariwisata')
        .then(res => {
          if (!res.ok) throw new Error('Gagal memuat data');
          return res.json();
        })
        .then(data => setWisata(data))
        .catch(() => setWisata([]));
    }
  }, [dataProp]);

  const handleDelete = (id) => {
    // TODO: Integrasi backend delete
    if (window.confirm('Yakin ingin menghapus pariwisata ini?')) {
      setWisata(wisata.filter(w => w.id !== id));
      // fetch(`/api/pariwisata/${id}`, { method: 'DELETE' }) ...
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-10 text-center tracking-tight drop-shadow-lg">Pariwisata Desa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {(showAll ? wisata : wisata.slice(0, 6)).map((w) => (
          <div key={w.id} className="relative rounded-3xl overflow-hidden shadow-xl group h-56 md:h-64 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)'}}>
            <Link to={`/pariwisata/${w.id}`} className="absolute inset-0 z-10" />
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
            {isAdmin && (
              <div className="absolute top-2 right-2 z-20 flex gap-2">
                <button onClick={() => alert('Edit coming soon')} className="bg-yellow-400 text-white px-3 py-1 rounded shadow hover:bg-yellow-500">Edit</button>
                <button onClick={() => handleDelete(w.id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">Delete</button>
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-inner group-hover:shadow-primary/10 transition-all duration-500" />
          </div>
        ))}
      </div>
      {!showAll && (
        <div className="flex justify-center mt-10">
          <a href="/pariwisata" className="inline-block px-7 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition text-lg">Lihat Pariwisata</a>
        </div>
      )}
    </section>
  );
} 