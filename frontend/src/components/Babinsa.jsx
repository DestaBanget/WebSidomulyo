import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiCall, publicApiCall, uploadFile } from '../config/api';
import images from '../config/images';

export default function Babinsa() {
  // Ganti heroImg dengan images.lembaga.babinsa
  const heroImg = images.lembaga.babinsa;
  const { isAdmin } = useAuth();

  // State utama
  const [lembaga, setLembaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // Edit state untuk lembaga
  const [tentangEdit, setTentangEdit] = useState('');
  const [visiEdit, setVisiEdit] = useState('');
  const [misiEdit, setMisiEdit] = useState('');
  // Edit state untuk pengurus
  const [pengurusEdit, setPengurusEdit] = useState([]);
  const [editingPengurus, setEditingPengurus] = useState(null);
  // Edit state untuk unit kegiatan
  const [unitEdit, setUnitEdit] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null);

  // Fetch BABINSA data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await publicApiCall('/lembaga');
        const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
        if (!lembagaData) throw new Error('Data BABINSA tidak ditemukan di server');
        setLembaga(lembagaData);
        setTentangEdit(lembagaData.tentang || '');
        setVisiEdit(lembagaData.visi || '');
        setMisiEdit(lembagaData.misi || '');
        setPengurusEdit(lembagaData.pengurus || []);
        setUnitEdit(lembagaData.unit_kegiatan || []);
      } catch (err) {
        setError(err.message || 'Gagal mengambil data BABINSA');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle edit lembaga
  const handleEdit = () => {
    setTentangEdit(lembaga?.tentang || '');
    setVisiEdit(lembaga?.visi || '');
    setMisiEdit(lembaga?.misi || '');
    setPengurusEdit([...(lembaga?.pengurus || [])]);
    setUnitEdit([...(lembaga?.unit_kegiatan || [])]);
    setEditMode(true);
  };

  // Handle save lembaga
  const handleSave = async () => {
    if (!lembaga) return;
    setLoading(true);
    setError(null);
    try {
      await apiCall(`/lembaga/id/${lembaga.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          tentang: tentangEdit,
          visi: visiEdit,
          misi: misiEdit
        })
      });
      setEditMode(false);
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
      setLembaga(lembagaData);
    } catch (err) {
      setError(err.message || 'Gagal update data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setError(null);
    setEditingPengurus(null);
    setEditingUnit(null);
  };

  // CRUD Pengurus
  const handleAddPengurus = () => {
    const newPengurus = {
      id: Date.now(), // Temporary ID
      nama: '',
      jabatan: '',
      foto: null,
      isNew: true
    };
    setPengurusEdit([...pengurusEdit, newPengurus]);
    setEditingPengurus(newPengurus.id);
  };

  const handleEditPengurus = (pengurus) => {
    setEditingPengurus(pengurus.id);
  };

  const handleSavePengurus = async (pengurus) => {
    try {
      if (pengurus.isNew) {
        // Add new pengurus
        const formData = new FormData();
        formData.append('nama', pengurus.nama);
        formData.append('jabatan', pengurus.jabatan);
        if (pengurus.foto && pengurus.foto !== '/dummy-profile.png') {
          formData.append('foto', pengurus.foto);
        }
        await uploadFile(`/lembaga/${lembaga.id}/pengurus`, formData);
      } else {
        // Update existing pengurus
        const formData = new FormData();
        formData.append('nama', pengurus.nama);
        formData.append('jabatan', pengurus.jabatan);
        if (pengurus.foto && pengurus.foto !== '/dummy-profile.png') {
          formData.append('foto', pengurus.foto);
        }
        await uploadFile(`/lembaga/pengurus/${pengurus.id}`, formData, 'PUT');
      }
      setEditingPengurus(null);
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
      setLembaga(lembagaData);
      setPengurusEdit(lembagaData.pengurus || []);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan pengurus');
    }
  };

  const handleDeletePengurus = async (pengurusId) => {
    try {
      await apiCall(`/lembaga/pengurus/${pengurusId}`, { method: 'DELETE' });
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
      setLembaga(lembagaData);
      setPengurusEdit(lembagaData.pengurus || []);
    } catch (err) {
      setError(err.message || 'Gagal menghapus pengurus');
    }
  };

  const handlePengurusChange = (pengurusId, field, value) => {
    const updatedPengurus = pengurusEdit.map(p => 
      p.id === pengurusId ? { ...p, [field]: value } : p
    );
    setPengurusEdit(updatedPengurus);
  };

  const handlePengurusPhoto = (pengurusId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedPengurus = pengurusEdit.map(p =>
      p.id === pengurusId ? { ...p, foto: file } : p
    );
    setPengurusEdit(updatedPengurus);
  };

  // CRUD Unit Kegiatan
  const handleAddUnit = () => {
    const newUnit = {
      id: Date.now(),
      nama: '',
      icon: null,
      isNew: true
    };
    setUnitEdit([...unitEdit, newUnit]);
    setEditingUnit(newUnit.id);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit.id);
  };

  const handleSaveUnit = async (unit) => {
    try {
      if (unit.isNew) {
        // Add new unit
        const formData = new FormData();
        formData.append('nama', unit.nama);
        if (unit.icon && unit.icon !== '/dummy-unit.png') {
          formData.append('icon', unit.icon);
        }
        await uploadFile(`/lembaga/${lembaga.id}/unit-kegiatan`, formData);
      } else {
        // Update existing unit
        const formData = new FormData();
        formData.append('nama', unit.nama);
        if (unit.icon && unit.icon !== '/dummy-unit.png') {
          formData.append('icon', unit.icon);
        }
        await uploadFile(`/lembaga/unit-kegiatan/${unit.id}`, formData, 'PUT');
      }
      setEditingUnit(null);
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
      setLembaga(lembagaData);
      setUnitEdit(lembagaData.unit_kegiatan || []);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan unit kegiatan');
    }
  };

  const handleDeleteUnit = async (unitId) => {
    try {
      await apiCall(`/lembaga/unit-kegiatan/${unitId}`, { method: 'DELETE' });
      // Refresh data
      const data = await publicApiCall('/lembaga');
      const lembagaData = (data.lembaga || []).find(l => l.nama_lembaga && l.nama_lembaga.toLowerCase() === 'babinsa');
      setLembaga(lembagaData);
      setUnitEdit(lembagaData.unit_kegiatan || []);
    } catch (err) {
      setError(err.message || 'Gagal menghapus unit kegiatan');
    }
  };

  const handleUnitChange = (unitId, field, value) => {
    const updatedUnit = unitEdit.map(u => 
      u.id === unitId ? { ...u, [field]: value } : u
    );
    setUnitEdit(updatedUnit);
  };

  const handleUnitIcon = (unitId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedUnit = unitEdit.map(u =>
      u.id === unitId ? { ...u, icon: file } : u
    );
    setUnitEdit(updatedUnit);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!lembaga) return <div className="text-center py-20 text-red-600">Data BABINSA tidak ditemukan</div>;

  // Helper untuk misi (array/baris)
  const misiList = lembaga.misi ? lembaga.misi.split('\n').filter(Boolean) : [];

  // Helper untuk foto pengurus
  const getFotoUrl = (foto) => {
    if (!foto) return '/dummy-profile.png';
    if (foto instanceof File) return URL.createObjectURL(foto);
    if (typeof foto === 'string' && foto.startsWith('/uploads/')) return `http://localhost:5000${foto}`;
    return foto;
  };

  // Helper untuk icon unit kegiatan
  const getIconUrl = (icon) => {
    if (!icon) return '/dummy-unit.png';
    if (icon instanceof File) return URL.createObjectURL(icon);
    if (typeof icon === 'string' && icon.startsWith('/uploads/')) return `http://localhost:5000${icon}`;
    return icon;
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section dengan Background */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${heroImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">BABINSA</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Bintara Pembina Desa</p>
        </div>
      </div>
      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 relative -mt-0">
        {/* Admin Edit Button */}
        {isAdmin && !editMode && (
          <button
            className="absolute top-4 right-4 px-4 py-2 bg-primary text-white text-sm rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {editMode ? (
            <div className="space-y-8">
              {/* Tentang Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-primary">
                <div className="font-bold text-primary text-lg mb-3">
                  TENTANG BABINSA
                </div>
                <textarea
                  value={tentangEdit}
                  onChange={e => setTentangEdit(e.target.value)}
                  className="w-full p-4 border-2 border-primary/30 rounded-lg text-gray-700 bg-white focus:border-primary focus:outline-none transition-colors"
                  rows={4}
                  placeholder="Tulis tentang BABINSA di sini..."
                />
              </div>
              {/* Visi Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                <div className="font-bold text-green-600 text-lg mb-3">
                  VISI
                </div>
                <textarea
                  value={visiEdit}
                  onChange={e => setVisiEdit(e.target.value)}
                  className="w-full p-4 border-2 border-green-500/30 rounded-lg text-gray-700 bg-white focus:border-green-500 focus:outline-none transition-colors"
                  rows={3}
                  placeholder="Tulis visi BABINSA di sini..."
                />
              </div>
              {/* Misi Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                <div className="font-bold text-purple-600 text-lg mb-3">
                  MISI
                </div>
                <textarea
                  value={misiEdit}
                  onChange={e => setMisiEdit(e.target.value)}
                  className="w-full p-4 border-2 border-purple-500/30 rounded-lg text-gray-700 bg-white focus:border-purple-500 focus:outline-none transition-colors"
                  rows={5}
                  placeholder="Pisahkan misi dengan baris baru..."
                />
              </div>
              {/* Pengurus Edit Section */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border-l-4 border-orange-500">
                <div className="font-bold text-orange-600 text-lg mb-4 flex justify-between items-center">
                  <span>
                    PENGURUS
                  </span>
                  {isAdmin && (
                    <button
                      onClick={handleAddPengurus}
                      className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                    >
                      <span className="mr-1">+</span> Tambah Pengurus
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {pengurusEdit.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3">
                          <img 
                            src={getFotoUrl(p.foto)} 
                            alt={p.nama} 
                            className="w-24 h-24 rounded-full object-cover bg-gray-200 border-4 border-orange-100 hover:border-orange-300 transition-colors" 
                          />
                          {editingPengurus === p.id && (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => handlePengurusPhoto(p.id, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">Ganti Foto</div>
                              </div>
                            </>
                          )}
                        </div>
                        {editingPengurus === p.id ? (
                          <div className="w-full space-y-2">
                            <input
                              type="text"
                              value={p.nama}
                              onChange={e => handlePengurusChange(p.id, 'nama', e.target.value)}
                              className="w-full text-center font-bold text-gray-800 text-sm border-b-2 border-orange-300 bg-transparent focus:outline-none focus:border-orange-500"
                              placeholder="Nama"
                            />
                            <input
                              type="text"
                              value={p.jabatan}
                              onChange={e => handlePengurusChange(p.id, 'jabatan', e.target.value)}
                              className="w-full text-center text-xs text-gray-500 border-b-2 border-orange-300 bg-transparent focus:outline-none focus:border-orange-500"
                              placeholder="Jabatan"
                            />
                            <div className="flex gap-2 mt-3 justify-center">
                              <button
                                onClick={() => handleSavePengurus(p)}
                                className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                                title="Simpan"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => setEditingPengurus(null)}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors"
                                title="Batal"
                              >
                                ✕
                              </button>
                              {!p.isNew && (
                                <button
                                  onClick={() => handleDeletePengurus(p.id)}
                                  className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                                  title="Hapus"
                                >
                                  🗑
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full text-center">
                            <div className="font-bold text-gray-800 text-sm mb-1">{p.nama}</div>
                            <div className="text-xs text-gray-500 mb-3">{p.jabatan}</div>
                            {isAdmin && (
                              <button
                                onClick={() => handleEditPengurus(p)}
                                className="px-3 py-1 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Unit Kegiatan Edit Section */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-l-4 border-teal-500">
                <div className="font-bold text-teal-600 text-lg mb-4 flex justify-between items-center">
                  <span>
                    UNIT KEGIATAN
                  </span>
                  {isAdmin && (
                    <button
                      onClick={handleAddUnit}
                      className="px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                    >
                      <span className="mr-1">+</span> Tambah Unit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {unitEdit.map((u, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-teal-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3">
                          <img 
                            src={getIconUrl(u.icon)} 
                            alt={u.nama} 
                            className="w-16 h-16 object-contain bg-gray-50 rounded-lg border-2 border-teal-100 hover:border-teal-300 transition-colors" 
                          />
                          {editingUnit === u.id && (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleUnitIcon(u.id, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">Ganti Icon</div>
                              </div>
                            </>
                          )}
                        </div>
                        {editingUnit === u.id ? (
                          <div className="w-full space-y-2">
                            <input
                              type="text"
                              value={u.nama}
                              onChange={e => handleUnitChange(u.id, 'nama', e.target.value)}
                              className="w-full text-center text-sm text-gray-700 border-b-2 border-teal-300 bg-transparent focus:outline-none focus:border-teal-500"
                              placeholder="Nama Unit"
                            />
                            <div className="flex gap-2 mt-2 justify-center">
                              <button
                                onClick={() => handleSaveUnit(u)}
                                className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                                title="Simpan"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => setEditingUnit(null)}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors"
                                title="Batal"
                              >
                                ✕
                              </button>
                              {!u.isNew && (
                                <button
                                  onClick={() => handleDeleteUnit(u.id)}
                                  className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                                  title="Hapus"
                                >
                                  🗑
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full text-center">
                            <div className="font-bold text-gray-800 text-sm mb-1">{u.nama}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tombol Simpan/Batal */}
              <div className="flex gap-2 justify-end mt-8">
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
            <>
              {/* Tentang */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-primary mb-8">
                <div className="font-bold text-primary text-lg mb-3">TENTANG BABINSA</div>
                <div className="text-gray-700 whitespace-pre-line">{lembaga.tentang}</div>
              </div>
              {/* Visi */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500 mb-8">
                <div className="font-bold text-green-600 text-lg mb-3">VISI</div>
                <div className="text-gray-700 whitespace-pre-line">{lembaga.visi}</div>
              </div>
              {/* Misi */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 mb-8">
                <div className="font-bold text-purple-600 text-lg mb-3">MISI</div>
                <ol className="list-decimal ml-6 text-gray-700">
                  {misiList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ol>
              </div>
              {/* Pengurus */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border-l-4 border-orange-500 mb-8">
                <div className="font-bold text-orange-600 text-lg mb-4">PENGURUS</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(lembaga.pengurus || []).map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm flex flex-col items-center">
                      <img src={getFotoUrl(p.foto)} alt={p.nama} className="w-24 h-24 rounded-full object-cover bg-gray-200 border-4 border-orange-100 mb-3" />
                      <div className="font-bold text-gray-800 text-sm text-center">{p.nama}</div>
                      <div className="text-xs text-gray-500 text-center">{p.jabatan}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Unit Kegiatan */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-l-4 border-teal-500 mb-8">
                <div className="font-bold text-teal-600 text-lg mb-4">UNIT KEGIATAN</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {(lembaga.unit_kegiatan || []).map((u, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-teal-200 shadow-sm flex flex-col items-center">
                      <img src={getIconUrl(u.icon)} alt={u.nama} className="w-16 h-16 object-contain bg-gray-50 rounded-lg border-2 border-teal-100 mb-2" />
                      <div className="font-bold text-gray-800 text-sm text-center">{u.nama}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
} 