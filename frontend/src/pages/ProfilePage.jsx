import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  if (!user) {
    return <div className="p-8 text-center">Anda belum login.</div>;
  }

  // Validasi sederhana
  const validate = () => {
    if (!form.fullName || !form.username || !form.email) {
      setError('Nama lengkap, username, dan email wajib diisi!');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Format email tidak valid!');
      return false;
    }
    return true;
  };

  // Simpan perubahan ke localStorage
  const handleSave = () => {
    if (!validate()) return;
    const updatedUser = { ...user, ...form };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess('Profil berhasil diperbarui!');
    setError('');
    setEditMode(false);
    window.location.reload(); // reload agar context ikut update (karena stateless)
  };

  // Hapus akun
  const handleDelete = () => {
    localStorage.removeItem('user');
    setShowDelete(false);
    logout();
  };

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
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Profil Saya</h1>
        </div>
      </div>
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">Data Akun</h2>
        {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}
        {error && <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>}
        {!editMode ? (
          <>
            <div className="mb-4">
              <div className="font-semibold">Nama Lengkap:</div>
              <div>{user.fullName || '-'}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Username:</div>
              <div>{user.username || '-'}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Email:</div>
              <div>{user.email || '-'}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Nomor Telepon:</div>
              <div>{user.phone || '-'}</div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-primary text-white rounded font-semibold hover:bg-blue-700 transition"
              >
                Edit Profil
              </button>
              <button
                onClick={() => setShowDelete(true)}
                className="px-6 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition"
              >
                Hapus Akun
              </button>
              <button
                onClick={logout}
                className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); handleSave(); }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={form.fullName}
                onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Nomor Telepon</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded font-semibold hover:bg-blue-700 transition"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => { setEditMode(false); setError(''); setSuccess(''); setForm({ fullName: user.fullName, username: user.username, email: user.email, phone: user.phone }); }}
                className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
              >
                Batal
              </button>
            </div>
          </form>
        )}
        {/* Modal konfirmasi hapus akun */}
        {showDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
              <h3 className="text-xl font-bold mb-4">Konfirmasi Hapus Akun</h3>
              <p className="mb-6">Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition"
                >
                  Ya, Hapus
                </button>
                <button
                  onClick={() => setShowDelete(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 