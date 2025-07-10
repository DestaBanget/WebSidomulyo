import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const menu = [
  {
    label: 'Profil Desa',
    dropdown: [
      { label: 'Tentang', href: '/profil/tentang' },
      { label: 'Visi-Misi', href: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
      { label: 'Statistik', href: '/profil/statistik' },
    ],
  },
  {
    label: 'Lembaga Masyarakat',
    dropdown: [
      { label: 'BPD', href: '#' },
      { label: 'LPM', href: '#' },
      { label: 'PKK', href: '#' },
      { label: 'Karang Taruna', href: '#' },
    ],
  },
  {
    label: 'Publikasi',
    dropdown: [
      { label: 'Berita', href: '#' },
      { label: 'Pengumuman', href: '#' },
      { label: 'Agenda', href: '#' },
    ],
  },
  {
    label: 'Layanan',
    dropdown: [
      { label: 'Surat Online', href: '/layanan/surat-online' },
      { label: 'Pengaduan', href: '#' },
      { label: 'Panduan', href: '#' },
    ],
  },
  { label: 'Pariwisata', href: '#' },
  { label: 'Kontak', href: '#' },
];

function Logo({ scrolled }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img src="https://upload.wikimedia.org/wikipedia/id/7/7a/Manchester_United_FC_crest.svg" alt="Logo MU" className="w-10 h-10 object-contain drop-shadow-lg" />
      <span className="text-2xl font-extrabold tracking-widest uppercase" style={{ fontFamily: 'inherit' }}>Desa Sidomulyo</span>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  // Selalu anggap semua halaman sebagai heroBg
  const isHeroBg = true;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dropdown handler with delay
  const handleDropdownEnter = (idx) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownOpen(idx);
  };
  const handleDropdownLeave = () => {
    setDropdownTimeout(setTimeout(() => setDropdownOpen(null), 180));
  };

  // Animasi backdrop blur untuk mobile menu
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${mobileOpen
          ? 'bg-white text-primary shadow'
          : isHeroBg && !scrolled
            ? 'bg-transparent text-white shadow-none'
            : 'backdrop-blur-lg bg-white/90 shadow text-primary'
        }`
      }
      style={mobileOpen ? {} : (isHeroBg && !scrolled ? {} : {})}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Logo scrolled={scrolled} />
        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-2 xl:gap-4">
          {menu.map((item, idx) => (
            <div
              key={item.label}
              className={`relative group flex items-center h-16`}
              onMouseEnter={() => item.dropdown ? handleDropdownEnter(idx) : null}
              onMouseLeave={() => item.dropdown ? handleDropdownLeave() : null}
            >
              {item.dropdown ? (
                <>
                  <button
                    className={`font-semibold px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-primary/10 focus:outline-none transition-all duration-200 ${activeMenu === idx ? 'text-primary bg-primary/10' : ''}`}
                    onFocus={() => setActiveMenu(idx)}
                    onBlur={() => setActiveMenu(null)}
                  >
                    {item.label}
                    <FaChevronDown className="ml-1 text-xs" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white/95 shadow-2xl rounded-2xl py-3 transition-all duration-300 z-30
                      ${dropdownOpen === idx ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
                    `}
                    style={{transformOrigin: 'top'}}
                  >
                    {item.dropdown.map((d) => (
                      <a
                        key={d.label}
                        href={d.href}
                        className="block px-6 py-2 text-base text-gray-700 hover:bg-primary/10 hover:text-primary transition rounded-xl"
                      >
                        {d.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  className={`font-semibold px-4 py-2 rounded-xl flex items-center h-16 hover:bg-primary/10 hover:text-primary focus:outline-none transition-all duration-200 ${activeMenu === idx ? 'text-primary bg-primary/10' : ''}`}
                  onMouseEnter={() => handleDropdownEnter(idx)}
                  onMouseLeave={handleDropdownLeave}
                  onFocus={() => setActiveMenu(idx)}
                  onBlur={() => setActiveMenu(null)}
                  tabIndex={0}
                  onClick={() => window.location.href = item.href}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>
        {/* Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? (
            <FiX size={28} className="text-primary" />
          ) : (
            <FiMenu size={28} className={`${mobileOpen || scrolled ? 'text-primary' : 'text-white'}`} />
          )}
        </button>
      </div>
      {/* Mobile Menu + Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => setMobileOpen(false)} />
          <nav
            className="absolute top-0 right-0 w-72 max-w-full h-full bg-white text-primary shadow-2xl px-6 py-8 animate-slideInLeft flex flex-col gap-6 border-l border-gray-200"
            style={{ backgroundColor: '#fff' }}
          >
            <Logo scrolled={true} />
            <div className="flex flex-col gap-2 mt-6">
              {menu.map((item) => (
                <div key={item.label} className="mb-1">
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="font-semibold cursor-pointer py-2 flex items-center gap-2 hover:text-primary select-none">{item.label} <FaChevronDown className="text-xs group-open:rotate-180 transition-transform text-primary" /></summary>
                      <div className="pl-4 flex flex-col gap-1 mt-1">
                        {item.dropdown.map((d) => (
                          <a
                            key={d.label}
                            href={d.href}
                            className="block py-1 text-base text-primary hover:underline"
                          >
                            {d.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <a href={item.href} className="font-semibold block py-2 text-primary hover:underline">{item.label}</a>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 