import React, { useState, useEffect } from "react";
import { apiCall } from '../config/api';

export default function AdminPesanMasuk() {
  const [pesanList, setPesanList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPesan = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiCall('/pesan-kontak');
        setPesanList(res.pesan || []);
      } catch (err) {
        setError(err.message || 'Gagal mengambil data pesan');
      } finally {
        setLoading(false);
      }
    };
    fetchPesan();
  }, []);

  const filteredPesan = pesanList.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      (p.email && p.email.toLowerCase().includes(search.toLowerCase())) ||
      (p.no_hp && p.no_hp.includes(search)) ||
      (p.pesan && p.pesan.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f7fafd]">
      {/* Hero Section */}
      <div className="relative w-full h-[260px] md:h-[300px] bg-blue-900/80 flex items-center justify-center">
        <img
          src="/surat.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-2">Pesan Masuk</h1>
          <p className="text-lg md:text-xl font-medium drop-shadow mb-2 max-w-2xl">
            Daftar pesan dari warga yang masuk ke sistem. Admin dapat memantau dan membaca pesan di sini.
          </p>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Box Daftar Pesan Masuk */}
      <div className="w-full flex justify-center -mt-24 md:-mt-32 pb-16">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-[#2b4c7e]">Daftar Pesan Masuk</h2>
          <div className="flex justify-end mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Cari nama/email/no hp/pesan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#2b4c7e] text-white">
                  <th className="py-2 px-4 rounded-tl-lg">No</th>
                  <th className="py-2 px-4">Nama Pengirim</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">No. HP</th>
                  <th className="py-2 px-4">Pesan</th>
                  <th className="py-2 px-4">Tanggal</th>
                  <th className="py-2 px-4 rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-4">Memuat data...</td></tr>
                ) : filteredPesan.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      Tidak ada pesan.
                    </td>
                  </tr>
                ) : (
                  filteredPesan.map((pesan, idx) => (
                    <tr key={pesan.id || pesan.pesan_id || idx} className="bg-white shadow-sm">
                      <td className="py-2 px-4 font-medium">{idx + 1}</td>
                      <td className="py-2 px-4 font-semibold uppercase">{pesan.nama}</td>
                      <td className="py-2 px-4">{pesan.email}</td>
                      <td className="py-2 px-4">{pesan.no_hp}</td>
                      <td className="py-2 px-4 max-w-xs truncate" title={pesan.pesan}>{pesan.pesan}</td>
                      <td className="py-2 px-4">{pesan.created_at ? new Date(pesan.created_at).toLocaleString('id-ID') : '-'}</td>
                      <td className="py-2 px-4 flex gap-2">
                        {/* Aksi bisa ditambah di sini jika perlu */}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold">Lihat Detail</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 