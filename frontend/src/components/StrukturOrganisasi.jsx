import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';
import images from '../config/images';

// Fungsi helper untuk mendapatkan URL foto yang benar
const getFotoUrl = (fotoPath) => {
  if (!fotoPath) return null;
  
  // Jika sudah full URL, gunakan langsung
  if (fotoPath.startsWith('http://') || fotoPath.startsWith('https://')) {
    return fotoPath;
  }
  
  // Jika data URL (base64), gunakan langsung
  if (fotoPath.startsWith('data:')) {
    return fotoPath;
  }
  
  // Jika path relatif, tambahkan base URL backend
  if (fotoPath.startsWith('/')) {
    return `${API_BASE_URL.replace('/api', '')}${fotoPath}`;
  }
  
  // Jika tidak ada prefix, tambahkan /uploads/
  return `${API_BASE_URL.replace('/api', '')}/uploads/${fotoPath}`;
};

// Data default sebagai fallback
const strukturDefault = {
  kepalaDesa: {
    nama: 'Mulianto',
    jabatan: 'Kepala Desa',
    foto: '',
  },
  sekretaris: {
    nama: 'Sunarsih',
    jabatan: 'Sekretaris Desa',
    foto: '',
  },
  kaur: [
    { nama: 'Wahyu Nur H', jabatan: 'Kaur TU & Umum', foto: '' },
    { nama: 'Titin Juharnani', jabatan: 'Kaur Keuangan', foto: '' },
    { nama: 'Rachmad Irvan N.I', jabatan: 'Kaur Perencanaan', foto: '' },
  ],
  kasi: [
    { nama: 'M. Agus Wahyudi Z', jabatan: 'Kasi Pemerintahan', foto: '' },
    { nama: 'Muhammad Rifai', jabatan: 'Kasi Kesra', foto: '' },
    { nama: 'Subur', jabatan: 'Kasi Pelayanan', foto: '' },
  ],
  kasun: [
    { nama: 'M. Jamhuri', jabatan: 'Kasun Bareng', foto: '' },
    { nama: 'Fathul Mu\'in', jabatan: 'Kasun Tebelo', foto: '' },
    { nama: 'Eko Hendri S', jabatan: 'Kasun Mangunrejo', foto: '' },
    { nama: 'Saparu', jabatan: 'Kasun Sumberkreco', foto: '' },
  ],
};

function PersonBox({ nama, jabatan, foto, color }) {
  const fotoUrl = getFotoUrl(foto);

  return (
    <div className={`flex flex-col items-center p-4 rounded-lg border shadow bg-white min-w-[160px] max-w-[180px] ${color || ''}`}>
      <div className="w-22 h-22 min-w-[88px] min-h-[88px] max-w-[88px] max-h-[88px] rounded-full bg-gray-200 border-2 mb-3 overflow-hidden flex items-center justify-center">
        {fotoUrl ? <img src={fotoUrl} alt={nama} className="object-cover w-full h-full" /> : <span className="text-gray-400 text-3xl">👤</span>}
      </div>
      <div className="font-bold text-base md:text-lg text-center leading-tight mb-1">{jabatan}</div>
      <div className="text-base md:text-lg text-center font-bold text-gray-700 leading-tight break-words max-w-[120px]">{nama}</div>
    </div>
  );
}

