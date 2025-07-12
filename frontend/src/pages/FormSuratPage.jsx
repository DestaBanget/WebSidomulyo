import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormSurat from '../components/FormSurat';

// Daftar jenis surat dan persyaratan
const JENIS_SURAT = [
  {
    label: 'Surat Keterangan Usaha',
    persyaratan: [
      'Foto copy KK / KTP',
      'Foto kegiatan usaha',
    ],
  },
  {
    label: 'Surat Keterangan Domisili',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Apabila penduduk luar desa membawa identitas yang asli',
    ],
  },
  {
    label: 'Surat Keterangan Tidak Mampu (SKTM)',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Surat / rekom dari RT/RW bahwa tidak mampu',
    ],
  },
  {
    label: 'Surat Keterangan Kematian',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Surat dari dokter / bidan / perawat',
    ],
  },
  {
    label: 'Surat Keterangan Kelahiran',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Surat dari dokter / bidan / perawat',
    ],
  },
  {
    label: 'Surat Keterangan Ahli Waris',
    persyaratan: [
      'Foto copy KK dan KTP semua ahli waris',
      'Akte kematian',
      'Dll berkas pendukung (riwayat waris, legal hasil)',
    ],
  },
  {
    label: 'Surat Keterangan Izin Keramaian',
    persyaratan: [
      'Foto copy KTP / KK (penanggung jawab & panitia)',
      'Nomor Induk Kelompok Kesenian / Budaya / Keagamaan',
    ],
  },
  {
    label: 'Surat Keterangan Beda Nama',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Foto copy buku nikah',
      'Foto copy ijazah',
      'Foto copy akta kelahiran',
    ],
  },
  {
    label: 'Surat Kehilangan / Kepemilikan',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Apabila kehilangan buku nikah harus suami istri hadir',
    ],
  },
  {
    label: 'Surat Keterangan Riwayat Tanah / Pertanahan',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Bukti SPPT',
    ],
  },
  {
    label: 'Surat Keterangan Bepergian / Buruh Kerja',
    persyaratan: [
      'Foto copy KK dan KTP',
      'Suami / istri bermaterai apabila bekerja di luar negeri',
    ],
  },
  {
    label: 'Surat Keterangan Menikah / Belum Menikah',
    persyaratan: [
      'Alamat tujuan (domisili tujuan)',
      'Foto copy KK dan KTP',
      'Foto copy buku nikah',
      'Foto copy ijazah',
      'Foto copy akta kelahiran',
    ],
  },
  {
    label: 'Surat Keterangan Domisili Lembaga',
    persyaratan: [
      'Pengurus (ketua)',
      'KTP pengurus',
      'Nomor Induk Lembaga dari Dinas / Kemenag',
    ],
  },
  {
    label: 'KTP Baru / Perubahan',
    persyaratan: [
      'Foto copy KK',
      'KTP asli',
      'Membawa HP',
    ],
  },
  {
    label: 'Kartu Keluarga (KK) Baru / Perubahan / Penambahan Anggota',
    persyaratan: [
      'KK asli',
      'Buku nikah asli dan foto copy',
      'Surat kelahiran dari dokter / bidan (asli dan fotocopy)',
      'Ijazah asli dan foto copy',
      'Akta kelahiran',
      'Akta kematian',
      'Surat pindah penduduk / SKPWNI',
    ],
  },
  {
    label: 'Surat Pindah Tempat / Domisili',
    persyaratan: [
      'KTP dan KK asli dan foto copy',
      'Foto copy buku nikah / akta',
      'Foto copy KTP/KK tempat yang dituju (tempat tujuan pindah)',
      'Surat keterangan pindah / SKPWNI',
    ],
  },
  {
    label: 'Akta Kelahiran',
    persyaratan: [
      'KK asli dan foto copy',
      'KTP asli pemohon, orang tua dan foto copy',
      'Buku nikah asli dan foto copy',
      'Surat kelahiran dari dokter / bidan / SPTJM',
      'Materai 10.000',
    ],
  },
  {
    label: 'Akta Kematian',
    persyaratan: [
      'KK asli dan foto copy',
      'KTP asli pemohon dan foto copy',
      'Surat kematian dari dokter / bidan / SPTJM',
      'Materai 10.000',
    ],
  },
  {
    label: 'Kartu Identitas Anak (KIA)',
    persyaratan: [
      'KTP asli orang tua dan foto copy',
      'KK asli dan foto copy',
      'Akta kelahiran asli dan foto copy',
      'Pas foto 4x6 (2 lembar)',
      'Kelahiran ganjil: merah',
      'Kelahiran genap: biru',
    ],
  },
];

function getJenisSuratByLabel(label) {
  return JENIS_SURAT.find(js => js.label === label);
}

export default function FormSuratPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jenisParam = params.get('jenis');
  const selectedJenis = jenisParam ? getJenisSuratByLabel(jenisParam) : null;
  const [selected, setSelected] = useState(selectedJenis ? JENIS_SURAT.indexOf(selectedJenis) : null);

  // Hero section style
  const heroTitle = selectedJenis ? selectedJenis.label : 'Form Surat Online';
  const heroSubtitle = selectedJenis ? `Formulir ${selectedJenis.label}` : 'Silakan pilih jenis surat yang ingin diajukan';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[320px] md:min-h-[380px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg uppercase tracking-tight">
            {heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-2 md:mb-4">
            {heroSubtitle}
          </p>
        </div>
      </div>
      {/* Form Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {selectedJenis ? (
          <FormSurat
            jenisSurat={selectedJenis.label}
            persyaratan={selectedJenis.persyaratan}
          />
        ) : (
          <>
            <div className="mb-6 max-w-xl mx-auto">
              <label className="block mb-2 font-semibold text-gray-700">Pilih Jenis Surat</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={selected || ''}
                onChange={e => setSelected(e.target.value)}
              >
                <option value="">-- Pilih Jenis Surat --</option>
                {JENIS_SURAT.map((js, idx) => (
                  <option value={idx} key={js.label}>{js.label}</option>
                ))}
              </select>
            </div>
            {selected !== null && selected !== '' && (
              <FormSurat
                jenisSurat={JENIS_SURAT[selected].label}
                persyaratan={JENIS_SURAT[selected].persyaratan}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 