import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import images from '../config/images';
import Hero from '../components/Hero';

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
      <Hero
        title="Surat Masuk"
        description="Daftar pengajuan surat dari warga yang masuk ke sistem. Admin dapat memantau, memproses, dan mengubah status surat di sini."
        image={images.layanan.surat}
        gradient="from-primary/80 to-primary/60"
        minHeight="300px"
        borderRadius="0 0 2.5rem 2.5rem"
      />
      
      {/* Search & Table */}
      <div className="w-full flex justify-center pb-16">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <h3 className="text-xl md:text-2xl font-bold text-primary">Daftar Surat Masuk</h3>
            <div className="w-full md:w-auto flex justify-end">
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Cari nama/NIK/jenis surat..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
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