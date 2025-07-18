import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const kontakInfo = [
  {
    icon: <FaMapMarkerAlt className="text-primary text-2xl" />, label: 'Alamat', value: 'Desa Sidomulyo, Kec. Jabung, Kabupaten Malang, Jawa Timur'
  },
  {
    icon: <FaEnvelope className="text-primary text-2xl" />, label: 'Email', value: 'sidomulyo@desa.id', href: 'mailto:sidomulyo@desa.id'
  },
  {
    icon: <FaWhatsapp className="text-green-500 text-2xl" />, label: 'WhatsApp', value: '0812-3456-7890', href: 'https://wa.me/6281234567890'
  },
  {
    icon: <FaInstagram className="text-pink-500 text-2xl" />, label: 'Instagram', value: '@sidomulyo.desa', href: 'https://instagram.com/sidomulyo.desa'
  },
  {
    icon: <FaFacebook className="text-blue-700 text-2xl" />, label: 'Facebook', value: 'Desa Sidomulyo', href: 'https://facebook.com/sidomulyo.desa'
  },
];

export default function AdminKontakPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-10">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[260px] md:min-h-[320px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Kontak Desa (Admin)</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Informasi alamat, kontak, dan peta lokasi Desa Sidomulyo untuk admin.</p>
        </div>
      </div>

      {/* Info Kontak */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Info Kontak</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {kontakInfo.map((item, idx) => (
            <a
              key={idx}
              href={item.href || undefined}
              target={item.href ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group border border-primary/10"
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition">
                  {item.icon}
                </span>
                <span className="font-semibold text-gray-700 text-lg">{item.label}</span>
              </div>
              <div className="ml-1 text-gray-600 text-base break-words">
                {item.value}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Peta Lokasi</h2>
        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
          <iframe
            title="Google Maps Desa Sidomulyo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15805.354933177488!2d112.76544949999999!3d-7.9639025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62fa878b73867%3A0x18da21b9d7e3c22d!2sSidomulyo%2C%20Kec.%20Jabung%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1752174662144!5m2!1sid!2sid"
            width="100%"
            height="350"
            style={{ border: 0, minHeight: 250 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
} 