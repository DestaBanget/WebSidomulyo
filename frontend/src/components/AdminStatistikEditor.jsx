import React, { useState, useEffect } from 'react';
import { apiCall } from '../config/api';

export default function AdminStatistikEditor() {
  const [stats, setStats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ambil data statistik dari backend
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiCall('/statistik');
        // Data dari backend: res.statistik (bisa grouped atau array)
        // Jika grouped, flatten ke array
        let data = [];
        if (Array.isArray(res.statistik)) {
          data = res.statistik;
        } else {
          // grouped by kategori
          Object.values(res.statistik).forEach(arr => {
            data = data.concat(arr);
          });
        }
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleEdit = (item) => {
    console.log('[DEBUG] handleEdit', item);
    setEditingId(item.id);
    setEditValue(item.value);
  };

  const handleSave = async () => {
    console.log('[DEBUG] handleSave dipanggil');
    const item = stats.find(i => i.id === editingId);
    if (!item) {
      console.log('[DEBUG] Item tidak ditemukan');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log('[DEBUG] Mengirim PUT ke backend', item.id, {
        kategori: item.kategori,
        label: item.label,
        value: Number(editValue),
        color: item.color || '#2563eb',
      });
      await apiCall(`/statistik/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          kategori: item.kategori,
          label: item.label,
          value: Number(editValue),
          color: item.color || '#2563eb',
        }),
      });
      console.log('[DEBUG] PUT selesai, refresh data');
      // Refresh data
      const res = await apiCall('/statistik');
      let data = [];
      if (Array.isArray(res.statistik)) {
        data = res.statistik;
      } else {
        Object.values(res.statistik).forEach(arr => {
          data = data.concat(arr);
        });
      }
      setStats(data);
      setEditingId(null);
      setEditValue('');
      console.log('[DEBUG] Data statistik di-refresh');
    } catch (err) {
      setError(err.message);
      console.log('[DEBUG] Error saat PUT:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (loading) return <div className="p-8 text-gray-500">Memuat data statistik...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">Edit Nilai Statistik</h2>
      <table className="w-full border rounded overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Label</th>
            <th className="p-3 text-left">Nilai</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.kategori}</td>
              <td className="p-3">{item.label}</td>
              <td className="p-3">
                {editingId === item.id ? (
                  <>
                    {console.log('[DEBUG] Render input edit untuk id', item.id)}
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded px-2 py-1 w-24"
                    />
                  </>
                ) : (
                  item.value
                )}
              </td>
              <td className="p-3">
                {editingId === item.id ? (
                  <div className="flex gap-2">
                    {console.log('[DEBUG] Render tombol Simpan untuk id', item.id)}
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <>
                    {console.log('[DEBUG] Render tombol Edit untuk id', item.id)}
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
