import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormSurat from '../components/FormSurat';
import images from '../config/images';

// Daftar jenis surat dan persyaratan
const JENIS_SURAT = [
  {
    label: 'Surat Keterangan Usaha',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Foto kegiatan usaha',
    ],
  },
  {
    label: 'Surat Keterangan Domisili',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Jika penduduk luar desa, wajib membawa identitas asli',
    ],
  },
  {
    label: 'Surat Keterangan Tidak Mampu (SKTM)',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Surat/rekomendasi dari RT/RW bahwa tidak mampu',
    ],
  },
  {
    label: 'Surat Keterangan Kematian',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Surat keterangan kematian dari dokter/bidan/perawat',
    ],
  },
  {
    label: 'Surat Keterangan Kelahiran',
    persyaratan: [
      'Fotokopi KK dan KTP orang tua',
      'Surat keterangan lahir dari bidan/rumah sakit',
      'Pas foto 4x6 (2 lembar, warna sesuai tanggal lahir: merah untuk ganjil, biru untuk genap)',
    ],
  },
  {
    label: 'Surat Keterangan Ahli Waris',
    persyaratan: [
      'Fotokopi KK dan KTP semua ahli waris',
      'Akte kematian',
      'Berkas pendukung (riwayat waris, dokumen legal hasil, dsb.)',
    ],
  },
  {
    label: 'Surat Keterangan Izin Keramaian',
    persyaratan: [
      'Fotokopi KTP/KK penanggung jawab & panitia',
      'Nomor Induk Kelompok Kesenian/Budaya/Keagamaan',
    ],
  },
  {
    label: 'Surat Keterangan Beda Nama',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Fotokopi buku nikah',
      'Fotokopi ijazah',
      'Fotokopi akta kelahiran',
    ],
  },
  {
    label: 'Surat Kehilangan / Kepemilikan',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Jika kehilangan buku nikah, suami dan istri wajib hadir bersama saat pengajuan',
    ],
  },
  {
    label: 'Surat Keterangan Riwayat Tanah / Pertanahan',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Bukti SPPT',
    ],
  },
  {
    label: 'Surat Keterangan Bepergian / Buruh Kerja',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Alamat tujuan (domisili tujuan) yang jelas',
      'Jika suami/istri bekerja di luar negeri, wajib membuat surat pernyataan bermaterai',
    ],
  },
  {
    label: 'Surat Keterangan Menikah / Belum Menikah',
    persyaratan: [
      'Fotokopi KK dan KTP',
      'Fotokopi buku nikah',
      'Fotokopi ijazah',
      'Fotokopi akta kelahiran',
    ],
  },
  {
    label: 'Surat Keterangan Domisili Lembaga',
    persyaratan: [
      'Fotokopi KTP pengurus (ketua)',
      'Nomor Induk Lembaga dari Dinas/Kemenag',
    ],
  },
  {
    label: 'KTP Baru / Perubahan',
    persyaratan: [
      'Fotokopi KK',
      'KTP asli (jika ada)',
    ],
  },
  {
    label: 'Kartu Keluarga (KK) Baru / Perubahan / Penambahan Anggota',
    persyaratan: [
      'KK asli (jika ada)',
      'Buku nikah asli dan fotokopi',
      'Surat kelahiran dari dokter/bidan (asli dan fotokopi)',
      'Ijazah asli dan fotokopi',
      'Akta kelahiran',
      'Akta kematian',
      'Surat pindah penduduk/SKPWNI',
    ],
  },
  {
    label: 'Surat Pindah Tempat / Domisili',
    persyaratan: [
      'KTP dan KK asli dan fotokopi',
      'Fotokopi buku nikah/akta',
      'Fotokopi KTP/KK tempat tujuan pindah',
      'Surat keterangan pindah/SKPWNI',
    ],
  },
  {
    label: 'Akta Kelahiran',
    persyaratan: [
      'KK asli dan fotokopi',
      'KTP asli pemohon, orang tua, dan fotokopi',
      'Buku nikah asli dan fotokopi',
      'Surat kelahiran dari dokter/bidan/SPTJM',
    ],
  },
  {
    label: 'Akta Kematian',
    persyaratan: [
      'KK asli dan fotokopi',
      'KTP asli pemohon dan fotokopi',
      'Surat kematian dari dokter/bidan/SPTJM',
    ],
  },
  {
    label: 'Kartu Identitas Anak (KIA)',
    persyaratan: [
      'KTP asli orang tua dan fotokopi',
      'KK asli dan fotokopi',
      'Akta kelahiran asli dan fotokopi',
      'Pas foto 4x6 (2 lembar, warna sesuai tanggal lahir: merah untuk ganjil, biru untuk genap)',
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
      {/* Hero Section - Static */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('${images.layanan.surat}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">{heroTitle}</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">{heroSubtitle}</p>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
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