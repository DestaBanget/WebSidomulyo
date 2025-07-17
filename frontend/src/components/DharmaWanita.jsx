import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const pengurusDefault = [
  { nama: 'Nama Ketua', jabatan: 'Ketua', img: '/dummy-profile.png' },
  { nama: 'Nama Wakil Ketua', jabatan: 'Wakil Ketua', img: '/dummy-profile.png' },
  { nama: 'Nama Sekretaris', jabatan: 'Sekretaris', img: '/dummy-profile.png' },
  { nama: 'Nama Bendahara', jabatan: 'Bendahara', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 1', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 2', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 3', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 4', jabatan: 'Anggota', img: '/dummy-profile.png' },
];
const unitDefault = [
  { nama: 'Unit Kegiatan 1', icon: '/dummy-unit.png' },
  { nama: 'Unit Kegiatan 2', icon: '/dummy-unit.png' },
  { nama: 'Unit Kegiatan 3', icon: '/dummy-unit.png' },
];

export default function DharmaWanita() {
  const heroImg = '/surat.jpg';
  const { isAdmin } = useAuth();

  // State utama
  const [tentang, setTentang] = useState('Dharma Wanita adalah organisasi istri aparatur sipil negara yang berperan aktif dalam kegiatan sosial, pendidikan, dan pemberdayaan keluarga di desa.');
  const [visi, setVisi] = useState('Menjadi organisasi perempuan yang berdaya, peduli, dan berkontribusi untuk kemajuan desa.');
  const [misi, setMisi] = useState([
    'Meningkatkan peran perempuan dalam pembangunan desa.',
    'Mendorong kegiatan sosial dan pendidikan keluarga.',
    'Membangun solidaritas dan kepedulian antar anggota.'
  ]);
  const [pengurus, setPengurus] = useState(pengurusDefault);
  const [unit, setUnit] = useState(unitDefault);

  // State edit
  const [editMode, setEditMode] = useState(false);
  const [tentangEdit, setTentangEdit] = useState(tentang);
  const [visiEdit, setVisiEdit] = useState(visi);
  const [misiEdit, setMisiEdit] = useState(misi.join('\n'));
  const [pengurusEdit, setPengurusEdit] = useState([...pengurus]);
  const [unitEdit, setUnitEdit] = useState([...unit]);

  const handleEdit = () => {
    setTentangEdit(tentang);
    setVisiEdit(visi);
    setMisiEdit(misi.join('\n'));
    setPengurusEdit(JSON.parse(JSON.stringify(pengurus)));
    setUnitEdit(JSON.parse(JSON.stringify(unit)));
    setEditMode(true);
  };

  const handleSave = () => {
    setTentang(tentangEdit);
    setVisi(visiEdit);
    setMisi(misiEdit.split('\n').map(line => line.trim()).filter(Boolean));
    setPengurus(pengurusEdit);
    setUnit(unitEdit);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTentangEdit(tentang);
    setVisiEdit(visi);
    setMisiEdit(misi.join('\n'));
    setPengurusEdit(JSON.parse(JSON.stringify(pengurus)));
    setUnitEdit(JSON.parse(JSON.stringify(unit)));
    setEditMode(false);
  };

  const handlePengurusChange = (idx, field, value) => {
    const newPengurus = [...pengurusEdit];
    newPengurus[idx][field] = value;
    setPengurusEdit(newPengurus);
  };
  const handlePengurusPhoto = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPengurus = [...pengurusEdit];
      newPengurus[idx].img = reader.result;
      setPengurusEdit(newPengurus);
    };
    reader.readAsDataURL(file);
  };
  const handleUnitChange = (idx, field, value) => {
    const newUnit = [...unitEdit];
    newUnit[idx][field] = value;
    setUnitEdit(newUnit);
  };
  const handleUnitIcon = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newUnit = [...unitEdit];
      newUnit[idx].icon = reader.result;
      setUnitEdit(newUnit);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center text-center px-4 pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden" style={{background: `url(${heroImg}) center/cover no-repeat`, borderRadius: '0 0 2.5rem 2.5rem'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">Dharma Wanita</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2 text-white">Dharma Wanita adalah organisasi istri ASN yang aktif dalam kegiatan sosial dan pendidikan di desa.</p>
        </div>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-10 relative">
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
              <div className="font-bold text-primary mb-2">TENTANG DHARMA WANITA</div>
              <textarea
                value={tentangEdit}
                onChange={e => setTentangEdit(e.target.value)}
                className="w-full p-3 border-2 border-primary rounded-lg text-gray-700 mb-4"
                rows={3}
              />
            </div>
            <div>
              <div className="font-bold text-primary mb-2">VISI</div>
              <textarea
                value={visiEdit}
                onChange={e => setVisiEdit(e.target.value)}
                className="w-full p-3 border-2 border-primary rounded-lg text-gray-700 mb-4"
                rows={2}
              />
            </div>
            <div>
              <div className="font-bold text-primary mb-2">MISI</div>
              <textarea
                value={misiEdit}
                onChange={e => setMisiEdit(e.target.value)}
                className="w-full p-3 border-2 border-primary rounded-lg text-gray-700 mb-4"
                rows={4}
                placeholder="Pisahkan misi dengan baris baru"
              />
            </div>
            <div>
              <div className="font-bold text-primary mb-2">PENGURUS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {pengurusEdit.map((p, i) => (
                  <div key={i} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handlePengurusPhoto(i, e)}
                      className="mb-2"
                    />
                    <img src={p.img} alt={p.nama} className="w-20 h-20 rounded-lg object-cover bg-gray-200 mb-2" />
                    <input
                      type="text"
                      value={p.nama}
                      onChange={e => handlePengurusChange(i, 'nama', e.target.value)}
                      className="w-full text-center font-bold text-gray-800 text-sm mb-1 border-b border-primary bg-transparent"
                    />
                    <input
                      type="text"
                      value={p.jabatan}
                      onChange={e => handlePengurusChange(i, 'jabatan', e.target.value)}
                      className="w-full text-center text-xs text-gray-500 border-b border-primary bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold text-primary mb-2">UNIT KEGIATAN</div>
              <div className="flex gap-6 flex-wrap">
                {unitEdit.map((u, i) => (
                  <div key={i} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleUnitIcon(i, e)}
                      className="mb-2"
                    />
                    <img src={u.icon} alt={u.nama} className="w-12 h-12 object-contain mb-1" />
                    <input
                      type="text"
                      value={u.nama}
                      onChange={e => handleUnitChange(i, 'nama', e.target.value)}
                      className="w-full text-center text-sm text-gray-700 border-b border-primary bg-transparent"
                    />
                  </div>
                ))}
              </div>
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
          <>
        <div className="font-bold text-primary mb-2">TENTANG DHARMA WANITA</div>
            <div className="text-gray-700 mb-6">{tentang}</div>
        <div className="font-bold text-primary mb-2">VISI</div>
            <div className="text-gray-700 mb-6">{visi}</div>
        <div className="font-bold text-primary mb-2">MISI</div>
        <ol className="list-decimal ml-6 text-gray-700 mb-6">
              {misi.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
        </ol>
        <div className="font-bold text-primary mb-2">PENGURUS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {pengurus.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={p.img} alt={p.nama} className="w-24 h-24 rounded-lg object-cover bg-gray-200 mb-2" />
              <div className="font-bold text-gray-800 text-sm text-center">{p.nama}</div>
              <div className="text-xs text-gray-500 text-center">{p.jabatan}</div>
            </div>
          ))}
        </div>
        <div className="font-bold text-primary mb-2">UNIT KEGIATAN</div>
        <div className="flex gap-6 flex-wrap">
          {unit.map((u, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={u.icon} alt={u.nama} className="w-12 h-12 object-contain mb-1" />
              <div className="text-sm text-gray-700">{u.nama}</div>
            </div>
          ))}
        </div>
          </>
        )}
      </section>
    </div>
  );
} 