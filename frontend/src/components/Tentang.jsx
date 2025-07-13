import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Tentang() {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, urna erat dictum erat, at cursus enim erat nec enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');
  const [originalContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, urna erat dictum erat, at cursus enim erat nec enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.');

  const handleEdit = () => {
    setEditContent(originalContent);
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditContent(originalContent);
    setEditMode(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Tentang Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Website ini memberikan informasi lengkap tentang Desa Sidomulyo, sejarah, potensi, dan kehidupan masyarakatnya. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-4 px-4 relative">
        {isAdmin && !editMode && (
          <button 
            className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs rounded shadow hover:bg-blue-800 transition"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        {editMode ? (
          <div className="space-y-4 pt-8">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-4 border-2 border-primary rounded-lg text-lg text-gray-700 resize-none"
              rows={8}
              placeholder="Masukkan konten tentang desa..."
            />
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
          <p className="text-lg text-gray-700 mb-6 pt-8">{editContent}</p>
        )}
      </div>
    </div>
  );
} 