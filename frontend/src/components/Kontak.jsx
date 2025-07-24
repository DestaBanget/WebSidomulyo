import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { apiCall } from '../config/api';
import images from '../config/images';

function TooltipIcon({ href, icon, tooltip, disabled }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <a
        href={disabled ? '#' : href}
        className={`text-primary text-2xl hover:text-primary/80 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        aria-disabled={disabled}
      >
        {icon}
      </a>
      {show && tooltip && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-9 bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-lg z-20 whitespace-nowrap">
          {tooltip}
        </span>
      )}
    </span>
  );
}

export default function Kontak() {
  const [data, setData] = useState({ nama: '', email: '', noHp: '', pesan: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [kontak, setKontak] = useState(null);
  const [kontakLoading, setKontakLoading] = useState(true);
  const [kontakError, setKontakError] = useState('');

  useEffect(() => {
    const fetchKontak = async () => {
      setKontakLoading(true);
      setKontakError('');
      try {
        const res = await apiCall('/pesan-kontak/kontak-desa');
        setKontak(res.kontak);
      } catch (err) {
        setKontakError('Gagal memuat info kontak');
      } finally {
        setKontakLoading(false);
      }
    };
    fetchKontak();
  }, []);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await apiCall('/pesan-kontak', {
        method: 'POST',
        body: JSON.stringify({
          nama: data.nama,
          email: data.email,
          no_hp: data.noHp,
          pesan: data.pesan
        })
      });
      setSuccess('Pesan berhasil dikirim!');
      setData({ nama: '', email: '', noHp: '', pesan: '' });
    } catch (err) {
      setError(err.message || 'Gagal mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  const heroImg = images.kontak;

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[500px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${heroImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Kontak</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Hubungi kami untuk mendapatkan informasi lebih lanjut tentang desa kami. Dengan senang hati, kami siap membantu Anda merencanakan kunjungan atau menjawab pertanyaan Anda.</p>
        </div>
      </div>

      {/* Alamat dan Kontak */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="font-bold text-primary mb-2">ALAMAT DAN KONTAK</div>
          <div className="mb-2 text-gray-700">Desa Sidomulyo, Kec. Jabung, Kabupaten Malang, Jawa Timur</div>
          <div className="flex gap-3 mt-4">
            <TooltipIcon
              href={kontak?.instagram ? `https://instagram.com/${kontak.instagram.replace('@','')}` : '#'}
              icon={<FaInstagram />}
              tooltip={kontak?.instagram ? `Instagram: ${kontak.instagram}` : undefined}
              disabled={!kontak?.instagram}
            />
            <TooltipIcon
              href={kontak?.facebook ? `https://facebook.com/${encodeURIComponent(kontak.facebook)}` : '#'}
              icon={<FaFacebook />}
              tooltip={kontak?.facebook ? `Facebook: ${kontak.facebook}` : undefined}
              disabled={!kontak?.facebook}
            />
            <TooltipIcon
              href={kontak?.whatsapp ? `https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '')}` : '#'}
              icon={<FaWhatsapp />}
              tooltip={kontak?.whatsapp ? `WhatsApp: ${kontak.whatsapp}` : undefined}
              disabled={!kontak?.whatsapp}
            />
            <TooltipIcon
              href={kontak?.email ? `mailto:${kontak.email}` : '#'}
              icon={<FaEnvelope />}
              tooltip={kontak?.email ? `Email: ${kontak.email}` : undefined}
              disabled={!kontak?.email}
            />
          </div>
        </div>
        <div>
          <iframe
            title="Google Maps Desa Sidomulyo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15805.354933177488!2d112.76544949999999!3d-7.9639025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62fa878b73867%3A0x18da21b9d7e3c22d!2sSidomulyo%2C%20Kec.%20Jabung%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1752174662144!5m2!1sid!2sid"
            width="100%"
            height="320"
            style={{ border: '2px solid #1e40af', borderRadius: '18px', boxShadow: '0 4px 24px 0 rgba(30,64,175,0.10)', maxWidth: '100%' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Form Pesan/Masukan */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center font-bold text-primary mb-2">PESAN ATAU MASUKAN</div>
        <div className="text-center text-gray-700 mb-6">Sampaikan pesan ataupun masukan anda pada formulir di bawah ini. Alamat email dan kontak anda tidak akan dipublikasikan.</div>
        {success && <div className="text-green-600 text-center mb-2 font-semibold">{success}</div>}
        {error && <div className="text-red-600 text-center mb-2 font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Nama lengkap <span className="text-red-500">*</span></label>
            <input name="nama" value={data.nama} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-2" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Email <span className="text-red-500">*</span></label>
            <input name="email" value={data.email} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-2" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Nomor ponsel <span className="text-red-500">*</span></label>
            <input name="noHp" value={data.noHp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-2" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Pesan atau masukan</label>
            <textarea name="pesan" value={data.pesan} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 mb-2" />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim'}</button>
        </form>
      </section>
    </div>
  );
} 