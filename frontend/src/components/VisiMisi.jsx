import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import Hero from "./Hero";
import images from '../config/images';

export default function VisiMisi() {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [visiMisi, setVisiMisi] = useState({
    judul: 'Visi & Misi',
    visi: 'Loading...',
    misi: ['Loading...']
  });
  const [visiEdit, setVisiEdit] = useState('');
  const [misiEdit, setMisiEdit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  // Refresh data ketika editMode berubah dari true ke false (setelah save)
  useEffect(() => {
    if (!editMode) {
      fetchVisiMisi();
    }
  }, [editMode]);

  const fetchVisiMisi = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tentang/visi-misi`);
      const data = await response.json();
      if (data.tentang) {
        setVisiMisi(data.tentang);
        setVisiEdit(data.tentang.visi);
        setMisiEdit(data.tentang.misi.join('\n'));
      }
    } catch (error) {
      console.error('Error fetching visi misi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setVisiEdit(visiMisi.visi);
    setMisiEdit(visiMisi.misi.join('\n'));
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const misiArray = misiEdit.split('\n').map(line => line.trim()).filter(Boolean);
      
      const requestBody = {
        judul: visiMisi.judul,
        visi: visiEdit,
        misi: misiArray
      };
      
      console.log('Sending visi misi data:', requestBody);
      console.log('Token:', localStorage.getItem('token'));
      
      const response = await fetch(`${API_BASE_URL}/tentang/visi-misi`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Gagal menyimpan perubahan: ${errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      console.log('Success response:', data);
      
      // Update state dengan data baru dari server
      setVisiMisi(data.tentang);
      // Update juga state edit untuk konsistensi
      setVisiEdit(data.tentang.visi);
      setMisiEdit(data.tentang.misi.join('\n'));
      
      setEditMode(false);
      alert('Visi & Misi berhasil disimpan!');
    } catch (error) {
      console.error('Error saving visi misi:', error);
      alert('Terjadi kesalahan saat menyimpan');
    }
  };

  const handleCancel = () => {
    setVisiEdit(visiMisi.visi);
    setMisiEdit(visiMisi.misi.join('\n'));
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] px-3 sm:px-4">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.profil.visimisi}')`,
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
      
      <div className="max-w-4xl mx-auto py-8 sm:py-12 md:py-16 px-3 sm:px-4 relative">
        {isAdmin && !editMode && (
          <div className="flex justify-end mb-4 sm:mb-6">
            <button 
              className="px-3 sm:px-4 py-2 bg-primary text-white text-xs sm:text-sm rounded-lg shadow hover:bg-blue-800 transition duration-200 active:scale-95"
              onClick={handleEdit}
            >
              Edit Visi & Misi
            </button>
          </div>
        )}
        
        {editMode ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center leading-tight">
              {visiMisi.judul}
            </h2>
            
            <div>
              <h3 className="text-primary text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 uppercase tracking-wider sm:tracking-widest">
                Visi
              </h3>
              <textarea
                value={visiEdit}
                onChange={e => setVisiEdit(e.target.value)}
                className="w-full p-3 sm:p-4 md:p-6 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-gray-700 resize-none focus:border-primary focus:outline-none transition-colors break-words"
                rows={3}
                placeholder="Masukkan visi..."
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              />
            </div>
            
            <div>
              <h3 className="text-primary text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 uppercase tracking-wider sm:tracking-widest">
                Misi
              </h3>
              <textarea
                value={misiEdit}
                onChange={e => setMisiEdit(e.target.value)}
                className="w-full p-3 sm:p-4 md:p-6 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-gray-700 resize-none focus:border-primary focus:outline-none transition-colors break-words"
                rows={6}
                placeholder="Masukkan misi, pisahkan dengan baris baru"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-2">
              <button 
                className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition duration-200 active:scale-95 text-xs sm:text-sm md:text-base"
                onClick={handleSave}
              >
                Simpan Perubahan
              </button>
              <button 
                className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition duration-200 active:scale-95 text-xs sm:text-sm md:text-base"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center leading-tight">
              {visiMisi.judul}
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-primary text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 uppercase tracking-wider sm:tracking-widest text-center">
                  Visi
                </h3>
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 overflow-hidden">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center break-words">
                    {visiMisi.visi}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-primary text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 uppercase tracking-wider sm:tracking-widest text-center">
                  Misi
                </h3>
                <div className="bg-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 overflow-hidden">
                  <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                    {visiMisi.misi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <span className="bg-primary text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed break-words flex-1 min-w-0">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Terakhir diperbarui: {new Date(visiMisi.updatedAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 