import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaAmbulance, FaUserShield } from 'react-icons/fa';

const actions = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6281234567890',
    icon: <FaWhatsapp size={22} />,
  },
  {
    label: 'Ambulance',
    href: 'tel:119',
    icon: <FaAmbulance size={22} />,
  },
  {
    label: 'Babinsa',
    href: 'https://wa.me/6281111111111',
    icon: <FaUserShield size={22} />,
  },
];

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-fadeInDown">
      {/* Expandable actions */}
      {open && (
        <div className="flex flex-col mb-2 gap-3 animate-fadeInDown">
          {actions.map((a, i) => (
            <a
              key={a.label}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full shadow-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 relative overflow-hidden group"
              style={{animationDelay: `${i * 60}ms`}}
              onClick={e => {
                const ripple = document.createElement('span');
                ripple.className = 'absolute left-1/2 top-1/2 w-0 h-0 bg-white/30 rounded-full pointer-events-none animate-ripple';
                e.currentTarget.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
              }}
            >
              {a.icon}
              <span className="hidden md:inline">{a.label}</span>
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center text-white text-3xl transition-all duration-300 relative overflow-hidden ${open ? 'rotate-45' : ''}`}
        aria-label="Aksi Cepat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        {/* Ripple effect */}
      </button>
      <style>{`
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 200%; height: 200%; opacity: 0; left: -50%; top: -50%; }
        }
      `}</style>
    </div>
  );
} 