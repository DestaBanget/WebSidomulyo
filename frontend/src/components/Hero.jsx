import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    title: "Selamat Datang di Desa Sidomulyo",
    desc: "Website resmi layanan dan informasi digital Desa Sidomulyo. Mudahkan urusan surat-menyurat dan akses info desa secara online.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    cta: { label: "Jelajahi Website", href: "/profil/tentang" },
  },
  {
    title: "Layanan Surat Online",
    desc: "Ajukan surat keterangan, domisili, SKTM, dan layanan lainnya secara online. Proses mudah, transparan, dan bisa dipantau.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    cta: { label: "Ajukan Surat", href: "/layanan/surat-online" },
  },
  {
    title: "Pengaduan Masyarakat",
    desc: "Sampaikan aspirasi dan pengaduan Anda langsung ke perangkat desa secara digital, mudah dan cepat.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    cta: { label: "Laporkan Masalah", href: "/layanan/pengaduan" },
  }
]

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
