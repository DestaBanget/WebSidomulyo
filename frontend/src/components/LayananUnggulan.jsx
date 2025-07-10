import React from 'react';

const layanan = [
  {
    title: 'Surat Keterangan Umum',
    icon: '📑',
    desc: 'Permohonan surat keterangan untuk berbagai keperluan umum.',
  },
  {
    title: 'Surat Domisili',
    icon: '🏡',
    desc: 'Surat keterangan domisili untuk keperluan administrasi.',
  },
  {
    title: 'SKTM',
    icon: '💳',
    desc: 'Surat Keterangan Tidak Mampu untuk bantuan sosial atau pendidikan.',
  },
  {
    title: 'Akta Kelahiran/Kematian',
    icon: '📝',
    desc: 'Pengantar pembuatan akta kelahiran atau kematian.',
  },
  {
    title: 'Pengantar KK Baru',
    icon: '👪',
    desc: 'Surat pengantar untuk pembuatan Kartu Keluarga baru.',
  },
  {
    title: 'Surat Keterangan Beda Nama',
    icon: '🔖',
    desc: 'Surat keterangan untuk perbedaan nama pada dokumen.',
  },
];

export default function LayananUnggulan() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 animate-fadeInUp">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center tracking-tight drop-shadow-lg">Layanan Unggulan Desa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {layanan.map((l) => (
          <div
            key={l.title}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 group animate-fadeInUp"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-lg">{l.icon}</div>
            <div className="font-bold text-lg text-gray-700 mb-2 tracking-tight">{l.title}</div>
            <div className="text-gray-500 text-base font-medium">{l.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="#"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 animate-bounce text-lg"
        >
          Ajukan Surat Sekarang
        </a>
      </div>
    </section>
  );
} 