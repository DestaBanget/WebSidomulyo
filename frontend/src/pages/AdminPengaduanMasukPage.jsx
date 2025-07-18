import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';

export default function AdminPengaduanMasukPage() {
  const [pengaduan, setPengaduan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { apiCall } = useAuth();

  useEffect(() => {
    fetchPengaduan();
  }, []);

  const fetchPengaduan = async () => {
    try {
      setLoading(true);
      setError('');
      // Ganti ke apiCall helper dan endpoint '/pengaduan'
      const data = await apiCall('/pengaduan');
      setPengaduan(data.pengaduan || []);
    } catch (error) {
      setError(error.message);
      setPengaduan([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = pengaduan.filter(p =>
    p.nama?.toLowerCase().includes(search.toLowerCase()) ||
    p.nik?.toLowerCase().includes(search.toLowerCase()) ||
    p.judul?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pengaduan...</p>
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
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Pengaduan Masuk</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Daftar pengaduan masyarakat yang masuk ke sistem. Admin dapat memantau dan menindaklanjuti pengaduan di sini.</p>
        </div>
      </div>
      {/* Search & Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-[-60px] relative z-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-xl font-bold text-primary">Daftar Pengaduan Masuk</div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama/NIK/judul..."
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
                <th className="px-4 py-2">Nama Pelapor</th>
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">No. HP</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">
                  {search ? 'Tidak ada pengaduan ditemukan untuk pencarian ini.' : 'Belum ada pengaduan masuk.'}
                </td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{p.id}</td>
                  <td className="px-4 py-2 font-semibold">{p.nama}</td>
                  <td className="px-4 py-2 text-center">{p.nik}</td>
                  <td className="px-4 py-2">{p.judul}</td>
                  <td className="px-4 py-2 text-center">{new Date(p.tanggal_pengaduan).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-2 text-center">{p.no_hp}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                      p.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center flex flex-col gap-2 md:flex-row md:gap-2">
                    <button
                      className="px-3 py-1 rounded bg-primary text-white text-xs font-bold hover:bg-blue-800 transition"
                      onClick={() => navigate(`/admin/pengaduan-masuk/${p.id}`)}
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 