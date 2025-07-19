import React, { useState, useEffect } from 'react';
import { apiCall } from '../config/api';

const initialStats = [
  {
    title: 'Total Penduduk',  
    value: '2.350',
    icon: '👨‍👩‍👧‍👦',
    breakdown: [
      { label: 'Laki-laki', value: '1.200', color: 'text-blue-600' },
      { label: 'Perempuan', value: '1.150', color: 'text-pink-500' },
    ],
  },
  {
    title: 'Jumlah Keluarga',
    value: '670',
    icon: '🏠',
  },
  {
    title: 'Surat Diproses Bulan Ini',
    value: '48',
    icon: '📄',
  },
  {
    title: 'Program Aktif',
    value: '3',
    icon: '🎯',
  },
];

const initialUsia = [
  { label: '0-5 th', value: 210, color: 'bg-blue-200' },
  { label: '6-17 th', value: 480, color: 'bg-blue-400' },
  { label: '18-59 th', value: 1400, color: 'bg-blue-600' },
  { label: '60+ th', value: 260, color: 'bg-blue-900' },
];
const initialPendidikan = [
  { label: 'Tidak Sekolah', value: 120, color: 'bg-gray-300' },
  { label: 'SD', value: 700, color: 'bg-yellow-300' },
  { label: 'SMP', value: 600, color: 'bg-green-300' },
  { label: 'SMA', value: 650, color: 'bg-blue-300' },
  { label: 'Diploma/S1+', value: 280, color: 'bg-purple-300' },
];
const initialPekerjaan = [
  { label: 'Petani', value: 800, color: 'bg-green-500' },
  { label: 'Buruh', value: 400, color: 'bg-yellow-500' },
  { label: 'PNS', value: 120, color: 'bg-blue-500' },
  { label: 'Wiraswasta', value: 350, color: 'bg-pink-400' },
  { label: 'Pelajar/Mahasiswa', value: 480, color: 'bg-indigo-400' },
  { label: 'Lainnya', value: 200, color: 'bg-gray-400' },
];
const initialDusun = [
  { label: 'Dusun Bareng', value: 900, color: 'bg-blue-400' },
  { label: 'Dusun Tebelo', value: 800, color: 'bg-green-400' },
  { label: 'Dusun Mangunrejo', value: 650, color: 'bg-yellow-400' },
  { label: 'Dusun Sumberkrecek', value: 500, color: 'bg-purple-400' },
  { label: 'Dusun [Nama Lain]', value: 400, color: 'bg-pink-400' },
];

function BarStat({ data, total }) {
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-32 text-sm font-medium text-gray-700">{d.label}</span>
          <div className="flex-1 h-4 rounded-full overflow-hidden bg-gray-100">
            <div className={`${d.color} h-4`} style={{ width: `${(d.value / total) * 100}%` }} />
          </div>
          <span className="w-12 text-right text-sm font-semibold text-gray-700">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

function BarStatEditable({ data, setData, isAdmin, title }) {
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const total = (edit ? editData : data).reduce((a, b) => a + Number(b.value), 0);

  const handleEdit = () => {
    setEditData(data.map(d => ({ ...d })));
    setEdit(true);
  };
  const handleChange = (idx, val) => {
    const newData = [...editData];
    newData[idx].value = val;
    setEditData(newData);
  };
  const handleSave = () => {
    setData(editData);
    setEdit(false);
  };
  const handleCancel = () => setEdit(false);

  return (
    <div className="bg-white rounded-xl shadow p-6 relative">
      <div className="font-bold text-primary mb-4 text-lg">{title}</div>
      {isAdmin && !edit && (
        <button className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs rounded shadow hover:bg-blue-800 transition" onClick={handleEdit}>Edit</button>
      )}
      <div className="space-y-2">
        {(edit ? editData : data).map((d, idx) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-32 text-sm font-medium text-gray-700">{d.label}</span>
            <div className="flex-1 h-4 rounded-full overflow-hidden bg-gray-100">
              <div className={`${d.color} h-4`} style={{ width: `${(d.value / total) * 100}%` }} />
            </div>
            {edit ? (
              <input
                type="number"
                className="w-16 border-b-2 border-primary outline-none text-right text-sm font-semibold text-gray-700"
                value={d.value}
                onChange={e => handleChange(idx, e.target.value)}
              />
            ) : (
              <span className="w-12 text-right text-sm font-semibold text-gray-700">{d.value}</span>
            )}
          </div>
        ))}
      </div>
      {isAdmin && edit && (
        <div className="flex gap-2 mt-4 justify-end">
          <button className="px-3 py-1 bg-primary text-white rounded font-semibold text-xs" onClick={handleSave}>Simpan</button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded font-semibold text-xs" onClick={handleCancel}>Batal</button>
        </div>
      )}
    </div>
  );
}

