import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAgenda } from '../contexts/AgendaContext';
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

export default function AgendaPage() {
  const { isAdmin } = useAuth();
  const { agenda, loading, deleteAgenda } = useAgenda();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const navigate = useNavigate();

  if (loading) return (
    <div className="text-center text-gray-400 text-lg py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      Memuat agenda...
    </div>
  );

  const filtered = agenda.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      a.lokasi.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'Semua' || a.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Hitung jumlah agenda per status
  const statusCounts = {
    'Semua': agenda.length,
    'Akan Datang': agenda.filter(a => a.status === 'Akan Datang').length,
    'Sedang Berlangsung': agenda.filter(a => a.status === 'Sedang Berlangsung').length,
    'Selesai': agenda.filter(a => a.status === 'Selesai').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Akan Datang':
        return 'bg-blue-500 text-white';
      case 'Sedang Berlangsung':
        return 'bg-yellow-500 text-white';
      case 'Selesai':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await deleteAgenda(id);
    } catch (err) {
      setDeleteError(err.message || 'Gagal menghapus agenda');
    }
    setDeletingId(null);
    setConfirmId(null);
  };

  const heroImg = images.publikasi.agenda;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Konfirmasi Modal */}
      <ConfirmModal
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => handleDelete(confirmId)}
        title="Konfirmasi Hapus"
        message="Yakin ingin menghapus agenda ini? Tindakan ini tidak dapat dibatalkan."
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Agenda</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Jadwal kegiatan dan agenda penting desa Sidomulyo.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-14">
        {/* Tombol Tambah Agenda - Centered */}
        <div className="flex justify-center mb-8">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin/agenda/tambah')}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Agenda
            </button>
          )}
        </div>

        {/* Agenda List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                to={`/publikasi/agenda/${item.id}`}
                className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/20 relative h-full min-h-[500px]"
                style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)'}}
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-95 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Status Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 flex flex-col p-8">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4 line-clamp-2 min-h-[2.6em] tracking-tight drop-shadow-sm">{item.title}</h3>
                  
                  {/* Info Section */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-base font-medium">{formatDate(item.tanggal)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-base font-medium">{item.waktu} WIB</span>
                    </div>
                    
                    <div className="flex items-start text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-base font-medium line-clamp-2">{item.lokasi}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-base leading-relaxed line-clamp-4 min-h-[5.6em]">{item.deskripsi}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-inner group-hover:shadow-primary/10 transition-all duration-500" />
              </Link>
              {isAdmin && (
                <button
                  className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs rounded shadow hover:bg-red-700 transition z-20"
                  onClick={() => setConfirmId(item.id)}
                  disabled={deletingId === item.id}
                  title="Hapus agenda"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              {search ? 'Tidak ada agenda yang ditemukan' : 'Belum ada agenda yang tersedia'}
            </div>
            <p className="text-gray-500">
              {search ? 'Coba ubah kata kunci pencarian Anda' : 'Silakan cek kembali nanti atau hubungi admin untuk menambahkan agenda'}
            </p>
          </div>
        )}
        
        {!loading && filtered.length === agenda.length && (
          <div className="text-center text-gray-400 mt-12">Hasil akhir dari agenda</div>
        )}
      </div>
    </div>
  );
} 