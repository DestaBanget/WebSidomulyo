import React from 'react';
import { useParams } from 'react-router-dom';

// Data dummy surat masuk dengan data diri lengkap dan lampiran persyaratan
const dummySuratMasuk = [
  {
    id: 1,
    nama: 'Budi Santoso',
    nik: '3501010101010001',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Malang',
    tanggalLahir: '1990-01-01',
    pekerjaan: 'Karyawan Swasta',
    kewarganegaraan: 'Indonesia',
    agama: 'Islam',
    noHp: '081234567890',
    alamatKtp: 'Jl. Melati No. 1',
    alamatSekarang: 'Jl. Melati No. 1',
    jenis: 'Surat Keterangan Domisili',
    tanggal: '2024-06-10',
    status: 'Menunggu',
    lampiran: {
      'Foto copy KK dan KTP': '/dummy-kk-ktp.pdf',
      'Identitas Asli': '/dummy-identitas.jpg',
    },
  },
  {
    id: 2,
    nama: 'Siti Aminah',
    nik: '3501010101010002',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Blitar',
    tanggalLahir: '1985-05-12',
    pekerjaan: 'Wiraswasta',
    kewarganegaraan: 'Indonesia',
    agama: 'Islam',
    noHp: '081234567891',
    alamatKtp: 'Jl. Kenanga No. 2',
    alamatSekarang: 'Jl. Kenanga No. 2',
    jenis: 'Surat Keterangan Usaha',
    tanggal: '2024-06-09',
    status: 'Diproses',
    lampiran: {
      'Foto copy KK / KTP': '/dummy-kk-ktp.pdf',
      'Foto kegiatan usaha': '/dummy-usaha.jpg',
    },
  },
  {
    id: 3,
    nama: 'Joko Widodo',
    nik: '3501010101010003',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Surabaya',
    tanggalLahir: '1970-08-17',
    pekerjaan: 'Petani',
    kewarganegaraan: 'Indonesia',
    agama: 'Islam',
    noHp: '081234567892',
    alamatKtp: 'Jl. Mawar No. 3',
    alamatSekarang: 'Jl. Mawar No. 3',
    jenis: 'Surat Keterangan Tidak Mampu',
    tanggal: '2024-06-08',
    status: 'Selesai',
    lampiran: {
      'Foto copy KK dan KTP': '/dummy-kk-ktp.pdf',
      'Surat rekom RT/RW': '/dummy-rekom.pdf',
    },
  },
];

// Persyaratan surat (bisa diimpor dari mapping jika ingin dinamis)
const persyaratanMap = {
  'Surat Keterangan Domisili': [
    'Foto copy KK dan KTP',
    'Identitas Asli',
  ],
  'Surat Keterangan Usaha': [
    'Foto copy KK / KTP',
    'Foto kegiatan usaha',
  ],
  'Surat Keterangan Tidak Mampu': [
    'Foto copy KK dan KTP',
    'Surat rekom RT/RW',
  ],
};

export default function SuratDetail() {
  const { id } = useParams();
  const surat = dummySuratMasuk.find(s => String(s.id) === String(id));
  const persyaratan = surat ? (persyaratanMap[surat.jenis] || Object.keys(surat.lampiran || {})) : [];

  if (!surat) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Surat tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="w-full min-h-[200px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">Detail Surat Masuk</h1>
      </div>
      {/* Konten Detail */}
      <section className="max-w-2xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <div className="mb-6">
          <div className="font-bold text-primary text-lg mb-2">A. DATA DIRI</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-bold">Nama Lengkap:</span> {surat.nama}</div>
            <div><span className="font-bold">NIK:</span> {surat.nik}</div>
            <div><span className="font-bold">Jenis Kelamin:</span> {surat.jenisKelamin}</div>
            <div><span className="font-bold">Tempat, Tanggal Lahir:</span> {surat.tempatLahir}, {surat.tanggalLahir}</div>
            <div><span className="font-bold">Pekerjaan:</span> {surat.pekerjaan}</div>
            <div><span className="font-bold">Kewarganegaraan:</span> {surat.kewarganegaraan}</div>
            <div><span className="font-bold">Agama:</span> {surat.agama}</div>
            <div><span className="font-bold">No. HP:</span> {surat.noHp}</div>
            <div className="md:col-span-2"><span className="font-bold">Alamat KTP:</span> {surat.alamatKtp}</div>
            <div className="md:col-span-2"><span className="font-bold">Alamat Sekarang:</span> {surat.alamatSekarang}</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="font-bold text-primary text-lg mb-2">B. INFORMASI SURAT</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-bold">Jenis Surat:</span> {surat.jenis}</div>
            <div><span className="font-bold">Tanggal Pengajuan:</span> {surat.tanggal}</div>
            <div><span className="font-bold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${surat.status === 'Selesai' ? 'bg-green-100 text-green-700' : surat.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{surat.status}</span></div>
          </div>
        </div>
        <div>
          <div className="font-bold text-primary text-lg mb-2">C. LAMPIRAN PERSYARATAN</div>
          <div className="grid grid-cols-1 gap-3">
            {persyaratan.length === 0 && <div className="text-gray-500">Tidak ada lampiran persyaratan.</div>}
            {persyaratan.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="font-semibold">{p}:</span>
                {surat.lampiran && surat.lampiran[p] ? (
                  <a href={surat.lampiran[p]} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Lihat File</a>
                ) : (
                  <span className="text-gray-400">Tidak ada file</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 