export default function StatistikDesa() {
  const heroImg = '/surat.jpg';
  const isAdmin = true; // ganti dengan context jika sudah ada
  const [stats, setStats] = useState([]); // Awal kosong, bukan initialStats
  const [usia, setUsia] = useState(initialUsia);
  const [pendidikan, setPendidikan] = useState(initialPendidikan);
  const [pekerjaan, setPekerjaan] = useState(initialPekerjaan);
  const [dusun, setDusun] = useState(initialDusun);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editBreakdown, setEditBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiCall('/statistik');
      let data = [];
      if (Array.isArray(res.statistik)) {
        data = res.statistik;
      } else {
        Object.values(res.statistik).forEach(arr => {
          data = data.concat(arr);
        });
      }
      // Mapping ke format frontend lama (title, value, icon, breakdown)
      const mapping = [
        { kategori: 'utama', label: 'Total Penduduk', icon: '👨‍👩‍👧‍👦' },
        { kategori: 'utama', label: 'Jumlah Keluarga', icon: '🏠' },
        { kategori: 'utama', label: 'Surat Diproses Bulan Ini', icon: '📄' },
        { kategori: 'utama', label: 'Program Aktif', icon: '🎯' },
      ];
      const mappedStats = mapping.map(map => {
        const found = data.find(d => d.kategori === map.kategori && d.label === map.label);
        return found ? {
          title: found.label,
          value: found.value,
          icon: map.icon,
          id: found.id,
          color: found.color,
        } : null;
      }).filter(Boolean);
      setStats(mappedStats);
    } catch (err) {
      setError('Gagal memuat data statistik');
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(stats[idx].value);
    setEditBreakdown(stats[idx].breakdown ? [...stats[idx].breakdown] : []);
  };
  const handleSave = async (idx) => {
    try {
      const stat = stats[idx];
      // Kirim update ke backend
      await apiCall(`/statistik/${stat.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          kategori: 'utama',
          label: stat.title,
          value: editValue,
          color: stat.color || '#00aaff'
        }),
      });
      // Setelah berhasil, fetch ulang data dari backend
      await fetchStats();
      setEditIdx(null);
    } catch (err) {
      alert('Gagal menyimpan perubahan statistik');
    }
  };
  const handleBreakdownChange = (bIdx, val) => {
    const newBreakdown = [...editBreakdown];
    newBreakdown[bIdx].value = val;
    setEditBreakdown(newBreakdown);
  };

  if (loading) return <div className="p-8 text-gray-500">Memuat data statistik...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!stats.length) return <div className="p-8 text-gray-500">Tidak ada data statistik.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Gradient Section - FULL WIDTH */}
      <div id="statistik-hero" className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-3 tracking-tight text-white">Statistik Desa Sidomulyo</h1>
          <div className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-4 text-white">Gambaran data kependudukan, pendidikan, pekerjaan, dan kehidupan sosial masyarakat Desa Sidomulyo secara visual dan informatif.</div>
          <div className="max-w-xl mx-auto text-base opacity-90 text-white">Statistik ini membantu pemerintah desa dan masyarakat untuk memahami perkembangan, kebutuhan, serta potensi desa secara lebih baik. Data di bawah ini merupakan data dummy yang akan diperbarui secara berkala.</div>
        </div>
      </div>
      {/* Statistik Cards & Bar Stats */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 -mt-8">
        {/* Judul Statistik Utama Desa */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center tracking-tight drop-shadow-lg">Statistik Utama Desa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s, idx) => (
            <div
              key={s.title}
              className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center hover:shadow-lg transition relative"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{s.title}</div>
              {editIdx === idx ? (
                <>
                  <input
                    type="number"
                    className="text-2xl font-bold text-primary mb-2 text-center border-b-2 border-primary outline-none w-20 mx-auto"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                  />
                  {s.breakdown && (
                    <div className="flex flex-col gap-1 w-full mt-2">
                      {editBreakdown.map((b, bIdx) => (
                        <div key={b.label} className="flex justify-between text-sm items-center gap-2">
                          <span className={b.color}>{b.label}</span>
                          <input
                            type="number"
                            className={`border-b-2 outline-none w-16 text-right ${b.color}`}
                            value={b.value}
                            onChange={e => handleBreakdownChange(bIdx, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3 justify-center">
                    <button className="px-3 py-1 bg-primary text-white rounded font-semibold text-xs" onClick={() => handleSave(idx)}>Simpan</button>
                    <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded font-semibold text-xs" onClick={() => setEditIdx(null)}>Batal</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-primary mb-2">{s.value}</div>
                  {s.breakdown && (
                    <div className="flex flex-col gap-1 w-full">
                      {s.breakdown.map((b) => (
                        <div key={b.label} className="flex justify-between text-sm">
                          <span className={b.color}>{b.label}</span>
                          <span className={b.color}>{b.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {isAdmin && (
                    <button className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs rounded shadow hover:bg-blue-800 transition" onClick={() => handleEdit(idx)}>Edit</button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <BarStatEditable data={usia} setData={setUsia} isAdmin={isAdmin} title="Statistik Usia" />
          <BarStatEditable data={pendidikan} setData={setPendidikan} isAdmin={isAdmin} title="Statistik Pendidikan" />
          <BarStatEditable data={pekerjaan} setData={setPekerjaan} isAdmin={isAdmin} title="Statistik Pekerjaan" />
          <BarStatEditable data={dusun} setData={setDusun} isAdmin={isAdmin} title="Statistik Dusun" />
        </div>
      </div>
    </div>
  );
} 