function TextStructure({ struktur }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Kepala Desa */}
      <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300 flex flex-col items-center">
        <PersonBox {...struktur.kepalaDesa} />
      </div>
      {/* Sekretaris */}
      <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 flex flex-col items-center">
        <PersonBox {...struktur.sekretaris} />
      </div>
      {/* Kasi */}
      <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
        <h3 className="font-bold text-lg text-indigo-700 mb-3 text-center">Kasi (Kepala Seksi)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center">
          {struktur.kasi.map((item, idx) => (
            <PersonBox key={idx} {...item} />
          ))}
        </div>
      </div>
      {/* Kaur */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <h3 className="font-bold text-lg text-blue-700 mb-3 text-center">Kaur (Kepala Urusan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center">
          {struktur.kaur.map((item, idx) => (
            <PersonBox key={idx} {...item} />
          ))}
        </div>
      </div>
      {/* Kasun */}
      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
        <h3 className="font-bold text-lg text-green-700 mb-3 text-center">Kasun (Kepala Dusun)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 justify-items-center">
          {struktur.kasun.map((item, idx) => (
            <PersonBox key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StrukturOrganisasi() {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [struktur, setStruktur] = useState(strukturDefault);
  const [editStruktur, setEditStruktur] = useState(strukturDefault);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false); // Tambah state success

  // Fetch data dari API
  useEffect(() => {
    fetchStrukturData();
  }, []);

  const fetchStrukturData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching struktur data from:', `${API_BASE_URL}/struktur`);
      
      // Try multiple approaches to handle CORS issues
      let response = null;
      let data = null;
      
      // Approach 1: Try with default headers
      try {
        response = await fetch(`${API_BASE_URL}/struktur`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          data = await response.json();
          console.log('✅ API Response (approach 1):', data);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.log('❌ Approach 1 failed:', error.message);
        
        // Approach 2: Try without Content-Type header
        try {
          response = await fetch(`${API_BASE_URL}/struktur`, {
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            data = await response.json();
            console.log('✅ API Response (approach 2):', data);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        } catch (error2) {
          console.log('❌ Approach 2 failed:', error2.message);
          
          // Approach 3: Try with no headers
          try {
            response = await fetch(`${API_BASE_URL}/struktur`);
            
            if (response.ok) {
              data = await response.json();
              console.log('✅ API Response (approach 3):', data);
            } else {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
          } catch (error3) {
            console.log('❌ Approach 3 failed:', error3.message);
            throw new Error(`Semua pendekatan gagal. Error terakhir: ${error3.message}`);
          }
        }
      }
      
      // Transform data dari API ke format yang dibutuhkan frontend
      const transformedData = transformApiDataToFrontend(data.struktur);
      setStruktur(transformedData);
      setEditStruktur(transformedData);
      
    } catch (error) {
      console.error('Error fetching struktur:', error);
      setError(`Gagal memuat data dari server: ${error.message}. Menggunakan data default.`);
      // Gunakan data default jika API gagal
      setStruktur(strukturDefault);
      setEditStruktur(strukturDefault);
    } finally {
      setLoading(false);
    }
  };

  // Transform data dari API ke format frontend
  const transformApiDataToFrontend = (apiData) => {
    const transformed = {
      kepalaDesa: { nama: '', jabatan: 'Kepala Desa', foto: '' },
      sekretaris: { nama: '', jabatan: 'Sekretaris Desa', foto: '' },
      kaur: [],
      kasi: [],
      kasun: []
    };

    apiData.forEach(item => {
      const person = {
        id: item.id,
        nama: item.nama,
        jabatan: item.jabatan,
        foto: item.foto || ''
      };

      switch (item.tipe) {
        case 'kepala_desa':
          transformed.kepalaDesa = person;
          break;
        case 'sekretaris':
          transformed.sekretaris = person;
          break;
        case 'kaur':
          transformed.kaur.push(person);
          break;
        case 'kasi':
          transformed.kasi.push(person);
          break;
        case 'kasun':
          transformed.kasun.push(person);
          break;
      }
    });

    return transformed;
  };

  // Transform data frontend ke format API
  const transformFrontendDataToApi = (frontendData) => {
    const apiData = [];

    // Kepala Desa
    if (frontendData.kepalaDesa.nama) {
      apiData.push({
        id: frontendData.kepalaDesa.id,
        nama: frontendData.kepalaDesa.nama,
        jabatan: frontendData.kepalaDesa.jabatan,
        foto: frontendData.kepalaDesa.foto,
        fotoFile: frontendData.kepalaDesa.fotoFile,
        tipe: 'kepala_desa'
      });
    }

    // Sekretaris
    if (frontendData.sekretaris.nama) {
      apiData.push({
        id: frontendData.sekretaris.id,
        nama: frontendData.sekretaris.nama,
        jabatan: frontendData.sekretaris.jabatan,
        foto: frontendData.sekretaris.foto,
        fotoFile: frontendData.sekretaris.fotoFile,
        tipe: 'sekretaris'
      });
    }

    // Kaur
    frontendData.kaur.forEach(item => {
      if (item.nama) {
        apiData.push({
          id: item.id,
          nama: item.nama,
          jabatan: item.jabatan,
          foto: item.foto,
          fotoFile: item.fotoFile,
          tipe: 'kaur'
        });
      }
    });

    // Kasi
    frontendData.kasi.forEach(item => {
      if (item.nama) {
        apiData.push({
          id: item.id,
          nama: item.nama,
          jabatan: item.jabatan,
          foto: item.foto,
          fotoFile: item.fotoFile,
          tipe: 'kasi'
        });
      }
    });

    // Kasun
    frontendData.kasun.forEach(item => {
      if (item.nama) {
        apiData.push({
          id: item.id,
          nama: item.nama,
          jabatan: item.jabatan,
          foto: item.foto,
          fotoFile: item.fotoFile,
          tipe: 'kasun'
        });
      }
    });

    return apiData;
  };

  const handleEdit = () => {
    setEditStruktur(JSON.parse(JSON.stringify(struktur)));
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      const apiData = transformFrontendDataToApi(editStruktur);
      
      // Update setiap item ke API
      for (const item of apiData) {
        if (item.id) {
          // Update existing item
          const formData = new FormData();
          formData.append('nama', item.nama);
          formData.append('jabatan', item.jabatan);
          formData.append('tipe', item.tipe);
          
          // Jika ada foto baru, tambahkan ke FormData
          if (item.fotoFile) {
            formData.append('foto', item.fotoFile);
          }

          const response = await fetch(`${API_BASE_URL}/struktur/${item.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Gagal mengupdate ${item.jabatan}: ${errorData}`);
          }
        } else {
          // Create new item
          const formData = new FormData();
          formData.append('nama', item.nama);
          formData.append('jabatan', item.jabatan);
          formData.append('tipe', item.tipe);
          
          // Jika ada foto, tambahkan ke FormData
          if (item.fotoFile) {
            formData.append('foto', item.fotoFile);
          }

          const response = await fetch(`${API_BASE_URL}/struktur`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Gagal menambahkan ${item.jabatan}: ${errorData}`);
          }
        }
      }

      // Refresh data dari API
      await fetchStrukturData();
      setEditMode(false);
      setSuccess(true); // Ganti alert dengan setSuccess
      setTimeout(() => setSuccess(false), 3000); // Auto-hide setelah 3 detik
    } catch (error) {
      console.error('Error saving struktur:', error);
      setError(`Gagal menyimpan: ${error.message}`);
      setTimeout(() => setError(null), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditStruktur(JSON.parse(JSON.stringify(struktur)));
    setEditMode(false);
  };

  const handleStructureChange = (section, field, value, index = null) => {
    const newStruktur = JSON.parse(JSON.stringify(editStruktur));
    if (index !== null) {
      newStruktur[section][index][field] = value;
    } else {
      newStruktur[section][field] = value;
    }
    setEditStruktur(newStruktur);
  };

  const handlePhotoChange = (section, index = null, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validasi file
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar!');
      setTimeout(() => setError(null), 4000);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Ukuran file foto terlalu besar. Maksimal yang diperbolehkan adalah 5MB. Silakan pilih foto lain.');
      setTimeout(() => setError(null), 5000);
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const newStruktur = JSON.parse(JSON.stringify(editStruktur));
      if (index !== null) {
        newStruktur[section][index].foto = reader.result;
        newStruktur[section][index].fotoFile = file; // Simpan file asli untuk upload
      } else {
        newStruktur[section].foto = reader.result;
        newStruktur[section].fotoFile = file; // Simpan file asli untuk upload
      }
      setEditStruktur(newStruktur);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat struktur organisasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center font-semibold shadow flex items-center justify-center gap-2 animate-fade-in relative">
            <span className="text-2xl">🚫</span>
            <span className="text-lg md:text-xl font-bold">{error}</span>
            <button
              className="absolute right-3 top-1 text-red-500 hover:text-red-700 text-lg"
              onClick={() => setError(null)}
              aria-label="Tutup"
            >×</button>
          </div>
          <button 
            onClick={fetchStrukturData} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.profil.struktur}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Struktur Organisasi Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Bagan hierarki perangkat desa sesuai Peraturan Menteri Dalam Negeri No. 67/2017 & Perbup Malang No. 233/2019.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 text-center drop-shadow">Struktur Organisasi Desa</h1>
        {/* Error Pop-up */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center font-semibold shadow flex items-center justify-center gap-2 animate-fade-in relative">
            <span className="text-2xl">🚫</span>
            <span className="text-lg md:text-xl font-bold">{error}</span>
            <button
              className="absolute right-3 top-1 text-red-500 hover:text-red-700 text-lg"
              onClick={() => setError(null)}
              aria-label="Tutup"
            >×</button>
          </div>
        )}
        {/* Success Pop-up */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center font-semibold shadow animate-fade-in">
            Struktur organisasi berhasil disimpan!
          </div>
        )}
        {isAdmin && !editMode && (
          <div className="flex gap-4 justify-end mb-6">
            <button 
              className="px-4 py-2 bg-primary text-white rounded font-semibold text-sm hover:bg-blue-800 transition"
              onClick={handleEdit}
            >
              Edit Struktur
            </button>
          </div>
        )}

        {editMode && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-primary mb-4">Edit Struktur Organisasi</h3>
            {/* Kepala Desa */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kepala Desa</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={editStruktur.kepalaDesa.jabatan}
                    onChange={(e) => handleStructureChange('kepalaDesa', 'jabatan', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    value={editStruktur.kepalaDesa.nama}
                    onChange={(e) => handleStructureChange('kepalaDesa', 'nama', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange('kepalaDesa', null, e)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ukuran maksimal foto 5MB</p>
                  {editStruktur.kepalaDesa.foto && (
                    <img src={getFotoUrl(editStruktur.kepalaDesa.foto)} alt="foto kepala desa" className="mt-2 w-20 h-20 object-cover rounded-full border" />
                  )}
                </div>
              </div>
            </div>

            {/* Sekretaris */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Sekretaris Desa</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={editStruktur.sekretaris.jabatan}
                    onChange={(e) => handleStructureChange('sekretaris', 'jabatan', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    value={editStruktur.sekretaris.nama}
                    onChange={(e) => handleStructureChange('sekretaris', 'nama', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange('sekretaris', null, e)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ukuran maksimal foto 5MB</p>
                  {editStruktur.sekretaris.foto && (
                    <img src={getFotoUrl(editStruktur.sekretaris.foto)} alt="foto sekretaris" className="mt-2 w-20 h-20 object-cover rounded-full border" />
                  )}
                </div>
              </div>
            </div>

            {/* Kasi */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kasi (Kepala Seksi)</h4>
              {editStruktur.kasi.map((item, index) => (
                <div key={index} className="mb-4 p-3 bg-white rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => handleStructureChange('kasi', 'jabatan', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => handleStructureChange('kasi', 'nama', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange('kasi', index, e)}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">Ukuran maksimal foto 5MB</p>
                      {item.foto && (
                        <img src={getFotoUrl(item.foto)} alt={`foto ${item.jabatan}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Kaur */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kaur (Kepala Urusan)</h4>
              {editStruktur.kaur.map((item, index) => (
                <div key={index} className="mb-4 p-3 bg-white rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => handleStructureChange('kaur', 'jabatan', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => handleStructureChange('kaur', 'nama', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange('kaur', index, e)}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">Ukuran maksimal foto 5MB</p>
                      {item.foto && (
                        <img src={getFotoUrl(item.foto)} alt={`foto ${item.jabatan}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Kasun */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kasun (Kepala Dusun)</h4>
              {editStruktur.kasun.map((item, index) => (
                <div key={index} className="mb-4 p-3 bg-white rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => handleStructureChange('kasun', 'jabatan', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => handleStructureChange('kasun', 'nama', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange('kasun', index, e)}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">Ukuran maksimal foto 5MB</p>
                      {item.foto && (
                        <img src={getFotoUrl(item.foto)} alt={`foto ${item.jabatan}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-400 transition"
                onClick={handleCancel}
                disabled={saving}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        )}

        <TextStructure struktur={editMode ? editStruktur : struktur} />
      </div>
    </div>
  );
} 