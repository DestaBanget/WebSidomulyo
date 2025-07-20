import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBerita } from '../contexts/BeritaContext';
import { useAuth } from '../contexts/AuthContext';

function ConfirmModal({ open, onClose, onConfirm, title, message, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
        <div className="text-xl font-bold mb-2 text-gray-800">{title}</div>
        <div className="text-gray-600 mb-6">{message}</div>
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
          <button
            className="px-5 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BeritaPage() {
  const { berita, loading, deleteBerita } = useBerita();
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const heroImg = '/surat.jpg';
  const navigate = useNavigate();

  if (loading) return <div className="text-center text-gray-400 text-lg py-20">Memuat data...</div>;

  const filtered = berita.filter(b =>
    (b.title?.toLowerCase().includes(search.toLowerCase()) ||
     b.desc?.toLowerCase().includes(search.toLowerCase()) ||
     b.kategori?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    setDeleteError(null);
    const res = await deleteBerita(id);
    setDeletingId(null);
    setConfirmId(null);
    if (!res.success) {
      setDeleteError(res.error || 'Gagal menghapus berita');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Konfirmasi Modal */}
      <ConfirmModal
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
        title="Konfirmasi Hapus"
        message="Yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
        loading={deletingId === confirmId}
      />
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Berita</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow">Dapatkan berita terkini seputar kehidupan dan perkembangan desa kami.</p>
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-full border-2 border-white/80 focus:border-primary outline-none text-lg bg-white/90 placeholder-gray-400 shadow"
          />
        </div>
      </div>
      {/* Tombol Tambah Berita untuk Admin */}
      {isAdmin && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-primary text-white rounded font-semibold shadow hover:bg-primary/90 transition" onClick={() => navigate('/admin/tambah-berita')}>Tambah Berita</button>
        </div>
      )}
      {/* Error message for delete */}
      {deleteError && (
        <div className="text-center text-red-600 mt-4">{deleteError}</div>
      )}
      {/* Grid Cards */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-10">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada berita ditemukan.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(b => (
            <div key={b.id} className="relative group">
              <Link to={`/publikasi/berita/${b.id}`} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20">
                <div className="relative h-52 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col p-7">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-2 min-h-[2.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
                  <p className="text-gray-500 text-base mb-4 line-clamp-3 min-h-[4.2em]">{b.desc}</p>
                  <span className="text-gray-400 text-sm mt-auto font-medium">{new Date(b.tanggal || b.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </Link>
              {isAdmin && (
                <button
                  className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs rounded shadow hover:bg-red-700 transition z-20"
                  onClick={() => setConfirmId(b.id)}
                  disabled={deletingId === b.id}
                  title="Hapus berita"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>
        {filtered.length === berita.length && (
          <div className="text-center text-gray-400 mt-12">Hasil akhir dari berita</div>
        )}
      </div>
    </div>
  );
} 