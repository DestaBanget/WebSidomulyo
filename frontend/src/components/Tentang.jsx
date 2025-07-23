import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import Hero from "./Hero";
import images from '../config/images';

export default function Tentang() {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('sejarah');
  const [sejarah, setSejarah] = useState({
    judul: 'Sejarah Desa',
    konten: 'Loading...',
    gambar: null
  });
  const [geografis, setGeografis] = useState({
    judul: 'Kondisi Geografis',
    konten: 'Loading...',
    batasUtara: '',
    batasSelatan: '',
    batasBarat: '',
    batasTimur: '',
    luasWilayah: '',
    jumlahPenduduk: '',
    gambar: null
  });
  const [editContent, setEditContent] = useState('');
  const [editGeografis, setEditGeografis] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sejarahRes, geografisRes] = await Promise.all([
        fetch(`${API_BASE_URL}/tentang/sejarah`),
        fetch(`${API_BASE_URL}/tentang/geografis`)
      ]);

      const sejarahData = await sejarahRes.json();
      const geografisData = await geografisRes.json();

      if (sejarahData.tentang) {
        setSejarah(sejarahData.tentang);
        setEditContent(sejarahData.tentang.konten);
      }
      if (geografisData.tentang) {
        setGeografis(geografisData.tentang);
        setEditGeografis(geografisData.tentang);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (activeSection === 'sejarah') {
      setEditContent(sejarah.konten);
    } else {
      setEditGeografis(geografis);
    }
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      let response;
      if (activeSection === 'sejarah') {
        const requestBody = {
          judul: sejarah.judul,
          konten: editContent,
          gambar: sejarah.gambar
        };
        console.log('Sending sejarah data:', requestBody);
        
        response = await fetch(`${API_BASE_URL}/tentang/sejarah`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(requestBody)
        });
        
        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Gagal menyimpan perubahan: ${errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : 'Unknown error'}`);
          return;
        }
        
        const data = await response.json();
        setSejarah(data.tentang);
      } else {
        console.log('Sending geografis data:', editGeografis);
        
        response = await fetch(`${API_BASE_URL}/tentang/geografis`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(editGeografis)
        });
        
        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Gagal menyimpan perubahan: ${errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : 'Unknown error'}`);
          return;
        }
        
        const data = await response.json();
        setGeografis(data.tentang);
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan');
    }
  };

  const handleCancel = () => {
    if (activeSection === 'sejarah') {
      setEditContent(sejarah.konten);
    } else {
      setEditGeografis(geografis);
    }
    setEditMode(false);
  };

  const handleGeografisChange = (field, value) => {
    setEditGeografis(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.profil.tentang}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Tentang Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Mengenal lebih dalam tentang sejarah, kondisi geografis, dan karakteristik Desa Sidomulyo.</p>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSection('sejarah')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'sejarah'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            Sejarah Desa
          </button>
          <button
            onClick={() => setActiveSection('geografis')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'geografis'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            Kondisi Geografis
          </button>
        </div>

        {/* Content Section */}
        <div className="relative">
          {isAdmin && !editMode && (
            <div className="flex justify-end mb-4">
              <button 
                className="px-4 py-2 bg-primary text-white text-sm rounded-lg shadow hover:bg-blue-800 transition"
                onClick={handleEdit}
              >
                Edit {activeSection === 'sejarah' ? 'Sejarah' : 'Geografis'}
              </button>
            </div>
          )}

          {/* Sejarah Section */}
          {activeSection === 'sejarah' && (
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 lg:p-12">
              {editMode ? (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">{sejarah.judul}</h2>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-4 md:p-6 border-2 border-gray-200 rounded-xl text-lg text-gray-700 resize-none focus:border-primary focus:outline-none"
                    rows={12}
                    placeholder="Masukkan konten sejarah desa..."
                  />
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button 
                      className="px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition text-sm md:text-base"
                      onClick={handleSave}
                    >
                      Simpan Perubahan
                    </button>
                    <button 
                      className="px-4 md:px-6 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition text-sm md:text-base"
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">{sejarah.judul}</h2>
                  {sejarah.gambar && (
                    <div className="mb-8 text-center">
                      <img 
                        src={sejarah.gambar} 
                        alt="Sejarah Desa" 
                        className="max-w-full h-auto rounded-xl shadow-lg mx-auto"
                      />
                    </div>
                  )}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                      {sejarah.konten}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      Terakhir diperbarui: {new Date(sejarah.updatedAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Geografis Section */}
          {activeSection === 'geografis' && (
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 lg:p-12">
              {editMode ? (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">{geografis.judul}</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Batas Utara</label>
                      <input
                        type="text"
                        value={editGeografis.batasUtara || ''}
                        onChange={(e) => handleGeografisChange('batasUtara', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: Desa ABC"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Batas Selatan</label>
                      <input
                        type="text"
                        value={editGeografis.batasSelatan || ''}
                        onChange={(e) => handleGeografisChange('batasSelatan', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: Desa XYZ"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Batas Barat</label>
                      <input
                        type="text"
                        value={editGeografis.batasBarat || ''}
                        onChange={(e) => handleGeografisChange('batasBarat', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: Desa DEF"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Batas Timur</label>
                      <input
                        type="text"
                        value={editGeografis.batasTimur || ''}
                        onChange={(e) => handleGeografisChange('batasTimur', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: Desa GHI"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Luas Wilayah</label>
                      <input
                        type="text"
                        value={editGeografis.luasWilayah || ''}
                        onChange={(e) => handleGeografisChange('luasWilayah', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: 500 hektar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Jumlah Penduduk</label>
                      <input
                        type="text"
                        value={editGeografis.jumlahPenduduk || ''}
                        onChange={(e) => handleGeografisChange('jumlahPenduduk', e.target.value)}
                        className="w-full p-2 md:p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
                        placeholder="Contoh: 2.500 jiwa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Deskripsi Kondisi Geografis</label>
                    <textarea
                      value={editGeografis.konten || ''}
                      onChange={(e) => handleGeografisChange('konten', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg text-gray-700 resize-none focus:border-primary focus:outline-none"
                      rows={8}
                      placeholder="Masukkan deskripsi kondisi geografis desa..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button 
                      className="px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition text-sm md:text-base"
                      onClick={handleSave}
                    >
                      Simpan Perubahan
                    </button>
                    <button 
                      className="px-4 md:px-6 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition text-sm md:text-base"
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">{geografis.judul}</h2>
                  
                  {geografis.gambar && (
                    <div className="mb-8 text-center">
                      <img 
                        src={geografis.gambar} 
                        alt="Peta Desa" 
                        className="max-w-full h-auto rounded-xl shadow-lg mx-auto"
                      />
                    </div>
                  )}

                  {/* Informasi Batas Wilayah */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">Batas Wilayah</h3>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Utara:</span>
                          <span className="text-gray-900">{geografis.batasUtara}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Selatan:</span>
                          <span className="text-gray-900">{geografis.batasSelatan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Barat:</span>
                          <span className="text-gray-900">{geografis.batasBarat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Timur:</span>
                          <span className="text-gray-900">{geografis.batasTimur}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">Informasi Umum</h3>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Luas Wilayah:</span>
                          <span className="text-gray-900">{geografis.luasWilayah}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Jumlah Penduduk:</span>
                          <span className="text-gray-900">{geografis.jumlahPenduduk}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi Geografis */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">Deskripsi Kondisi Geografis</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {geografis.konten}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      Terakhir diperbarui: {new Date(geografis.updatedAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 