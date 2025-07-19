import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PengaduanDetail() {
  const { id } = useParams();
  const { apiCall } = useAuth();
  const [pengaduan, setPengaduan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiCall(`/pengaduan/${id}`);
        setPengaduan(data.pengaduan);
      } catch (err) {
        setError(err.message || 'Gagal memuat detail pengaduan');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, apiCall]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Memuat detail pengaduan...</div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  if (!pengaduan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Data pengaduan tidak ditemukan.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Banner */}
      <div className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[250px] md:min-h-[320px]" style={{
        backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">Detail Pengaduan</h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Informasi lengkap pengaduan masyarakat</p>
        </div>
      </div>
      {/* Konten Detail */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-[-60px] relative z-20">
        <button onClick={() => navigate(-1)} className="mb-6 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-blue-800 transition">&larr; Kembali</button>
        <div className="space-y-4">
          <div><span className="font-bold">ID:</span> {pengaduan.id}</div>
          <div><span className="font-bold">Nama Pelapor:</span> {pengaduan.nama}</div>
          <div><span className="font-bold">NIK:</span> {pengaduan.nik}</div>
          <div><span className="font-bold">Email:</span> {pengaduan.email}</div>
          <div><span className="font-bold">No. HP:</span> {pengaduan.no_hp}</div>
          <div><span className="font-bold">Alamat:</span> {pengaduan.alamat}</div>
          <div><span className="font-bold">Judul:</span> {pengaduan.judul}</div>
          <div><span className="font-bold">Uraian:</span> <span className="whitespace-pre-line">{pengaduan.uraian}</span></div>
          <div><span className="font-bold">Tanggal Pengaduan:</span> {new Date(pengaduan.tanggal_pengaduan).toLocaleDateString('id-ID')}</div>
          <div>
            <span className="font-bold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${pengaduan.status === 'Selesai' ? 'bg-green-100 text-green-700' : pengaduan.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{pengaduan.status}</span>
          </div>
          {pengaduan.lampiran && (
            <div>
              <span className="font-bold">Lampiran:</span> <a href={pengaduan.lampiran} target="_blank" rel="noopener noreferrer" className="text-primary underline">Lihat Lampiran</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 