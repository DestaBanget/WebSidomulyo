import React from 'react';
import { FaFileAlt, FaComments, FaQuestionCircle } from 'react-icons/fa';

export default function PanduanLayanan() {
  const heroImg = '/surat.jpg';
  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center text-center px-4 pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden" style={{background: `url(${heroImg}) center/cover no-repeat`, borderRadius: '0 0 2.5rem 2.5rem'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-400/80 z-0" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-white">Panduan Layanan Desa</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-2 text-white">Temukan panduan lengkap untuk setiap layanan digital desa. Ikuti langkah-langkah mudah berikut agar proses pengajuan Anda berjalan lancar.</p>
          <div className="max-w-xl mx-auto text-base opacity-90 mb-2 text-white">Panduan ini disusun untuk membantu warga memahami proses layanan digital desa, mulai dari pengajuan surat, pelaporan pengaduan, hingga tanya jawab seputar layanan. Jika Anda baru pertama kali menggunakan layanan online, bacalah panduan ini dengan seksama untuk menghindari kesalahan umum.</div>
          <div className="max-w-lg mx-auto text-base opacity-80 text-white">Jika masih ada pertanyaan atau kendala, silakan hubungi admin desa melalui kontak yang tersedia di website ini. Kami siap membantu Anda!</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-10">
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
            <li>Pantau dan tunggu hingga status pengajuan surat selesai.</li>
            <li>Setelah selesai anda dapat mengambil surat di balai desa.</li>
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
            <li>Klik <b>Kirim</b> dan pantau status pelaporan untuk monitoring.</li>
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
            <b>A:</b> Anda dapat memonitor status surat melalui riwayat pengajuan surat.
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
    </div>
  );
} 