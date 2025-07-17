import React from 'react';
import { FaGlobe, FaBookOpen, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const menuFooter = [
  {
    title: 'Profil Desa',
    links: ['Tentang', 'Visi-Misi', 'Struktur Organisasi', 'Statistik'],
  },
  {
    title: 'Lembaga',
    links: [
      'BPD',
      'LPM',
      'PKK',
      'KARANG TARUNA',
      'LINMAS',
      'BHABINKAMTIBMAS',
      'BABINSA',
      'KOPERASI WANITA',
      'DHARMA WANITA',
      'POSKESDES',
      'KELOMPOK TANI',
    ],
  },
  {
    title: 'Publikasi',
    links: [
      { label: 'Berita', href: '/publikasi/berita' },
      { label: 'Pengumuman', href: '/publikasi/pengumuman' },
      { label: 'Agenda', href: '/publikasi/agenda' },
    ],
  },
  {
    title: 'Layanan',
    links: ['Surat Online', 'Pengaduan', 'Panduan'],
  },
  {
    title: 'Lainnya',
    links: ['Pariwisata', 'Kontak'],
  },
];

const social = [
  { icon: <FaGlobe />, href: '#' },
  { icon: <FaBookOpen />, href: '#' },
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
  { icon: <FaEnvelope />, href: 'mailto:info@sidomulyo.desa.id' },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white pt-28 pb-12 mt-28 overflow-hidden">
      {/* Hapus SVG wave di atas footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-20">
        {/* Logo dan Info */}
        <div className="flex flex-col items-center md:items-start gap-7">
          <div className="flex items-center gap-4 mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/id/7/7a/Manchester_United_FC_crest.svg" alt="Logo MU" className="w-14 h-14 object-contain drop-shadow-lg" />
            <span className="text-2xl font-extrabold tracking-widest uppercase" style={{ fontFamily: 'inherit' }}>Desa Sidomulyo</span>
          </div>
          <div className="text-2xl font-bold">Desa Sidomulyo</div>
          <div className="text-white/80 text-base">Jl. Raya Sidomulyo No. 1, Kec. Contoh, Kab. Contoh, Jawa Timur</div>
          <div className="text-white/80 text-base">Telp: (0351) 123456 | Email: info@sidomulyo.desa.id</div>
        </div>
        {/* Menu Footer */}
        <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {menuFooter.map((m) => (
            <div key={m.title}>
              <div className="font-semibold mb-3 text-white/90 text-lg">{m.title}</div>
              <ul className="space-y-2">
                {Array.isArray(m.links) ? m.links.map((l) => (
                  <li key={l.label || l}>
                    <a href={l.href || '#'} className="text-white/80 hover:text-white underline-offset-2 hover:underline transition text-base">{l.label || l}</a>
                  </li>
                )) : m.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/80 hover:text-white underline-offset-2 hover:underline transition text-base">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Divider halus */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 mt-16 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/80 text-base">&copy; 2025 Desa Sidomulyo. All rights reserved.<br/>
          <span className="text-white/60 text-sm">Dibuat oleh MMD Fakultas Ilmu Komputer (FILKOM) Kelompok 31 Universitas Brawijaya</span>
        </div>
        <div className="flex gap-5">
          {social.map((s, i) => (
            <a key={i} href={s.href} className="text-2xl hover:scale-110 transition-transform hover:text-white/80" target="_blank" rel="noopener noreferrer">{s.icon}</a>
          ))}
        </div>
      </div>
    </footer>
  );
} 