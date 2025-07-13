import React, { useState } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import StatistikDesa from './components/StatistikDesa';
import LayananUnggulan from './components/LayananUnggulan';
import SelayangPandang from './components/SelayangPandang';
import BeritaDesa from './components/BeritaDesa';
import Pariwisata from './components/Pariwisata';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import { Routes, Route, Link } from 'react-router-dom';
import SuratOnline from './components/SuratOnline';
import Tentang from './components/Tentang';
import VisiMisi from './components/VisiMisi';
import StrukturOrganisasi from './components/StrukturOrganisasi';
import PengaduanMasyarakat from './components/PengaduanMasyarakat';
import PanduanLayanan from './components/PanduanLayanan';
import Kontak from './components/Kontak';
import PariwisataPage, { initialPariwisata } from './components/PariwisataPage';
import BPD from './components/BPD';
import LPM from './components/LPM';
import PKK from './components/PKK';
import KarangTaruna from './components/KarangTaruna';
import BeritaPage from './components/BeritaPage';
import PengumumanPage from './components/PengumumanPage';
import AgendaPage from './components/AgendaPage';
import ScrollToTop from './components/ScrollToTop';
import BeritaDetail from './components/BeritaDetail';
import PengumumanDetail from './components/PengumumanDetail';
import AgendaDetail from './components/AgendaDetail';
import PariwisataDetail from './components/PariwisataDetail';
import BeritaDesaDefault, { defaultBerita } from './components/BeritaDesa';
import { BeritaProvider } from './contexts/BeritaContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FormSuratPage from './pages/FormSuratPage';
import AddBeritaPage from './pages/AddBeritaPage';
import ProfilePage from './pages/ProfilePage';
import AdminSuratMasukPage from './pages/AdminSuratMasukPage';

function PlaceholderLogo({ label }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">L</div>
      <span className="font-semibold text-primary">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4 min-w-[180px]">
      <div className="text-primary text-3xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{title}</div>
      </div>
    </div>
  );
}

function QuickAccessCard({ title, icon }) {
  return (
    <div className="bg-primary/90 hover:bg-primary text-white rounded-lg p-4 flex flex-col items-center cursor-pointer transition">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold">{title}</div>
    </div>
  );
}

function DummyChart() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-48 flex items-center justify-center text-gray-400">
      <span>Chart Data Desa (Dummy)</span>
    </div>
  );
}

function App() {
  // Ambil data berita dari defaultBerita di BeritaDesa
  const sortedBerita = [...defaultBerita].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const latestBerita = sortedBerita.slice(0, 6);
  // Ambil data pariwisata dari initialPariwisata di PariwisataPage
  const sortedPariwisata = [...initialPariwisata].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestPariwisata = sortedPariwisata.slice(0, 6);

  return (
    <BeritaProvider>
      <AuthProvider>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
      
              {/* Statistik Ringkas di Dashboard */}
              <div className="w-full bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center tracking-tight drop-shadow-lg">
                      Statistik Ringkas Desa
                    </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {/* 4 statistik utama, hardcode atau import dari StatistikDesa jika perlu */}
                    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
                      <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                      <div className="text-lg font-semibold text-gray-700 mb-1">Total Penduduk</div>
                      <div className="text-2xl font-bold text-primary mb-2">2.350</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
                      <div className="text-3xl mb-2">🏠</div>
                      <div className="text-lg font-semibold text-gray-700 mb-1">Jumlah Keluarga</div>
                      <div className="text-2xl font-bold text-primary mb-2">670</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
                      <div className="text-3xl mb-2">📄</div>
                      <div className="text-lg font-semibold text-gray-700 mb-1">Surat Diproses Bulan Ini</div>
                      <div className="text-2xl font-bold text-primary mb-2">48</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-lg font-semibold text-gray-700 mb-1">Program Aktif</div>
                      <div className="text-2xl font-bold text-primary mb-2">3</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link to="/profil/statistik" className="inline-block px-6 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">Lihat Statistik Lainnya</Link>
                  </div>
                </div>
              </div>
              {/* End Statistik Ringkas */}
              <LayananUnggulan />
              <BeritaDesa data={latestBerita} />
          
        
            </>
          } />
          <Route path="/profil/tentang" element={<Tentang />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/profil/struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path="/profil/statistik" element={<StatistikDesa />} />
          <Route path="/layanan/surat-online" element={<SuratOnline />} />
          <Route path="/layanan/pengaduan" element={<PengaduanMasyarakat />} />
          <Route path="/layanan/panduan" element={<PanduanLayanan />} />
          <Route path="/layanan/form-surat" element={<FormSuratPage />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/pariwisata" element={<PariwisataPage />} />
          <Route path="/lembaga/bpd" element={<BPD />} />
          <Route path="/lembaga/lpm" element={<LPM />} />
          <Route path="/lembaga/pkk" element={<PKK />} />
          <Route path="/lembaga/karang-taruna" element={<KarangTaruna />} />
          <Route path="/publikasi/berita" element={<BeritaPage />} />
          <Route path="/publikasi/pengumuman" element={<PengumumanPage />} />
          <Route path="/publikasi/agenda" element={<AgendaPage />} />
          <Route path="/publikasi/berita/:id" element={<BeritaDetail />} />
          <Route path="/publikasi/pengumuman/:id" element={<PengumumanDetail />} />
          <Route path="/publikasi/agenda/:id" element={<AgendaDetail />} />
          <Route path="/pariwisata/:id" element={<PariwisataDetail />} />
          <Route path="/admin/tambah-berita" element={<AddBeritaPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/admin/surat-masuk" element={<AdminSuratMasukPage />} />
        </Routes>
        <Footer />
        <FloatingButton />
      </AuthProvider>
    </BeritaProvider>
  );
}

export default App;
