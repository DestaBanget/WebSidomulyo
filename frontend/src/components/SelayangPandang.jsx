import React from 'react';

export default function SelayangPandang() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-20 animate-fadeInUp">
      {/* Foto Kepala Desa overlap ke card */}
      <div className="relative flex-shrink-0 animate-fadeInLeft">
        <div className="absolute -top-6 -left-6 w-56 h-56 md:w-80 md:h-80 rounded-3xl bg-primary/10 blur-2xl z-0" />
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Kepala Desa"
          className="w-52 h-52 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl border-4 border-primary relative z-10 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500"
        />
      </div>
      {/* Card Glassmorphism */}
      <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-14 animate-fadeInRight">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-5 tracking-tight drop-shadow-lg">Selayang Pandang</h2>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
          Assalamu'alaikum Warahmatullahi Wabarakatuh.<br /><br />
          Selamat datang di website resmi Desa Sidomulyo. Kami berkomitmen untuk memberikan pelayanan terbaik, transparansi informasi, dan kemudahan akses bagi seluruh warga. Semoga website ini bermanfaat dan menjadi jembatan komunikasi antara pemerintah desa dan masyarakat.
        </p>
        <div className="mt-8 flex flex-col items-start">
          <span className="font-bold text-primary text-xl">Aghis Pratama, S.Pd</span>
          <span className="text-gray-500 text-base italic">Kepala Desa Sidomulyo</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Signature_placeholder.svg"
            alt="Tanda Tangan"
            className="w-36 mt-3 opacity-70"
          />
        </div>
      </div>
    </section>
  );
} 