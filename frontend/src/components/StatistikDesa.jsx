import React from 'react';

const stats = [
  {
    title: 'Total Penduduk',
    value: '2.350',
    icon: '👨‍👩‍👧‍👦',
    breakdown: [
      { label: 'Laki-laki', value: '1.200', color: 'text-blue-600' },
      { label: 'Perempuan', value: '1.150', color: 'text-pink-500' },
    ],
  },
  {
    title: 'Jumlah Keluarga',
    value: '670',
    icon: '🏠',
  },
  {
    title: 'Surat Diproses Bulan Ini',
    value: '48',
    icon: '📄',
  },
  {
    title: 'Program Aktif',
    value: '3',
    icon: '🎯',
  },
];

const usia = [
  { label: '0-5 th', value: 210, color: 'bg-blue-200' },
  { label: '6-17 th', value: 480, color: 'bg-blue-400' },
  { label: '18-59 th', value: 1400, color: 'bg-blue-600' },
  { label: '60+ th', value: 260, color: 'bg-blue-900' },
];

const pendidikan = [
  { label: 'Tidak Sekolah', value: 120, color: 'bg-gray-300' },
  { label: 'SD', value: 700, color: 'bg-yellow-300' },
  { label: 'SMP', value: 600, color: 'bg-green-300' },
  { label: 'SMA', value: 650, color: 'bg-blue-300' },
  { label: 'Diploma/S1+', value: 280, color: 'bg-purple-300' },
];

const pekerjaan = [
  { label: 'Petani', value: 800, color: 'bg-green-500' },
  { label: 'Buruh', value: 400, color: 'bg-yellow-500' },
  { label: 'PNS', value: 120, color: 'bg-blue-500' },
  { label: 'Wiraswasta', value: 350, color: 'bg-pink-400' },
  { label: 'Pelajar/Mahasiswa', value: 480, color: 'bg-indigo-400' },
  { label: 'Lainnya', value: 200, color: 'bg-gray-400' },
];

const agama = [
  { label: 'Islam', value: 2100, color: 'bg-green-600' },
  { label: 'Kristen', value: 120, color: 'bg-blue-600' },
  { label: 'Katolik', value: 60, color: 'bg-red-600' },
  { label: 'Hindu', value: 30, color: 'bg-yellow-600' },
  { label: 'Buddha', value: 20, color: 'bg-purple-600' },
  { label: 'Lainnya', value: 20, color: 'bg-gray-600' },
];

const dusun = [
  { label: 'Dusun Krajan', value: 900, color: 'bg-blue-400' },
  { label: 'Dusun Timur', value: 800, color: 'bg-green-400' },
  { label: 'Dusun Barat', value: 650, color: 'bg-yellow-400' },
];

function BarStat({ data, total }) {
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-32 text-sm font-medium text-gray-700">{d.label}</span>
          <div className="flex-1 h-4 rounded-full overflow-hidden bg-gray-100">
            <div className={`${d.color} h-4`} style={{ width: `${(d.value / total) * 100}%` }} />
          </div>
          <span className="w-12 text-right text-sm font-semibold text-gray-700">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatistikDesa() {
  const heroImg = '/surat.jpg';
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Gradient Section - FULL WIDTH */}
      <div id="statistik-hero" className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden" style={{
        background: `url(${heroImg}) center/cover no-repeat`,
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-3 tracking-tight text-white">Statistik Desa Sidomulyo</h1>
          <div className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-4 text-white">Gambaran data kependudukan, pendidikan, pekerjaan, dan kehidupan sosial masyarakat Desa Sidomulyo secara visual dan informatif.</div>
          <div className="max-w-xl mx-auto text-base opacity-90 text-white">Statistik ini membantu pemerintah desa dan masyarakat untuk memahami perkembangan, kebutuhan, serta potensi desa secara lebih baik. Data di bawah ini merupakan data dummy yang akan diperbarui secara berkala.</div>
        </div>
      </div>
      {/* Statistik Cards & Bar Stats */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{s.title}</div>
              <div className="text-2xl font-bold text-primary mb-2">{s.value}</div>
              {s.breakdown && (
                <div className="flex flex-col gap-1 w-full">
                  {s.breakdown.map((b) => (
                    <div key={b.label} className="flex justify-between text-sm">
                      <span className={b.color}>{b.label}</span>
                      <span className={b.color}>{b.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-primary mb-4 text-lg">Statistik Usia</div>
            <BarStat data={usia} total={usia.reduce((a, b) => a + b.value, 0)} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-primary mb-4 text-lg">Statistik Pendidikan</div>
            <BarStat data={pendidikan} total={pendidikan.reduce((a, b) => a + b.value, 0)} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-primary mb-4 text-lg">Statistik Pekerjaan</div>
            <BarStat data={pekerjaan} total={pekerjaan.reduce((a, b) => a + b.value, 0)} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-primary mb-4 text-lg">Statistik Agama</div>
            <BarStat data={agama} total={agama.reduce((a, b) => a + b.value, 0)} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-primary mb-4 text-lg">Statistik Dusun</div>
            <BarStat data={dusun} total={dusun.reduce((a, b) => a + b.value, 0)} />
          </div>
        </div>
      </div>
    </div>
  );
} 