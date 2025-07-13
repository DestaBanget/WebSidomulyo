import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function VisiMisi() {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [visi, setVisi] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [misi, setMisi] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Etiam euismod, urna eu tincidunt consectetur.',
    'Nisi nisl aliquam nunc, eget aliquam nisl nunc euismod nunc.'
  ]);
  const [visiEdit, setVisiEdit] = useState(visi);
  const [misiEdit, setMisiEdit] = useState(misi.join('\n'));

  const handleEdit = () => {
    setVisiEdit(visi);
    setMisiEdit(misi.join('\n'));
    setEditMode(true);
  };

  const handleSave = () => {
    setVisi(visiEdit);
    setMisi(misiEdit.split('\n').map(line => line.trim()).filter(Boolean));
    setEditMode(false);
  };

  const handleCancel = () => {
    setVisiEdit(visi);
    setMisiEdit(misi.join('\n'));
    setEditMode(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Visi & Misi Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Landasan dan tujuan pembangunan Desa Sidomulyo untuk masa depan yang lebih baik.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-16 px-4 text-center relative">
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
              <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Visi</h2>
              <textarea
                value={visiEdit}
                onChange={e => setVisiEdit(e.target.value)}
                className="w-full p-4 border-2 border-primary rounded-lg text-lg text-gray-700 resize-none mb-4"
                rows={2}
                placeholder="Masukkan visi..."
              />
            </div>
            <div>
              <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Misi</h2>
              <textarea
                value={misiEdit}
                onChange={e => setMisiEdit(e.target.value)}
                className="w-full p-4 border-2 border-primary rounded-lg text-lg text-gray-700 resize-none"
                rows={5}
                placeholder="Masukkan misi, pisahkan dengan baris baru"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 bg-primary text-white rounded font-semibold text-sm hover:bg-blue-800 transition"
                onClick={handleSave}
              >
                Simpan
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-semibold text-sm hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-8">
            <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Visi</h2>
            <p className="mb-12" style={{ fontSize: '1.2em', fontFamily: 'inherit' }}>{visi}</p>
            <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: 'inherit' }}>Misi</h2>
            <ul className="space-y-8 text-xl" style={{ fontFamily: 'inherit' }}>
              {misi.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 