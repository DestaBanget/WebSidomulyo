import React from 'react';
import { FaArrowRight, FaCheckCircle, FaFileAlt, FaDownload, FaClipboardList, FaSearch, FaRegSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FormSurat from './FormSurat';

const mekanisme = [
  {
    icon: <FaFileAlt className="text-3xl text-primary mb-2" />,
    title: 'Tentukan Surat',
    desc: 'Pilih terlebih dahulu jenis surat online yang akan dibuat',
  },
  {
    icon: <FaClipboardList className="text-3xl text-primary mb-2" />,
    title: 'Isi Formulir',
    desc: 'Isi data diri beserta unggah lampiran persyaratan pembuatan surat dengan lengkap dan benar',
  },
  {
    icon: <FaDownload className="text-3xl text-primary mb-2" />,
    title: 'Unduh Bukti',
    desc: 'Unduh bukti pembuatan surat untuk memonitoring status surat yang sedang dibuat',
  },
  {
    icon: <FaSearch className="text-3xl text-primary mb-2" />,
    title: 'Lakukan Monitoring',
    desc: 'Lakukan monitoring status surat dengan scan qrcode yang ada pada bukti pembuatan surat',
  },
  {
    icon: <FaRegSmile className="text-3xl text-primary mb-2" />,
    title: 'Surat Selesai',
    desc: 'Setelah data dikonfirmasi valid oleh petugas, surat keterangan dapat langsung diunduh',
  },
];

// Daftar surat dengan deskripsi dan badge baru
const daftarSurat = [
  {
    title: 'Surat Keterangan Usaha',
    desc: 'Surat resmi dari desa/kelurahan yang menyatakan bahwa seseorang memiliki dan menjalankan suatu jenis usaha, biasanya digunakan untuk pengajuan kredit, izin usaha, atau bantuan UMKM.'
  },
  {
    title: 'Surat Keterangan Domisili',
    desc: 'Surat yang menyatakan bahwa seseorang berdomisili di alamat tertentu untuk keperluan administrasi seperti pendaftaran sekolah, pekerjaan, atau keanggotaan organisasi.'
  },
  {
    title: 'Surat Keterangan Tidak Mampu (SKTM)',
    desc: 'Surat yang menerangkan bahwa seseorang tergolong keluarga tidak mampu secara ekonomi. Umumnya digunakan untuk mengurus beasiswa, bantuan pemerintah, atau keringanan biaya.'
  },
  {
    title: 'Surat Keterangan Kematian',
    desc: 'Surat yang menerangkan bahwa seseorang telah meninggal dunia. Dibutuhkan untuk mengurus akta kematian, asuransi, pembagian warisan, dan administrasi kependudukan.'
  },
  {
    title: 'Surat Keterangan Kelahiran',
    desc: 'Surat pengantar dari desa/kelurahan sebagai bukti awal kelahiran seseorang, digunakan untuk pembuatan akta kelahiran di Dinas Kependudukan.'
  },
  {
    title: 'Surat Keterangan Ahli Waris',
    desc: 'Surat yang menerangkan siapa saja pihak yang sah menjadi ahli waris dari seseorang yang telah meninggal. Biasanya dilampiri fotokopi KK, KTP, dan akta kematian.'
  },
  {
    title: 'Surat Keterangan Izin Keramaian',
    desc: 'Surat izin untuk menyelenggarakan kegiatan yang melibatkan banyak orang seperti hajatan, konser, lomba, dan kegiatan masyarakat lainnya.'
  },
  {
    title: 'Surat Keterangan Beda Nama',
    desc: 'Surat yang menjelaskan bahwa perbedaan nama dalam beberapa dokumen milik pemohon merujuk pada orang yang sama. Umumnya diperlukan untuk keperluan hukum atau administrasi.'
  },
  {
    title: 'Surat Kehilangan / Kepemilikan',
    desc: 'Surat yang digunakan untuk menyatakan kehilangan dokumen atau barang, atau sebagai bukti kepemilikan atas suatu benda tertentu.'
  },
  {
    title: 'Surat Keterangan Riwayat Tanah / Pertanahan',
    desc: 'Surat yang menjelaskan riwayat penguasaan, kepemilikan, atau penggunaan sebidang tanah. Sering digunakan dalam pengurusan sertifikat atau sengketa tanah.'
  },
  {
    title: 'Surat Keterangan Bepergian / Buruh Kerja',
    desc: 'Surat pengantar dari desa bagi warga yang akan pergi bekerja atau menetap sementara di luar kota/negeri. Dibutuhkan untuk administrasi di tempat tujuan.'
  },
  {
    title: 'Surat Keterangan Menikah / Belum Menikah',
    desc: 'Surat yang menyatakan status seseorang (sudah atau belum menikah). Digunakan untuk pendaftaran kerja, beasiswa, KUA, atau instansi lainnya.'
  },
  {
    title: 'Surat Keterangan Domisili Lembaga',
    desc: 'Surat yang menerangkan alamat domisili dari suatu lembaga atau organisasi. Biasanya dibutuhkan untuk pendaftaran legalitas lembaga ke dinas terkait (seperti Kemenag atau Dinas Sosial).'
  },
  {
    title: 'KTP Baru / Perubahan',
    desc: 'Dokumen resmi berupa Kartu Tanda Penduduk Elektronik (e-KTP) yang diterbitkan untuk warga baru dewasa, pindahan, atau perubahan data (misalnya status, pekerjaan, alamat).'
  },
  {
    title: 'Kartu Keluarga (KK) Baru / Perubahan / Penambahan Anggota',
    desc: 'Dokumen resmi yang mencatat seluruh anggota keluarga dalam satu KK. Perubahan bisa karena pernikahan, kelahiran, perceraian, atau pindah masuk anggota keluarga.'
  },
  {
    title: 'Surat Pindah Tempat / Domisili',
    desc: 'Surat keterangan pindah domisili dari daerah asal yang diperlukan untuk mengurus kepindahan ke daerah lain, baik antar desa, kota, maupun provinsi.'
  },
  {
    title: 'Akta Kelahiran',
    desc: 'Dokumen resmi dari Dinas Kependudukan yang mencatat identitas kelahiran seseorang secara sah. Diperlukan untuk pendidikan, kesehatan, dan hak kewarganegaraan.'
  },
  {
    title: 'Akta Kematian',
    desc: 'Dokumen resmi yang mencatat kematian seseorang. Dibutuhkan untuk penghapusan data kependudukan dan pengurusan warisan/asuransi.'
  },
  {
    title: 'Kartu Identitas Anak (KIA)',
    desc: 'Identitas resmi bagi anak usia 0–17 tahun sebagai bentuk perlindungan hak sipil. Biasanya digunakan untuk keperluan pendidikan, kesehatan, dan administrasi anak.'
  },
];

// Mapping persyaratan untuk setiap surat
const persyaratanMap = {
  'Surat Keterangan Usaha': [
    'Fotokopi KK dan KTP',
    'Foto kegiatan usaha',
  ],
  'Surat Keterangan Domisili': [
    'Fotokopi KK dan KTP',
    'Jika penduduk luar desa, wajib membawa identitas asli',
  ],
  'Surat Keterangan Tidak Mampu (SKTM)': [
    'Fotokopi KK dan KTP',
    'Surat/rekomendasi dari RT/RW bahwa tidak mampu',
  ],
  'Surat Keterangan Kematian': [
    'Fotokopi KK dan KTP',
    'Surat keterangan kematian dari dokter/bidan/perawat',
  ],
  'Surat Keterangan Kelahiran': [
    'Fotokopi KK dan KTP orang tua',
    'Surat keterangan lahir dari bidan/rumah sakit',
    'Pas foto 4x6 (2 lembar, warna sesuai tanggal lahir: merah untuk ganjil, biru untuk genap)',
  ],
  'Surat Keterangan Ahli Waris': [
    'Fotokopi KK dan KTP semua ahli waris',
    'Akte kematian',
    'Berkas pendukung (riwayat waris, dokumen legal hasil, dsb.)',
  ],
  'Surat Keterangan Izin Keramaian': [
    'Fotokopi KTP/KK penanggung jawab & panitia',
    'Nomor Induk Kelompok Kesenian/Budaya/Keagamaan',
  ],
  'Surat Keterangan Beda Nama': [
    'Fotokopi KK dan KTP',
    'Fotokopi buku nikah',
    'Fotokopi ijazah',
    'Fotokopi akta kelahiran',
  ],
  'Surat Kehilangan / Kepemilikan': [
    'Fotokopi KK dan KTP',
    'Jika kehilangan buku nikah, suami dan istri wajib hadir bersama saat pengajuan',
  ],
  'Surat Keterangan Riwayat Tanah / Pertanahan': [
    'Fotokopi KK dan KTP',
    'Bukti SPPT',
  ],
  'Surat Keterangan Bepergian / Buruh Kerja': [
    'Fotokopi KK dan KTP',
    'Alamat tujuan (domisili tujuan) yang jelas',
    'Jika suami/istri bekerja di luar negeri, wajib membuat surat pernyataan bermaterai',
  ],
  'Surat Keterangan Menikah / Belum Menikah': [
    'Fotokopi KK dan KTP',
    'Fotokopi buku nikah',
    'Fotokopi ijazah',
    'Fotokopi akta kelahiran',
    'Jika kehilangan buku nikah, suami dan istri wajib hadir bersama saat pengajuan',
    'Jika suami/istri bekerja di luar negeri, wajib membuat surat pernyataan bermaterai',
  ],
  'Surat Keterangan Domisili Lembaga': [
    'Fotokopi KTP pengurus (ketua)',
    'Nomor Induk Lembaga dari Dinas/Kemenag',
  ],
  'KTP Baru / Perubahan': [
    'Fotokopi KK',
    'KTP asli',
  ],
  'Kartu Keluarga (KK) Baru / Perubahan / Penambahan Anggota': [
    'KK asli',
    'Buku nikah asli dan fotokopi',
    'Surat kelahiran dari dokter/bidan (asli dan fotokopi)',
    'Ijazah asli dan fotokopi',
    'Akta kelahiran',
    'Akta kematian',
    'Surat pindah penduduk/SKPWNI',
  ],
  'Surat Pindah Tempat / Domisili': [
    'KTP dan KK asli dan fotokopi',
    'Fotokopi buku nikah/akta',
    'Fotokopi KTP/KK tempat tujuan pindah',
    'Surat keterangan pindah/SKPWNI',
  ],
  'Akta Kelahiran': [
    'KK asli dan fotokopi',
    'KTP asli pemohon, orang tua, dan fotokopi',
    'Buku nikah asli dan fotokopi',
    'Surat kelahiran dari dokter/bidan/SPTJM',
  ],
  'Akta Kematian': [
    'KK asli dan fotokopi',
    'KTP asli pemohon dan fotokopi',
    'Surat kematian dari dokter/bidan/SPTJM',
  ],
  'Kartu Identitas Anak (KIA)': [
    'KTP asli orang tua dan fotokopi',
    'KK asli dan fotokopi',
    'Akta kelahiran asli dan fotokopi',
    'Pas foto 4x6 (2 lembar, warna sesuai tanggal lahir: merah untuk ganjil, biru untuk genap)',
  ],
};

export default function SuratOnline() {
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();
  const filteredSurat = daftarSurat.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[400px] md:min-h-[500px]"
        style={{
          backgroundImage: "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(96,165,250,0.7)), url('/surat2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '0 0 2.5rem 2.5rem',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Surat Online</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium drop-shadow mb-4 md:mb-8">Kemudahan pembuatan surat keterangan secara digital. Segera akses layanan ini untuk pengalaman yang lebih efisien dan terhubung dengan cepat.</p>
        </div>
      </div>

      {/* Mekanisme Section */}
      <section className="max-w-5xl mx-auto px-4 py-14 mt-10">
        <h2 className="text-center text-primary font-bold text-lg mb-10 tracking-widest">MEKANISME SURAT ONLINE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-4">
          {mekanisme.map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {m.icon}
              <div className="font-bold text-base mt-2 mb-1">{m.title}</div>
              <div className="text-gray-500 text-sm leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar Surat Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-center text-primary font-bold text-lg mb-6 tracking-widest">LAYANAN SURAT ONLINE</h2>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari surat yang ingin diajukan..."
            className="w-full max-w-xl px-5 py-3 rounded-full border-2 border-primary/30 focus:border-primary outline-none text-lg bg-white placeholder-gray-400 shadow"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSurat.length === 0 && (
            <div className="col-span-full text-center text-gray-400 text-lg py-20">Tidak ada surat ditemukan.</div>
          )}
          {filteredSurat.map((s, i) => (
            <div
              key={s.title}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer"
            >
              <div className="font-bold text-lg text-gray-800 mb-2">{s.title}</div>
              <div className="text-gray-600 text-sm mb-4">{s.desc}</div>
              <button
                className="mt-auto w-full border border-primary text-primary font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition group-hover:bg-primary group-hover:text-white group-hover:shadow-lg"
                onClick={() => navigate(`/layanan/form-surat?jenis=${encodeURIComponent(s.title)}`)}
              >
                Ajukan Sekarang <span className="text-base">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 