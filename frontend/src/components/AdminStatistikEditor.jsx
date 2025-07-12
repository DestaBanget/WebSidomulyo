import React, { useState, useEffect } from 'react';

const initialStats = [
  { id: 1, judul: 'Total Penduduk', nilai: '2.350', ikon: '👨‍👩‍👧‍👦' },
  { id: 2, judul: 'Jumlah Keluarga', nilai: '670', ikon: '🏠' },
  { id: 3, judul: 'Surat Diproses Bulan Ini', nilai: '48', ikon: '📄' },
  { id: 4, judul: 'Program Aktif', nilai: '3', ikon: '🎯' },
];

export default function AdminStatistikEditor() {
  const [stats, setStats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setStats(initialStats);
  }, []);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.nilai);
  };

  const handleSave = () => {
    const updated = stats.map((item) =>
      item.id === editingId ? { ...item, nilai: editValue } : item
    );
    setStats(updated);
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">Edit Nilai Statistik</h2>
      <table className="w-full border rounded overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 text-left">Ikon</th>
            <th className="p-3 text-left">Judul</th>
            <th className="p-3 text-left">Nilai</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-xl">{item.ikon}</td>
              <td className="p-3">{item.judul}</td>
              <td className="p-3">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border rounded px-2 py-1 w-24"
                  />
                ) : (
                  item.nilai
                )}
              </td>
              <td className="p-3">
                {editingId === item.id ? (
                  <div className="flex gap-2">
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
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
