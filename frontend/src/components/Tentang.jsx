import React from 'react';

export default function Tentang() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Tentang Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Website ini memberikan informasi lengkap tentang Desa Sidomulyo, sejarah, potensi, dan kehidupan masyarakatnya. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-4 px-4">
        <p className="text-lg text-gray-700 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, urna erat dictum erat, at cursus enim erat nec enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </div>
    </div>
  );
} 