import React from 'react';

const struktur = [
  { nama: 'Agus', jabatan: 'Kepala Desa', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Budi', jabatan: 'Sekretaris Desa', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Caca', jabatan: 'Kepala Urusan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Dewi', jabatan: 'Kepala Urusan Keuangan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Eka', jabatan: 'Kepala Urusan Perencanaan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Fajar', jabatan: 'Kepala Seksi Pemerintahan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Gita', jabatan: 'Kepala Seksi Pelayanan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
  { nama: 'Hana', jabatan: 'Kepala Seksi Kesejahteraan', foto: 'https://i.ibb.co/3r1n6kF/siluet.png' },
];

export default function StrukturOrganisasi() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Struktur Organisasi Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Susunan perangkat desa dan staf yang menjalankan pemerintahan Desa Sidomulyo.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {struktur.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={item.foto} alt={item.nama} className="w-36 h-44 object-cover rounded-xl mb-3 bg-gray-100 border" />
              <div className="font-bold text-base text-center leading-tight">{item.nama}</div>
              <div className="font-semibold text-gray-600 text-center text-sm leading-tight">{item.jabatan}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 