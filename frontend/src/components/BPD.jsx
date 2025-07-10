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
export default function BPD() {
  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[320px] md:min-h-[420px]" style={{background:'linear-gradient(180deg, rgba(30,64,175,0.85) 0%, rgba(30,64,175,0.0) 100%)'}}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">BPD</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Badan Permusyawaratan Desa (BPD) adalah lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa.</p>
        </div>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="font-bold text-primary mb-2">TENTANG BPD</div>
        <div className="text-gray-700 mb-6">BPD adalah lembaga desa yang berfungsi menampung dan menyalurkan aspirasi masyarakat desa serta melakukan pengawasan terhadap penyelenggaraan pemerintahan desa.</div>
        <div className="font-bold text-primary mb-2">VISI</div>
        <div className="text-gray-700 mb-6">Menjadi lembaga yang profesional, transparan, dan akuntabel dalam mewujudkan tata kelola pemerintahan desa yang baik.</div>
        <div className="font-bold text-primary mb-2">MISI</div>
        <ol className="list-decimal ml-6 text-gray-700 mb-6">
          <li>Meningkatkan partisipasi masyarakat dalam pembangunan desa.</li>
          <li>Mengawasi jalannya pemerintahan desa secara transparan.</li>
          <li>Menampung dan menyalurkan aspirasi masyarakat.</li>
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