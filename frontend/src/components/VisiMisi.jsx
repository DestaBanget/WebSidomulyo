import React from 'react';

export default function VisiMisi() {
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Visi & Misi Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Landasan dan tujuan pembangunan Desa Sidomulyo untuk masa depan yang lebih baik.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Visi</h2>
        <p className="mb-12" style={{ fontSize: '1.2em', fontFamily: 'inherit' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Misi</h2>
        <ul className="space-y-8 text-xl" style={{ fontFamily: 'inherit' }}>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Etiam euismod, urna eu tincidunt consectetur.</li>
          <li>Nisi nisl aliquam nunc, eget aliquam nisl nunc euismod nunc.</li>
        </ul>
      </div>
    </div>
  );
} 