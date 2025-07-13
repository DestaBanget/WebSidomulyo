import React, { useEffect, useState } from 'react';

const dummySuratMasuk = [
  { id: 1, nama: 'Budi Santoso', nik: '3501010101010001', jenis: 'Surat Keterangan Domisili', tanggal: '2024-06-10', status: 'Menunggu', noHp: '081234567890', alamat: 'Jl. Melati No. 1', lampiran: null },
  { id: 2, nama: 'Siti Aminah', nik: '3501010101010002', jenis: 'Surat Keterangan Usaha', tanggal: '2024-06-09', status: 'Diproses', noHp: '081234567891', alamat: 'Jl. Kenanga No. 2', lampiran: null },
  { id: 3, nama: 'Joko Widodo', nik: '3501010101010003', jenis: 'Surat Keterangan Tidak Mampu', tanggal: '2024-06-08', status: 'Selesai', noHp: '081234567892', alamat: 'Jl. Mawar No. 3', lampiran: null },
];

export default function AdminSuratMasukPage() {
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/surat-masuk')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setSurat)
      .catch(() => setSurat(dummySuratMasuk))
      .finally(() => setLoading(false));
  }, []);

  const filtered = surat.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) ||
    s.nik.toLowerCase().includes(search.toLowerCase()) ||
    s.jenis.toLowerCase().includes(search.toLowerCase())
  );

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
              {loading ? (
                <tr><td colSpan={9} className="text-center py-8 text-gray-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-8 text-gray-400">Tidak ada surat ditemukan.</td></tr>
              ) : filtered.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{s.id}</td>
                  <td className="px-4 py-2 font-semibold">{s.nama}</td>
                  <td className="px-4 py-2 text-center">{s.nik}</td>
                  <td className="px-4 py-2">{s.jenis}</td>
                  <td className="px-4 py-2 text-center">{s.tanggal}</td>
                  <td className="px-4 py-2 text-center">{s.noHp}</td>
                  <td className="px-4 py-2">{s.alamat}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${s.status === 'Selesai' ? 'bg-green-100 text-green-700' : s.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-2 text-center flex flex-col gap-2 md:flex-row md:gap-2">
                    <button className="px-3 py-1 rounded bg-primary text-white text-xs font-bold hover:bg-blue-800 transition">Lihat Detail</button>
                    <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition">Ubah Status</button>
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