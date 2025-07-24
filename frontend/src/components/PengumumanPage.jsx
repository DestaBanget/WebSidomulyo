import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePengumuman } from '../contexts/PengumumanContext';
import images from '../config/images';

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

export default function PengumumanPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pengumuman, loading, error, deletePengumuman } = usePengumuman();
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const heroImg = images.publikasi.pengumuman;

  const filtered = pengumuman.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    (b.desc && b.desc.toLowerCase().includes(search.toLowerCase())) ||
    (b.content && b.content.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    setDeleteError(null);
    const res = await deletePengumuman(id);
    setDeletingId(null);
    setConfirmId(null);
    if (!res.success) {
      setDeleteError(res.error || 'Gagal menghapus pengumuman');
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
        message="Yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan."
        loading={deletingId === confirmId}
      />
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${heroImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Pengumuman</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Informasi penting dan pengumuman resmi dari pemerintah desa.</p>
          <input
            type="text"
            placeholder="Cari pengumuman..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-full border-2 border-white/80 focus:border-primary outline-none text-lg bg-white/90 placeholder-gray-400 shadow"
          />
        </div>
      </div>
      {/* Tombol Tambah Pengumuman untuk Admin */}
      {isAdmin && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-primary text-white rounded font-semibold shadow hover:bg-primary/90 transition" onClick={() => navigate('/admin/tambah-pengumuman')}>Tambah Pengumuman</button>
        </div>
      )}
      {/* Error message for delete */}
      {deleteError && (
        <div className="text-center text-red-600 mt-4">{deleteError}</div>
      )}
      {/* Grid Cards */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 mt-10">
        {loading ? (
          <div className="text-center text-gray-400 text-lg py-20">Memuat data...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada pengumuman ditemukan.</div>
            )}
            {filtered.map(b => (
              <div key={b.id} className="relative group">
                <Link to={`/publikasi/pengumuman/${b.id}`} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20 relative">
                  <div className="relative h-52 overflow-hidden">
                    <img src={b.img || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 flex flex-col p-7">
                    <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-2 line-clamp-2 min-h-[2.6em] tracking-tight drop-shadow-sm">{b.title}</h3>
                    <p className="text-gray-500 text-base mb-4 line-clamp-3 min-h-[4.2em]">{b.desc || b.content?.substring(0, 150) + '...'}</p>
                    <span className="text-gray-400 text-sm mt-auto font-medium">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </Link>
                {isAdmin && (
                  <button
                    className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs rounded shadow hover:bg-red-700 transition z-20"
                    onClick={() => setConfirmId(b.id)}
                    disabled={deletingId === b.id}
                    title="Hapus pengumuman"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === pengumuman.length && (
          <div className="text-center text-gray-400 mt-12">Hasil akhir dari pengumuman</div>
        )}
      </div>
    </div>
  );
} 