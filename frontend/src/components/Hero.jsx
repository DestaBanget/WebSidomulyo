import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import images from '../config/images.js'

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
    title: img.title,
    desc: descs[idx] || '',
    img: img.url,
    cta: ctas[idx] || null
  };
});

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[650px] overflow-hidden bg-background">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.title}>
            <div className="relative w-full h-[400px] md:h-[650px]">
              <img
                src={slide.img || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105 brightness-90 saturate-90"
                draggable="false"
              />
              {/* Overlay glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/40 to-transparent backdrop-blur-sm" />

              <div className="absolute left-0 right-0 bottom-0 top-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 animate-fadeInDown" style={{animationDelay: '0.1s'}}>
                  {slide.title}
                </h1>
                <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-medium animate-fadeInUp" style={{animationDelay: '0.3s'}}>{slide.desc}</p>
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

      {/* Hapus SVG wave di bawah hero */}
    </section>
  )
}
