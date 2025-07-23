import React, { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { apiCall } from '../config/api';
import images from '../config/images';

export default function AdminKontakPage() {
  const [kontak, setKontak] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ alamat: '', email: '', whatsapp: '', instagram: '', facebook: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch kontak desa
  useEffect(() => {
    const fetchKontak = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiCall('/pesan-kontak/kontak-desa');
        setKontak(res.kontak);
        setForm({
          alamat: res.kontak.alamat || '',
          email: res.kontak.email || '',
          whatsapp: res.kontak.whatsapp || '',
          instagram: res.kontak.instagram || '',
          facebook: res.kontak.facebook || '',
        });
      } catch (err) {
        setError(err.message || 'Gagal mengambil data kontak');
      } finally {
        setLoading(false);
      }
    };
    fetchKontak();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      alamat: kontak.alamat || '',
      email: kontak.email || '',
      whatsapp: kontak.whatsapp || '',
      instagram: kontak.instagram || '',
      facebook: kontak.facebook || '',
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await apiCall('/pesan-kontak/kontak-desa', {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setSuccess('Kontak desa berhasil diperbarui');
      setKontak({ ...form });
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const kontakInfo = [
    {
      icon: <FaMapMarkerAlt className="text-primary text-2xl" />, label: 'Alamat', value: kontak?.alamat, href: undefined
    },
    {
      icon: <FaEnvelope className="text-primary text-2xl" />, label: 'Email', value: kontak?.email, href: kontak?.email ? `mailto:${kontak.email}` : undefined
    },
    {
      icon: <FaWhatsapp className="text-green-500 text-2xl" />, label: 'WhatsApp', value: kontak?.whatsapp, href: kontak?.whatsapp ? `https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '')}` : undefined
    },
    {
      icon: <FaInstagram className="text-pink-500 text-2xl" />, label: 'Instagram', value: kontak?.instagram, href: kontak?.instagram ? `https://instagram.com/${kontak.instagram.replace('@','')}` : undefined
    },
    {
      icon: <FaFacebook className="text-blue-700 text-2xl" />, label: 'Facebook', value: kontak?.facebook, href: kontak?.facebook ? `https://facebook.com/${encodeURIComponent(kontak.facebook)}` : undefined
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-10">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[260px] md:min-h-[320px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.kontak}')`,
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Info Kontak</h2>
          {!editMode && !loading && (
            <button onClick={handleEdit} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition font-semibold"><FaEdit /> Edit</button>
          )}
        </div>
        {error && <div className="text-red-600 mb-3 font-semibold text-center">{error}</div>}
        {success && <div className="text-green-600 mb-3 font-semibold text-center">{success}</div>}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Memuat data kontak...</div>
        ) : editMode ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto flex flex-col gap-5 border border-primary/10">
            <div>
              <label className="block mb-1 font-semibold">Alamat</label>
              <input name="alamat" value={form.alamat} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">WhatsApp</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Instagram</label>
              <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Facebook</label>
              <input name="facebook" value={form.facebook} onChange={handleChange} className="w-full px-4 py-2 border-2 border-primary bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-600" />
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button type="button" onClick={handleCancel} className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"><FaTimes /> Batal</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold disabled:opacity-60"><FaSave /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
            </div>
          </form>
        ) : (
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
                  {item.value || <span className="italic text-gray-400">-</span>}
                </div>
              </a>
            ))}
          </div>
        )}
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