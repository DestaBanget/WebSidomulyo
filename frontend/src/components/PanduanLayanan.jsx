import React from 'react';
import { FaFileAlt, FaComments, FaQuestionCircle } from 'react-icons/fa';

export default function PanduanLayanan() {
  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[320px] md:min-h-[420px]" style={{
        background: 'linear-gradient(90deg, #1e40af 0%, #60a5fa 100%)',
      }}>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Panduan Layanan Desa</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow mb-2">Temukan panduan lengkap untuk setiap layanan digital desa. Ikuti langkah-langkah mudah berikut agar proses pengajuan Anda berjalan lancar.</p>
        </div>
      </div>

      {/* Panduan Surat Online */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-4">
          <FaFileAlt className="text-primary text-2xl" />
          <h2 className="text-xl font-bold text-primary">Panduan Surat Online</h2>
        </div>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Pilih jenis surat yang ingin diajukan pada halaman <b>Surat Online</b>.</li>
          <li>Klik <b>Ajukan Sekarang</b> pada surat yang diinginkan.</li>
          <li>Isi data diri dan unggah dokumen persyaratan sesuai instruksi.</li>
          <li>Pastikan semua data dan file sudah benar, lalu klik <b>Kirim</b>.</li>
          <li>Unduh bukti pengajuan untuk monitoring status surat Anda.</li>
        </ol>
        <div className="bg-blue-50 border-l-4 border-primary p-4 rounded mb-4 text-sm text-primary">
          <b>Tips:</b> Pastikan dokumen yang diunggah jelas dan sesuai persyaratan. Gunakan huruf kapital untuk nama lengkap.
        </div>
      </section>

      {/* Panduan Pengaduan Masyarakat */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-4">
          <FaComments className="text-primary text-2xl" />
          <h2 className="text-xl font-bold text-primary">Panduan Pengaduan Masyarakat</h2>
        </div>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Buka halaman <b>Pengaduan Masyarakat</b> dari menu layanan.</li>
          <li>Isi data diri pelapor dan uraikan pengaduan dengan jelas.</li>
          <li>Jika perlu, tambahkan lampiran pendukung (foto/dokumen).</li>
          <li>Klik <b>Kirim</b> dan simpan bukti pelaporan untuk monitoring.</li>
        </ol>
        <div className="bg-blue-50 border-l-4 border-primary p-4 rounded mb-4 text-sm text-primary">
          <b>Tips:</b> Data pelapor dijamin kerahasiaannya. Sampaikan pengaduan dengan bahasa yang sopan dan jelas.
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-4">
          <FaQuestionCircle className="text-primary text-2xl" />
          <h2 className="text-xl font-bold text-primary">FAQ Layanan Desa</h2>
        </div>
        <div className="mb-2">
          <b>Q:</b> Bagaimana cara mengetahui status pengajuan surat saya?<br />
          <b>A:</b> Anda dapat memonitor status surat melalui bukti pengajuan yang berisi QR code atau nomor referensi.
        </div>
        <div className="mb-2">
          <b>Q:</b> Apakah data saya aman dan rahasia?<br />
          <b>A:</b> Ya, semua data yang Anda masukkan dijamin kerahasiaannya oleh pemerintah desa.
        </div>
        <div className="mb-2">
          <b>Q:</b> Bagaimana jika saya kesulitan mengunggah dokumen?<br />
          <b>A:</b> Pastikan file berformat JPG, PNG, atau PDF dan ukuran tidak terlalu besar. Jika masih gagal, hubungi admin desa.
        </div>
      </section>
    </div>
  );
} 