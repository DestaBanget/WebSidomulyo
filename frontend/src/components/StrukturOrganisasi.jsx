import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg border shadow bg-white min-w-[160px] max-w-[180px] ${color || ''}`}>
      <div className="w-22 h-22 min-w-[88px] min-h-[88px] max-w-[88px] max-h-[88px] rounded-full bg-gray-200 border-2 mb-3 overflow-hidden flex items-center justify-center">
        {foto ? <img src={foto} alt={nama} className="object-cover w-full h-full" /> : <span className="text-gray-400 text-3xl">👤</span>}
      </div>
      <div className="font-bold text-base md:text-lg text-center leading-tight mb-1">{jabatan}</div>
      <div className="text-base md:text-lg text-center font-bold text-gray-700 leading-tight">{nama}</div>
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

  const handleEdit = () => {
    setEditStruktur(JSON.parse(JSON.stringify(struktur)));
    setEditMode(true);
  };

  const handleSave = () => {
    setStruktur(editStruktur);
    setEditMode(false);
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
    const reader = new FileReader();
    reader.onloadend = () => {
      const newStruktur = JSON.parse(JSON.stringify(editStruktur));
      if (index !== null) {
        newStruktur[section][index].foto = reader.result;
      } else {
        newStruktur[section].foto = reader.result;
      }
      setEditStruktur(newStruktur);
    };
    reader.readAsDataURL(file);
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
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Struktur Organisasi Desa Sidomulyo</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Bagan hierarki perangkat desa sesuai Peraturan Menteri Dalam Negeri No. 67/2017 & Perbup Malang No. 233/2019.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 relative">
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
                  {editStruktur.kepalaDesa.foto && (
                    <img src={editStruktur.kepalaDesa.foto} alt="foto kepala desa" className="mt-2 w-20 h-20 object-cover rounded-full border" />
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
                  {editStruktur.sekretaris.foto && (
                    <img src={editStruktur.sekretaris.foto} alt="foto sekretaris" className="mt-2 w-20 h-20 object-cover rounded-full border" />
                  )}
                </div>
              </div>
            </div>
            {/* Kasi */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kasi (Kepala Seksi)</h4>
              {editStruktur.kasi.map((item, idx) => (
                <div key={idx} className="mb-4 p-3 bg-white rounded border grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      value={item.jabatan}
                      onChange={(e) => handleStructureChange('kasi', 'jabatan', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => handleStructureChange('kasi', 'nama', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange('kasi', idx, e)}
                      className="w-full"
                    />
                    {item.foto && (
                      <img src={item.foto} alt={`foto kasi ${idx+1}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Kaur */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kaur (Kepala Urusan)</h4>
              {editStruktur.kaur.map((item, idx) => (
                <div key={idx} className="mb-4 p-3 bg-white rounded border grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      value={item.jabatan}
                      onChange={(e) => handleStructureChange('kaur', 'jabatan', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => handleStructureChange('kaur', 'nama', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange('kaur', idx, e)}
                      className="w-full"
                    />
                    {item.foto && (
                      <img src={item.foto} alt={`foto kaur ${idx+1}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Kasun */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Kasun (Kepala Dusun)</h4>
              {editStruktur.kasun.map((item, idx) => (
                <div key={idx} className="mb-4 p-3 bg-white rounded border grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      value={item.jabatan}
                      onChange={(e) => handleStructureChange('kasun', 'jabatan', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => handleStructureChange('kasun', 'nama', e.target.value, idx)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange('kasun', idx, e)}
                      className="w-full"
                    />
                    {item.foto && (
                      <img src={item.foto} alt={`foto kasun ${idx+1}`} className="mt-2 w-20 h-20 object-cover rounded-full border" />
                    )}
                  </div>
                </div>
              ))}
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
        )}

        {/* Struktur Kotak-kotak */}
        {!editMode && <TextStructure struktur={struktur} />}
      </div>

      {/* Penjelasan */}
      <div className="max-w-3xl mx-auto px-4 pb-12 text-gray-700 text-base">
        <p className="mb-2">Gambar di atas adalah struktur organisasi dan tata kerja Pemerintah Desa Sidomulyo. Ini adalah bagan hierarki yang menunjukkan pembagian tugas dan tanggung jawab masing-masing perangkat desa, sesuai dengan aturan:</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Peraturan Menteri Dalam Negeri Nomor 67 Tahun 2017</li>
          <li>Peraturan Bupati Malang Nomor 233 Tahun 2019</li>
        </ul>
        <p>Setiap bagian memiliki tugas pokok dan fungsi masing-masing, yang saling mendukung dalam penyelenggaraan pemerintahan desa.</p>
      </div>
    </div>
  );
} 