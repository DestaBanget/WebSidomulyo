import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiCall, publicApiCall } from '../config/api';

export default function BPD() {
  const heroImg = '/surat.jpg';
  const { isAdmin } = useAuth();

  // State utama
  const [lembaga, setLembaga] = useState(null); // { id, nama_lembaga, deskripsi, pengurus: [] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // Edit state
  const [tentangEdit, setTentangEdit] = useState('');
  const [visiEdit, setVisiEdit] = useState('');
  const [misiEdit, setMisiEdit] = useState('');

  // Fetch BPD data from backend
  useEffect(() => {
    const fetchBPD = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await publicApiCall('/lembaga');
        // Cari lembaga dengan nama_lembaga === 'BPD'
        const bpd = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'bpd');
        if (!bpd) throw new Error('Data BPD tidak ditemukan di server');
        setLembaga(bpd);
        // Sementara: deskripsi = visi+misi (bisa dipecah jika backend sudah support)
        setTentangEdit(bpd.deskripsi || '');
        setVisiEdit(bpd.deskripsi || '');
        setMisiEdit('');
      } catch (err) {
        setError(err.message || 'Gagal mengambil data BPD');
      } finally {
        setLoading(false);
      }
    };
    fetchBPD();
  }, []);

  // Handle edit
  const handleEdit = () => {
    setTentangEdit(lembaga?.deskripsi || '');
    setVisiEdit(lembaga?.deskripsi || '');
    setMisiEdit('');
    setEditMode(true);
  };

  // Handle save (update ke backend)
  const handleSave = async () => {
    if (!lembaga) return;
    setLoading(true);
    setError(null);
    try {
      // Sementara: update deskripsi saja (isi dengan visiEdit)
      await apiCall(`/lembaga/${lembaga.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nama_lembaga: lembaga.nama_lembaga,
          deskripsi: visiEdit // atau gabungan visi+misi jika mau
        })
      });
      setEditMode(false);
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const bpd = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'bpd');
      setLembaga(bpd);
    } catch (err) {
      setError(err.message || 'Gagal update data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setError(null);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!lembaga) return <div className="text-center py-20 text-red-600">Data BPD tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center text-center px-4 pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden" style={{background: `url(${heroImg}) center/cover no-repeat`, borderRadius: '0 0 2.5rem 2.5rem'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">BPD</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2 text-white">{lembaga.deskripsi || 'BPD adalah Badan Permusyawaratan Desa.'}</p>
        </div>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-10 relative">
        {isAdmin && !editMode && (
          <button
            className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs rounded shadow hover:bg-blue-800 transition"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        {editMode ? (
          <div className="space-y-8 pt-8">
            <div>
              <div className="font-bold text-primary mb-2">VISI & MISI BPD</div>
              <textarea
                value={visiEdit}
                onChange={e => setVisiEdit(e.target.value)}
                className="w-full p-3 border-2 border-primary rounded-lg text-gray-700 mb-4"
                rows={6}
                placeholder="Tulis visi dan misi BPD di sini"
              />
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleSave}>Simpan</button>
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleCancel}>Batal</button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
          </div>
        ) : (
          <div className="space-y-8 pt-8">
            <div>
              <div className="font-bold text-primary mb-2">VISI & MISI BPD</div>
              <div className="whitespace-pre-line text-gray-800 bg-gray-50 rounded-lg p-4 border border-primary min-h-[100px]">
                {lembaga.deskripsi || '-'}
              </div>
            </div>
            <div>
              <div className="font-bold text-primary mb-2">PENGURUS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {(lembaga.pengurus || []).map((p, i) => (
                  <div key={i} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border">
                    <img src={p.foto || '/dummy-profile.png'} alt={p.nama} className="w-20 h-20 rounded-lg object-cover bg-gray-200 mb-2" />
                    <div className="w-full text-center font-bold text-gray-800 text-sm mb-1">{p.nama}</div>
                    <div className="w-full text-center text-xs text-gray-500">{p.jabatan}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
} 