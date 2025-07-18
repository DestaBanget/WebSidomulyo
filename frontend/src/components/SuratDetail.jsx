import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function SuratDetail() {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/surat/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil detail surat');
        }
        const data = await response.json();
        setSurat(data.surat);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSurat();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Memuat detail surat...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }
  if (!surat) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Surat tidak ditemukan.</div>;
  }

  // Lampiran: array of { nama_file, url_file, jenis_persyaratan }
  const lampiranMap = {};
  if (Array.isArray(surat.lampiran)) {
    surat.lampiran.forEach(l => {
      lampiranMap[l.jenis_persyaratan || l.nama_file] = l.url_file;
    });
  }

  function formatTanggalIndo(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="w-full min-h-[200px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">Detail Surat Masuk</h1>
      </div>
      {/* Konten Detail */}
      <section className="max-w-2xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <div className="mb-6">
          <div className="font-bold text-primary text-lg mb-2">A. DATA DIRI</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-bold">Nama Lengkap:</span> {surat.nama}</div>
            <div><span className="font-bold">NIK:</span> {surat.nik}</div>
            <div><span className="font-bold">Jenis Kelamin:</span> {surat.jenis_kelamin}</div>
            <div><span className="font-bold">Tempat, Tanggal Lahir:</span> {surat.tempat_lahir}, {formatTanggalIndo(surat.tanggal_lahir)}</div>
            <div><span className="font-bold">Pekerjaan:</span> {surat.pekerjaan}</div>
            <div><span className="font-bold">Kewarganegaraan:</span> {surat.kewarganegaraan}</div>
            <div><span className="font-bold">Agama:</span> {surat.agama}</div>
            <div><span className="font-bold">No. HP:</span> {surat.no_hp}</div>
            <div className="md:col-span-2"><span className="font-bold">Alamat KTP:</span> {surat.alamat_ktp}</div>
            <div className="md:col-span-2"><span className="font-bold">Alamat Sekarang:</span> {surat.alamat_sekarang}</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="font-bold text-primary text-lg mb-2">B. INFORMASI SURAT</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-bold">Jenis Surat:</span> {surat.jenis_surat}</div>
            <div><span className="font-bold">Tanggal Pengajuan:</span> {new Date(surat.tanggal_pengajuan).toLocaleDateString('id-ID')}</div>
            <div><span className="font-bold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${surat.status === 'Selesai' ? 'bg-green-100 text-green-700' : surat.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{surat.status}</span></div>
          </div>
        </div>
        <div>
          <div className="font-bold text-primary text-lg mb-2">C. LAMPIRAN PERSYARATAN</div>
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(lampiranMap).length === 0 && <div className="text-gray-500">Tidak ada lampiran persyaratan.</div>}
            {Object.entries(lampiranMap).map(([p, url]) => {
              const isImage = url && /\.(jpg|jpeg|png|gif)$/i.test(url);
              const isPDF = url && /\.pdf$/i.test(url);
              return (
                <div key={p} className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-2">
                  <span className="font-semibold min-w-[180px]">{p}:</span>
                  {url ? (
                    <>
                      {isImage ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="group inline-block">
                          <img src={url} alt={p} className="h-24 w-auto rounded shadow border border-gray-200 group-hover:scale-105 transition" style={{maxWidth: 180}} />
                          <div className="text-blue-600 underline text-xs mt-1 text-center">Lihat Gambar</div>
                        </a>
                      ) : (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
                          {isPDF ? 'Lihat PDF' : 'Lihat File'}
                        </a>
                      )}
                      <div className="text-xs text-gray-400 break-all">{url.split('/').pop()}</div>
                    </>
                  ) : (
                    <span className="text-gray-400">Tidak ada file</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
} 