import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import images from '../config/images.js'
import { useState, useEffect } from 'react'

// Fungsi untuk mengubah teks menjadi Title Case (huruf pertama setiap kata kapital)
const toTitleCase = (text) => {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const slides = images.hero.map((img, idx) => {
  // Mapping manual deskripsi dan cta sesuai urutan lama
  const descs = [
    "Website resmi layanan dan informasi digital Desa Sidomulyo. Mudahkan urusan surat-menyurat dan akses info desa secara online.",
    "Ajukan surat keterangan, domisili, SKTM, dan layanan lainnya secara online. Proses mudah, transparan, dan bisa dipantau.",
    "Sampaikan aspirasi dan pengaduan Anda langsung ke perangkat desa secara digital, mudah dan cepat."
  ];
  const ctas = [
    { label: "Jelajahi Website", href: "/profil/tentang" },
    { label: "Ajukan Surat", href: "/layanan/surat-online" },
    { label: "Laporkan Masalah", href: "/layanan/pengaduan" }
  ];
  return {
    title: toTitleCase(img.title), // Mengubah judul menjadi Title Case
    desc: descs[idx] || '',
    img: img.url,
    cta: ctas[idx] || null
  };
});

export default function Hero() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload semua gambar hero
    const preloadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = slide.img;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Some hero images failed to preload:', error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[650px] overflow-hidden bg-background">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="w-full h-full"
        speed={800}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.title}>
            <div className="relative w-full h-[400px] md:h-[650px]">
              <img
                src={slide.img || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover object-center hero-image"
                draggable="false"
                loading="eager"
                decoding="sync"
                style={{
                  imageRendering: 'auto',
                  imageRendering: '-webkit-optimize-contrast',
                  imageRendering: 'crisp-edges',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  opacity: imagesLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                onLoad={(e) => {
                  e.target.style.opacity = 1;
                }}
                onError={(e) => {
                  e.target.src = "/my-landscape-sidomulyo.jpg"; // Fallback image
                }}
              />
              {/* Overlay gradient tanpa blur */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-800/30 to-transparent" />

              <div className="absolute left-0 right-0 bottom-0 top-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 animate-fadeInDown" style={{animationDelay: '0.1s'}}>
                  {slide.title}
                </h1>
                <p className="text-white/95 text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-medium animate-fadeInUp" style={{animationDelay: '0.3s'}}>{slide.desc}</p>
                {slide.cta && (
                  <a
                    href={slide.cta.href}
                    className="mt-2 inline-block px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 animate-fadeInUp"
                    style={{animationDelay: '0.5s'}}
                  >
                    {slide.cta.label}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </section>
  )
}
