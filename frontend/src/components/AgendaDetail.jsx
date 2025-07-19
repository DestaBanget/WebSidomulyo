import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function AgendaDetail() {
  const { id } = useParams();
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching agenda with ID:', id);
        
        const response = await fetch(`${API_BASE_URL}/agenda/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Agenda tidak ditemukan');
          }
          throw new Error('Gagal memuat data agenda');
        }
        
        const data = await response.json();
        console.log('Agenda data received:', data);
        
        setAgenda(data.agenda);
      } catch (err) {
        console.error('Error fetching agenda:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgenda();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat agenda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!agenda) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Agenda yang Anda cari tidak ditemukan atau telah dihapus.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section dengan Background Foto */}
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden" style={{
        background: `url('/surat.jpg') center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Agenda</h1>
          <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow text-center max-w-2xl">
            Detail kegiatan dan acara penting desa Sidomulyo
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="text-white p-8" style={{
            background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)'
          }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block mb-3 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                  Agenda Desa
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {agenda.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(agenda.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                    {agenda.status}
                  </span>
                  {agenda.created_by_name && (
                    <span className="text-blue-100 text-sm">
                      Dibuat oleh: {agenda.created_by_name}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Quick Info */}
              <div className="bg-white/20 rounded-xl p-4 min-w-[150px] text-center">
                <div className="text-xl font-bold mb-1">{formatDate(agenda.tanggal).split(' ')[0]}</div>
                <div className="text-blue-100 text-sm">{formatDate(agenda.tanggal).split(' ').slice(1).join(' ')}</div>
                <div className="text-lg font-semibold mt-1">{formatTime(agenda.waktu)}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Tanggal</h3>
                </div>
                <p className="text-gray-700">{formatDate(agenda.tanggal)}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Waktu</h3>
                </div>
                <p className="text-gray-700">{formatTime(agenda.waktu)} WIB</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Lokasi</h3>
                </div>
                <p className="text-gray-700">{agenda.lokasi}</p>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="font-bold text-gray-800 text-lg">Deskripsi Kegiatan</h3>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {agenda.deskripsi}
                </div>
              </div>
            </div>

            {/* Gambar */}
            {agenda.img && (
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-bold text-gray-800 text-lg">Gambar Kegiatan</h3>
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={agenda.img}
                      alt={agenda.title}
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-500 text-sm">
                  <span className="font-medium">Dipublikasikan pada:</span> {formatDate(agenda.created_at || agenda.tanggal)}
                </div>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke Agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 