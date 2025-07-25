import React, { useState, useEffect } from 'react';
import { apiCall } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import Hero from "./Hero";
import images from '../config/images';

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
  const handleColorChange = (idx, val) => {
    const newData = [...editData];
    newData[idx].color = val;
    setEditData(newData);
  };
  const handleSave = async () => {
    try {
      // Cari data yang berubah dibandingkan data asli
      const changed = editData.find((item, idx) => {
        const original = data[idx];
        return (
          item.value !== original.value ||
          item.color !== original.color
        );
      });
      if (!changed) {
        setEdit(false);
        return;
      }
      await apiCall(`/statistik/${changed.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          kategori: changed.kategori,
          label: changed.label,
          value: Number(changed.value),
          color: changed.color && /^#([0-9A-Fa-f]{6})$/.test(changed.color) ? changed.color : '#cccccc'
        }),
      });
      setEdit(false);
      if (typeof window !== 'undefined' && window.fetchStats) window.fetchStats();
    } catch (err) {
      alert('Gagal menyimpan perubahan statistik');
    }
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
              <div className="h-4" style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color || '#cccccc' }} />
            </div>
            {edit ? (
              <>
                <input
                  type="number"
                  className="w-16 border-b-2 border-primary outline-none text-right text-sm font-semibold text-gray-700"
                  value={d.value}
                  onChange={e => handleChange(idx, e.target.value)}
                />
                <input
                  type="color"
                  className="ml-2 w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                  value={d.color || '#cccccc'}
                  onChange={e => handleColorChange(idx, e.target.value)}
                  title="Pilih warna bar"
                />
              </>
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
  const { isAdmin } = useAuth(); // Ambil status admin dari context
  const [stats, setStats] = useState([]); // Awal kosong, bukan initialStats
  const [usia, setUsia] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const [pekerjaan, setPekerjaan] = useState([]);
  const [dusun, setDusun] = useState([]);
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

      // Setelah fetch data dari backend:
      const usiaData = data.filter(d => d.kategori === 'usia').map(d => ({ ...d, kategori: d.kategori || 'usia' }));
      const pendidikanData = data.filter(d => d.kategori === 'pendidikan').map(d => ({ ...d, kategori: d.kategori || 'pendidikan' }));
      const pekerjaanData = data.filter(d => d.kategori === 'pekerjaan').map(d => ({ ...d, kategori: d.kategori || 'pekerjaan' }));
      const dusunData = data.filter(d => d.kategori === 'dusun').map(d => ({ ...d, kategori: d.kategori || 'dusun' }));
      console.log('Usia:', usiaData);
      console.log('Pendidikan:', pendidikanData);
      console.log('Pekerjaan:', pekerjaanData);
      console.log('Dusun:', dusunData);
      setUsia(usiaData);
      setPendidikan(pendidikanData);
      setPekerjaan(pekerjaanData);
      setDusun(dusunData);

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
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.profil.statistik}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Statistik Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Gambaran data kependudukan, pendidikan, pekerjaan, dan kehidupan sosial masyarakat Desa Sidomulyo secara visual dan informatif.</p>
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