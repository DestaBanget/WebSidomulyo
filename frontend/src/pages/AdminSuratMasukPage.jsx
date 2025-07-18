import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';

export default function AdminSuratMasukPage() {
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const navigate = useNavigate();
  const { apiCall } = useAuth();

  useEffect(() => {
    fetchSurat();
  }, []);

  const fetchSurat = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/surat`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data surat');
      }

      const data = await response.json();
      setSurat(data.surat || []);
    } catch (error) {
      console.error('Error fetching surat:', error);
      setError(error.message);
      setSurat([]);
    } finally {
      setLoading(false);
    }
  };

  const updateSuratStatus = async (suratId, newStatus) => {
    try {
      setUpdatingStatus(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/surat/${suratId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengupdate status surat');
      }

      // Update local state
      setSurat(surat.map(s => s.id === suratId ? { ...s, status: newStatus } : s));
      setShowStatusModal(false);
      setSelectedSurat(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filtered = surat.filter(s =>
    s.nama?.toLowerCase().includes(search.toLowerCase()) ||
    s.nik?.toLowerCase().includes(search.toLowerCase()) ||
    s.jenis_surat?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data surat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[300px] md:min-h-[400px]" style={{
        backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Surat Masuk</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Daftar pengajuan surat dari warga yang masuk ke sistem. Admin dapat memantau, memproses, dan mengubah status surat di sini.</p>
        </div>
      </div>
      
      {/* Search & Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-[-60px] relative z-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-xl font-bold text-primary">Daftar Surat Masuk</div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama/NIK/jenis surat..."
            className="w-full md:w-72 px-4 py-2 rounded-full border-2 border-primary/30 focus:border-primary outline-none text-base bg-white placeholder-gray-400 shadow"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full border text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama Pemohon</th>
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">Jenis Surat</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">No. HP</th>
                <th className="px-4 py-2">Alamat</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-8 text-gray-400">
                  {search ? 'Tidak ada surat ditemukan untuk pencarian ini.' : 'Belum ada surat masuk.'}
                </td></tr>
              ) : filtered.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{s.id}</td>
                  <td className="px-4 py-2 font-semibold">{s.nama}</td>
                  <td className="px-4 py-2 text-center">{s.nik}</td>
                  <td className="px-4 py-2">{s.jenis_surat}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(s.tanggal_pengajuan).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-2 text-center">{s.no_hp}</td>
                  <td className="px-4 py-2">{s.alamat_ktp}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      s.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                      s.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center flex flex-col gap-2 md:flex-row md:gap-2">
                    <button
                      className="px-3 py-1 rounded bg-primary text-white text-xs font-bold hover:bg-blue-800 transition"
                      onClick={() => navigate(`/admin/surat-masuk/${s.id}`)}
                    >
                      Lihat Detail
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition"
                      onClick={() => { setSelectedSurat(s); setShowStatusModal(true); }}
                    >
                      Ubah Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal Ubah Status */}
      {showStatusModal && selectedSurat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Ubah Status Surat</h3>
            <div className="mb-4">Pilih status baru untuk surat dari <span className="font-semibold">{selectedSurat.nama}</span>:</div>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
              value={selectedSurat.status}
              onChange={e => setSelectedSurat({ ...selectedSurat, status: e.target.value })}
              disabled={updatingStatus}
            >
              <option value="Menunggu">Menunggu</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => updateSuratStatus(selectedSurat.id, selectedSurat.status)}
                className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
                disabled={updatingStatus}
              >
                {updatingStatus ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
                disabled={updatingStatus}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 