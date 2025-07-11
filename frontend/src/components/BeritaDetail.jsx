import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Data dummy untuk semua berita yang ada di dashboard utama dan halaman berita
const dummyBerita = [
  {
    id: '1',
    title: 'Pembangunan Jalan Baru di Dusun Krajan Selesai Lebih Cepat',
    date: '2024-06-01',
    content: `Pembangunan jalan baru di Dusun Krajan telah selesai lebih cepat dari jadwal yang direncanakan. Proyek ini dimulai pada awal Mei 2024 dan berhasil diselesaikan dalam waktu kurang dari satu bulan. Jalan baru ini diharapkan dapat meningkatkan aksesibilitas dan perekonomian warga setempat.\n\nKepala Desa Sidomulyo menyampaikan terima kasih kepada seluruh warga yang telah mendukung dan berpartisipasi dalam proses pembangunan. Dengan selesainya jalan ini, diharapkan mobilitas masyarakat semakin lancar dan aktivitas ekonomi desa semakin berkembang.`,
  },
  {
    id: '2',
    title: 'Penyaluran Bantuan Sosial Tahap II untuk Warga Kurang Mampu',
    date: '2024-05-28',
    content: `Pemerintah Desa Sidomulyo telah menyalurkan bantuan sosial tahap II kepada warga kurang mampu. Bantuan ini berupa paket sembako dan dana tunai yang diharapkan dapat meringankan beban masyarakat.\n\nPenyaluran dilakukan secara transparan dan tepat sasaran dengan melibatkan perangkat desa dan tokoh masyarakat setempat.`,
  },
  {
    id: '3',
    title: 'Lomba 17 Agustus: Meriahkan HUT RI ke-79 di Desa Sidomulyo',
    date: '2024-05-20',
    content: `Dalam rangka memperingati HUT RI ke-79, Desa Sidomulyo mengadakan berbagai lomba seperti balap karung, panjat pinang, dan tarik tambang. Acara ini diikuti antusias oleh warga dari berbagai dusun.\n\nKemeriahan dan kebersamaan sangat terasa, mempererat tali persaudaraan antarwarga.`,
  },
  {
    id: '4',
    title: 'Pelatihan Digitalisasi Administrasi untuk Perangkat Desa',
    date: '2024-05-15',
    content: `Perangkat Desa Sidomulyo mengikuti pelatihan digitalisasi administrasi untuk meningkatkan pelayanan publik. Pelatihan ini meliputi penggunaan aplikasi surat-menyurat digital dan pengelolaan data kependudukan secara online.\n\nDiharapkan pelayanan kepada masyarakat menjadi lebih cepat, akurat, dan transparan.`,
  },
  {
    id: '5',
    title: 'Gotong Royong Bersihkan Lingkungan Menjelang Musim Hujan',
    date: '2024-05-10',
    content: `Warga Desa Sidomulyo mengadakan gotong royong membersihkan lingkungan desa menjelang musim hujan. Kegiatan ini meliputi pembersihan saluran air, pemangkasan pohon, dan pengumpulan sampah.\n\nAksi ini bertujuan mencegah banjir dan menjaga kebersihan lingkungan bersama.`,
  },
  {
    id: '6',
    title: 'Sosialisasi Program Kesehatan Ibu dan Anak di Balai Desa',
    date: '2024-05-05',
    content: `Pemerintah desa mengadakan sosialisasi program kesehatan ibu dan anak di balai desa. Materi yang disampaikan meliputi pentingnya imunisasi, pola makan sehat, dan pemeriksaan kesehatan rutin.\n\nAcara ini dihadiri oleh puluhan ibu dan anak dari seluruh dusun di Sidomulyo.`,
  },
];

export default function BeritaDetail() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    // Nanti ganti dengan fetch(`/api/berita/${id}`)
    const found = dummyBerita.find(b => b.id === id);
    setBerita(found);
  }, [id]);

  if (!berita) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Hero Section */}
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center px-4" style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        color: '#fff',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Berita</h1>
      </div>
      {/* Konten Detail */}
      <section className="max-w-3xl mx-auto px-4 py-10 mt-10 bg-white rounded-2xl shadow-lg">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Berita Desa</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{berita.title}</h2>
        <div className="text-gray-500 text-sm mb-6">Dipublikasikan pada {new Date(berita.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{berita.content}</div>
      </section>
    </div>
  );
} 