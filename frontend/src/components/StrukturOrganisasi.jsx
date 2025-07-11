import React from 'react';

const struktur = {
  kepalaDesa: {
    nama: 'Mulianto',
    jabatan: 'Kepala Desa',
    foto: '', // isi url foto jika ada
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
    { nama: 'Fathul Mu’in', jabatan: 'Kasun Tebelo', foto: '' },
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

export default function StrukturOrganisasi() {
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
      {/* Bagan Hierarki */}
      <div className="flex flex-col items-center py-12 px-2 w-full overflow-x-auto relative">
        {/* Kepala Desa */}
        <div className="flex flex-row items-start justify-center w-full max-w-5xl relative">
          {/* Garis horizontal utama dari Kepala Desa ke Kasi dan Sekretaris */}
          <div className="absolute left-1/4 right-1/4 top-24 h-0.5 bg-gray-500 z-0" style={{height: '4px'}} />
          {/* Kepala Desa di tengah */}
          <div className="flex flex-col items-center z-10" style={{flex: 1}}>
            <PersonBox {...struktur.kepalaDesa} color="bg-yellow-100" />
            {/* Garis vertikal ke horizontal utama */}
            <div className="w-1 h-16 bg-gray-500" />
          </div>
          {/* Sekretaris Desa di kanan, sedikit lebih rendah, dengan garis horizontal dari Kepala Desa */}
          <div className="flex flex-col items-center ml-8 mt-24 z-10" style={{flex: 1}}>
            <PersonBox {...struktur.sekretaris} color="bg-yellow-50" />
            {/* Garis vertikal ke Kaur */}
            <div className="w-1 h-10 bg-gray-500" />
          </div>
        </div>
        {/* Baris Kasi dan Kaur */}
        <div className="flex flex-row items-start justify-center w-full max-w-5xl mt-2 gap-16 relative">
          {/* Garis horizontal untuk Kasi */}
          <div className="absolute left-0 right-1/2 top-8 h-0.5 bg-gray-500 z-0" style={{height: '4px', width: '50%'}} />
          {/* Kasi - langsung dari Kepala Desa */}
          <div className="flex flex-row gap-10 z-10">
            {struktur.kasi.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Garis vertikal dari horizontal utama ke Kasi */}
                <div className="w-1 h-10 bg-gray-500" />
                <PersonBox {...item} color="bg-indigo-50" />
              </div>
            ))}
          </div>
          {/* Garis horizontal untuk Kaur */}
          <div className="absolute left-1/2 right-0 top-8 h-0.5 bg-gray-500 z-0" style={{height: '4px', width: '50%'}} />
          {/* Kaur - di bawah Sekretaris */}
          <div className="flex flex-row gap-10 z-10 ml-16">
            {struktur.kaur.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Garis vertikal dari Sekretaris ke Kaur */}
                <div className="w-1 h-10 bg-gray-500" />
                <PersonBox {...item} color="bg-blue-50" />
              </div>
            ))}
          </div>
        </div>
        {/* Kepala Dusun (Kasun) di baris paling bawah, garis dari Kepala Desa */}
        <div className="mt-12 flex flex-col items-center w-full">
          {/* Garis horizontal dari Kepala Desa ke Kasun */}
          <div className="w-3/4 h-1 bg-gray-500 mb-2" style={{marginLeft: '12.5%'}} />
          <div className="font-bold text-base mb-2">Kepala Dusun:</div>
          <div className="flex flex-row flex-wrap gap-10 justify-center w-full max-w-4xl">
            {struktur.kasun.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Garis vertikal dari horizontal ke Kasun */}
                <div className="w-1 h-10 bg-gray-500" />
                <PersonBox {...item} color="bg-green-50" />
              </div>
            ))}
          </div>
        </div>
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