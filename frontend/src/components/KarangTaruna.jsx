import React from 'react';
const pengurus = [
  { nama: 'Nama Ketua', jabatan: 'Ketua', img: '/dummy-profile.png' },
  { nama: 'Nama Wakil Ketua', jabatan: 'Wakil Ketua', img: '/dummy-profile.png' },
  { nama: 'Nama Sekretaris', jabatan: 'Sekretaris', img: '/dummy-profile.png' },
  { nama: 'Nama Bendahara', jabatan: 'Bendahara', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 1', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 2', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 3', jabatan: 'Anggota', img: '/dummy-profile.png' },
  { nama: 'Nama Anggota 4', jabatan: 'Anggota', img: '/dummy-profile.png' },
];
const unit = [
  { nama: 'Unit Kegiatan 1', icon: '/dummy-unit.png' },
  { nama: 'Unit Kegiatan 2', icon: '/dummy-unit.png' },
  { nama: 'Unit Kegiatan 3', icon: '/dummy-unit.png' },
];
export default function KarangTaruna() {
  const heroImg = '/surat.jpg';
  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center text-center px-4 pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden" style={{background: `url(${heroImg}) center/cover no-repeat`, borderRadius: '0 0 2.5rem 2.5rem'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">Karang Taruna</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2 text-white">Karang Taruna adalah organisasi kepemudaan di tingkat desa yang berperan aktif dalam pembangunan masyarakat.</p>
        </div>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="font-bold text-primary mb-2">TENTANG KARANG TARUNA</div>
        <div className="text-gray-700 mb-6">Karang Taruna bertujuan mengembangkan potensi generasi muda dan meningkatkan kesejahteraan sosial masyarakat desa.</div>
        <div className="font-bold text-primary mb-2">VISI</div>
        <div className="text-gray-700 mb-6">Menjadi organisasi kepemudaan yang kreatif, inovatif, dan berdaya saing.</div>
        <div className="font-bold text-primary mb-2">MISI</div>
        <ol className="list-decimal ml-6 text-gray-700 mb-6">
          <li>Mengembangkan potensi dan kreativitas pemuda desa.</li>
          <li>Mendorong partisipasi aktif pemuda dalam pembangunan desa.</li>
          <li>Meningkatkan kepedulian sosial dan solidaritas antar pemuda.</li>
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
      </section>
    </div>
  );
} 