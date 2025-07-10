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

export default function StatistikDesa() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
    </section>
  );
} 