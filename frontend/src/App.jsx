import React, { useState, useEffect } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import StatistikDesa from './components/StatistikDesa';
import LayananUnggulan from './components/LayananUnggulan';
import BeritaDesa from './components/BeritaDesa';
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
import { BeritaProvider } from './contexts/BeritaContext';
import { PengumumanProvider } from './contexts/PengumumanContext';
import { AgendaProvider } from './contexts/AgendaContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FormSuratPage from './pages/FormSuratPage';
import AddBeritaPage from './pages/AddBeritaPage';
import AddPengumumanPage from './pages/AddPengumumanPage';
import AddAgendaPage from './pages/AddAgendaPage';
import ProfilePage from './pages/ProfilePage';
import AdminSuratMasukPage from './pages/AdminSuratMasukPage';
import SuratDetail from './components/SuratDetail';
import LINMAS from './components/LINMAS';
import Bhabinkamtibmas from './components/Bhabinkamtibmas';
import Babinsa from './components/Babinsa';
import KoperasiWanita from './components/KoperasiWanita';
import DharmaWanita from './components/DharmaWanita';
import Poskesdes from './components/Poskesdes';
import KelompokTani from './components/KelompokTani';
import AdminPengaduanMasukPage from './pages/AdminPengaduanMasukPage';
import AdminPesanMasukPage from './pages/AdminPesanMasukPage';
import AdminKontakPage from './pages/AdminKontakPage';

import UserAuth from './components/UserAuth';

import PengaduanDetail from './components/PengaduanDetail';
import { apiCall } from './config/api';


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
  // State untuk statistik utama
  const [dashboardStats, setDashboardStats] = useState([]);

  // State untuk login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Event listener untuk openLoginModal
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setShowLoginModal(true);
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    };
  }, []);

  // Error boundary untuk handle API errors
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Don't prevent default to allow normal error handling
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await apiCall('/statistik');
        let data = [];
        if (Array.isArray(res.statistik)) {
          data = res.statistik;
        } else {
          Object.values(res.statistik).forEach(arr => {
            data = data.concat(arr);
          });
        }
        // Mapping label, value, icon
        const mapping = [
          { kategori: 'utama', label: 'Total Penduduk', icon: '👨‍👩‍👧‍👦' },
          { kategori: 'utama', label: 'Jumlah Keluarga', icon: '🏠' },
          { kategori: 'utama', label: 'Surat Diproses Bulan Ini', icon: '📄' },
          { kategori: 'utama', label: 'Program Aktif', icon: '🎯' },
        ];
        const mappedStats = mapping.map(map => {
          const found = data.find(d => d.kategori === map.kategori && d.label === map.label);
          return found ? {
            title: found.label,
            value: found.value,
            icon: map.icon,
          } : {
            title: map.label,
            value: '-',
            icon: map.icon,
          };
        });
        setDashboardStats(mappedStats);
      } catch (err) {
        setDashboardStats([]);
      }
    };
    fetchDashboardStats();
  }, []);

  return (
    <BeritaProvider>
      <PengumumanProvider>
        <AgendaProvider>
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
                    {dashboardStats.map((s, idx) => (
                      <div key={s.title} className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
                        <div className="text-3xl mb-2">{s.icon}</div>
                        <div className="text-lg font-semibold text-gray-700 mb-1">{s.title}</div>
                        <div className="text-2xl font-bold text-primary mb-2">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Link to="/profil/statistik" className="inline-block px-6 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-blue-700 transition animate-bounce">Lihat Statistik Lainnya</Link>
                  </div>
                </div>
              </div>
              {/* End Statistik Ringkas */}
              <LayananUnggulan />
              <BeritaDesa />
          
        
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
          <Route path="/lembaga/bpd" element={<BPD />} />
          <Route path="/lembaga/lpm" element={<LPM />} />
          <Route path="/lembaga/pkk" element={<PKK />} />
          <Route path="/lembaga/karang-taruna" element={<KarangTaruna />} />
          <Route path="/lembaga/linmas" element={<LINMAS />} />
          <Route path="/lembaga/bhabinkamtibmas" element={<Bhabinkamtibmas />} />
          <Route path="/lembaga/babinsa" element={<Babinsa />} />
          <Route path="/lembaga/koperasi-wanita" element={<KoperasiWanita />} />
          <Route path="/lembaga/dharma-wanita" element={<DharmaWanita />} />
          <Route path="/lembaga/poskesdes" element={<Poskesdes />} />
          <Route path="/lembaga/kelompok-tani" element={<KelompokTani />} />
          <Route path="/publikasi/berita" element={<BeritaPage />} />
          <Route path="/publikasi/pengumuman" element={<PengumumanPage />} />
          <Route path="/publikasi/agenda" element={<AgendaPage />} />
          <Route path="/publikasi/berita/:id" element={<BeritaDetail />} />
          <Route path="/publikasi/pengumuman/:id" element={<PengumumanDetail />} />
          <Route path="/publikasi/agenda/:id" element={<AgendaDetail />} />
          <Route path="/admin/tambah-berita" element={<AddBeritaPage />} />
          <Route path="/admin/tambah-pengumuman" element={<AddPengumumanPage />} />
          <Route path="/admin/agenda/tambah" element={<AddAgendaPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/admin/surat-masuk" element={<AdminSuratMasukPage />} />
          <Route path="/admin/surat-masuk/:id" element={<SuratDetail />} />
          <Route path="/surat/:id" element={<SuratDetail />} />
          <Route path="/admin/pengaduan-masuk" element={<AdminPengaduanMasukPage />} />
          <Route path="/admin/pengaduan-masuk/:id" element={<PengaduanDetail />} />
          <Route path="/admin/pesan-masuk" element={<AdminPesanMasukPage />} />
          <Route path="/admin/kontak" element={<AdminKontakPage />} />
        </Routes>
        <Footer />
        <FloatingButton />
        
        {/* Login Modal */}
        {showLoginModal && (
          <UserAuth onClose={() => setShowLoginModal(false)} />
        )}
          </AuthProvider>
        </AgendaProvider>
      </PengumumanProvider>
    </BeritaProvider>
  );
}

export default App;
