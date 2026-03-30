import {
  Calendar,
  ChevronRight,
  Facebook,
  Flag,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  Trophy,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface GalleryImage {
  src: string;
  title: string;
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onDone, 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[oklch(0.09_0.005_260)] transition-opacity duration-500 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      data-ocid="loading.loading_state"
    >
      <div className="spin-wheel mb-6">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Loading wheel"
        >
          <circle
            cx="36"
            cy="36"
            r="32"
            stroke="oklch(0.22 0.006 260)"
            strokeWidth="4"
          />
          <circle
            cx="36"
            cy="36"
            r="32"
            stroke="oklch(0.52 0.22 25)"
            strokeWidth="4"
            strokeDasharray="50 151"
            strokeLinecap="round"
          />
          <circle cx="36" cy="36" r="16" fill="oklch(0.22 0.006 260)" />
          <circle cx="36" cy="36" r="8" fill="oklch(0.52 0.22 25)" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line
              key={angle}
              x1="36"
              y1="20"
              x2="36"
              y2="12"
              stroke="oklch(0.42 0.006 260)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                transformOrigin: "36px 36px",
                transform: `rotate(${angle}deg)`,
              }}
            />
          ))}
        </svg>
      </div>
      <div className="font-display font-extrabold text-white text-2xl tracking-[0.3em] uppercase">
        Formula 1 World
      </div>
      <div className="mt-2 text-[oklch(0.52_0.22_25)] text-sm tracking-widest uppercase">
        Loading...
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Cars", href: "#cars" },
  { label: "Teams", href: "#teams" },
  { label: "Tracks", href: "#tracks" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.10_0.005_260)]/95 backdrop-blur-md border-b-2 border-[oklch(0.52_0.22_25)]"
      data-ocid="navbar.panel"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center h-16">
        <a
          href="#home"
          className="flex items-center gap-2 mr-8 shrink-0"
          data-ocid="navbar.link"
        >
          <div className="w-8 h-8 bg-[oklch(0.52_0.22_25)] rounded-sm flex items-center justify-center">
            <span className="text-white font-display font-black text-xs">
              F1
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-extrabold text-white text-sm tracking-[0.15em] uppercase leading-tight">
              Formula 1
            </div>
            <div className="font-display font-bold text-[oklch(0.52_0.22_25)] text-[10px] tracking-[0.3em] uppercase leading-tight">
              World
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`navbar.${link.label.toLowerCase()}.link`}
              className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-white nav-link-active"
                  : "text-[oklch(0.62_0_0)] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-4">
          {[
            { Icon: Twitter, href: "https://x.com", label: "X/Twitter" },
            {
              Icon: Instagram,
              href: "https://instagram.com",
              label: "Instagram",
            },
            { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[oklch(0.62_0_0)] hover:text-[oklch(0.52_0.22_25)] transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden ml-auto text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="navbar.toggle"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[oklch(0.12_0.005_260)] border-t border-[oklch(0.22_0.006_260)] px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`navbar.mobile.${link.label.toLowerCase()}.link`}
              onClick={() => setMenuOpen(false)}
              className={`py-2 px-3 text-sm font-medium rounded transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-[oklch(0.52_0.22_25)] bg-[oklch(0.16_0.006_260)]"
                  : "text-[oklch(0.62_0_0)] hover:text-white hover:bg-[oklch(0.16_0.006_260)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `url('/assets/generated/f1-hero.dim_1600x800.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-[oklch(0.52_0.22_25)] text-[oklch(0.52_0.22_25)] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.52_0.22_25)] animate-pulse" />
            2024 Season
          </div>
          <h1
            className="font-display font-extrabold text-white uppercase tracking-tight leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Formula 1<br />
            <span className="text-[oklch(0.52_0.22_25)]">World</span>
          </h1>
          <p className="text-[oklch(0.75_0_0)] text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
            Experience the pinnacle of motorsport. The fastest cars, the
            greatest drivers, the most iconic circuits on the planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#cars"
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.52_0.22_25)] hover:bg-[oklch(0.46_0.22_25)] text-white font-bold uppercase tracking-widest text-sm rounded transition-all duration-200 hover:scale-105"
            >
              Explore Cars <ChevronRight size={16} />
            </a>
            <a
              href="#gallery"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 hover:border-white text-white font-bold uppercase tracking-widest text-sm rounded transition-all duration-200 hover:bg-white/10"
            >
              Watch Highlights
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  children,
  subtitle,
}: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="section-heading font-display font-extrabold text-white uppercase tracking-widest text-3xl sm:text-4xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[oklch(0.62_0_0)] text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Cars Section ────────────────────────────────────────────────────────────
const CARS = [
  {
    name: "Ferrari SF-24",
    team: "Scuderia Ferrari",
    engine: "Ferrari 066/12 V6 Hybrid",
    image: "/assets/generated/car-ferrari.dim_800x500.jpg",
    color: "#DC0000",
  },
  {
    name: "Mercedes W15",
    team: "Mercedes-AMG Petronas",
    engine: "Mercedes M15 V6 Hybrid",
    image: "/assets/generated/car-mercedes.dim_800x500.jpg",
    color: "#00D2BE",
  },
  {
    name: "Red Bull RB20",
    team: "Oracle Red Bull Racing",
    engine: "Honda RBPTH002 V6 Hybrid",
    image: "/assets/generated/car-redbull.dim_800x500.jpg",
    color: "#3671C6",
  },
  {
    name: "McLaren MCL38",
    team: "McLaren F1 Team",
    engine: "Mercedes M15 V6 Hybrid",
    image: "/assets/generated/car-mclaren.dim_800x500.jpg",
    color: "#FF8000",
  },
];

function CarsSection() {
  return (
    <section
      id="cars"
      className="py-24 bg-[oklch(0.10_0.005_260)]"
      data-ocid="cars.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading subtitle="The most advanced racing machines ever built">
            2024 Season Cars
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARS.map((car, i) => (
            <div
              key={car.name}
              className={`reveal reveal-delay-${i + 1} card-hover bg-[oklch(0.14_0.006_260)] rounded-xl overflow-hidden border border-[oklch(0.22_0.006_260)] shadow-card`}
              data-ocid={`cars.item.${i + 1}`}
            >
              <div className="overflow-hidden h-44 bg-[oklch(0.09_0.005_260)]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="card-img w-full h-full object-cover"
                />
              </div>
              <div
                className="h-1 w-full"
                style={{ backgroundColor: car.color }}
              />
              <div className="p-4">
                <h3 className="font-display font-bold text-white text-lg">
                  {car.name}
                </h3>
                <p className="text-[oklch(0.62_0_0)] text-sm mt-1">
                  {car.team}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Gauge size={12} className="text-[oklch(0.52_0.22_25)]" />
                  <span className="text-[oklch(0.75_0_0)]">{car.engine}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Teams Section ────────────────────────────────────────────────────────────
const TEAMS = [
  {
    name: "Scuderia Ferrari",
    shortName: "Ferrari",
    color: "#DC0000",
    description:
      "The oldest and most successful team in F1 history, Scuderia Ferrari has been competing since the inaugural 1950 season.",
    sponsors: ["Shell", "Santander", "Ray-Ban", "Lenovo"],
    titles: 16,
  },
  {
    name: "Mercedes-AMG Petronas",
    shortName: "Mercedes",
    color: "#00D2BE",
    description:
      "Dominant force in the hybrid era, winning eight consecutive constructors' championships from 2014 to 2021.",
    sponsors: ["Petronas", "INEOS", "Tommy Hilfiger", "Google"],
    titles: 8,
  },
  {
    name: "Oracle Red Bull Racing",
    shortName: "Red Bull",
    color: "#3671C6",
    description:
      "The current constructor champions and home of Max Verstappen, Red Bull Racing has dominated recent seasons.",
    sponsors: ["Oracle", "Honda", "Bybit", "Mobil 1"],
    titles: 6,
  },
  {
    name: "McLaren F1 Team",
    shortName: "McLaren",
    color: "#FF8000",
    description:
      "Iconic British team with a rich heritage, McLaren has been a cornerstone of F1 since 1966 with 8 constructors' titles.",
    sponsors: ["Splunk", "Gulf", "Monster Energy", "OKX"],
    titles: 8,
  },
];

function TeamsSection() {
  return (
    <section
      id="teams"
      className="py-24 bg-[oklch(0.12_0.005_260)]"
      data-ocid="teams.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading subtitle="The elite constructors competing for glory">
            Featured Teams
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAMS.map((team, i) => (
            <div
              key={team.name}
              className={`reveal reveal-delay-${i + 1} card-hover bg-[oklch(0.14_0.006_260)] rounded-xl overflow-hidden border border-[oklch(0.22_0.006_260)] shadow-card`}
              data-ocid={`teams.item.${i + 1}`}
            >
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: team.color }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-black text-xs"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.shortName.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="flex items-center gap-1 text-[oklch(0.52_0.22_25)]">
                    <Trophy size={12} />
                    <span className="text-xs font-bold">{team.titles}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white text-base leading-tight mb-2">
                  {team.name}
                </h3>
                <p className="text-[oklch(0.62_0_0)] text-xs leading-relaxed mb-4">
                  {team.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {team.sponsors.map((sponsor) => (
                    <span
                      key={sponsor}
                      className="px-2 py-0.5 bg-[oklch(0.18_0.006_260)] rounded text-[oklch(0.75_0_0)] text-[11px] font-medium border border-[oklch(0.22_0.006_260)]"
                    >
                      {sponsor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tracks Section ───────────────────────────────────────────────────────────
const TRACKS = [
  {
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    length: "3.337 km",
    laps: 78,
    image: "/assets/generated/track-monaco.dim_800x500.jpg",
    flag: "🇲🇨",
  },
  {
    name: "Silverstone Circuit",
    location: "Northamptonshire, UK",
    length: "5.891 km",
    laps: 52,
    image: "/assets/generated/track-silverstone.dim_800x500.jpg",
    flag: "🇬🇧",
  },
  {
    name: "Autodromo di Monza",
    location: "Monza, Italy",
    length: "5.793 km",
    laps: 53,
    image: "/assets/generated/track-monza.dim_800x500.jpg",
    flag: "🇮🇹",
  },
  {
    name: "Suzuka Circuit",
    location: "Suzuka, Japan",
    length: "5.807 km",
    laps: 53,
    image: "/assets/generated/track-suzuka.dim_800x500.jpg",
    flag: "🇯🇵",
  },
];

function TracksSection() {
  return (
    <section
      id="tracks"
      className="py-24 bg-[oklch(0.10_0.005_260)]"
      data-ocid="tracks.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading subtitle="The legendary circuits that define Formula 1">
            Iconic Tracks
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRACKS.map((track, i) => (
            <div
              key={track.name}
              className={`reveal reveal-delay-${i + 1} card-hover group bg-[oklch(0.14_0.006_260)] rounded-xl overflow-hidden border border-[oklch(0.22_0.006_260)] shadow-card`}
              data-ocid={`tracks.item.${i + 1}`}
            >
              <div className="overflow-hidden h-44 relative">
                <img
                  src={track.image}
                  alt={track.name}
                  className="card-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-2xl">{track.flag}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-white text-base leading-tight">
                  {track.name}
                </h3>
                <div className="mt-2 flex items-center gap-1 text-[oklch(0.62_0_0)] text-xs">
                  <MapPin size={11} className="text-[oklch(0.52_0.22_25)]" />
                  <span>{track.location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[oklch(0.62_0_0)] text-xs">
                  <Flag size={11} className="text-[oklch(0.52_0.22_25)]" />
                  <span>
                    {track.length} &bull; {track.laps} laps
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/assets/generated/gallery-pitstop.dim_600x400.jpg",
    title: "Race Pit Stop",
  },
  {
    src: "/assets/generated/gallery-racestart.dim_600x400.jpg",
    title: "Race Start",
  },
  {
    src: "/assets/generated/gallery-podium.dim_600x400.jpg",
    title: "Victory Podium",
  },
  {
    src: "/assets/generated/gallery-cardetail.dim_600x400.jpg",
    title: "Technical Detail",
  },
];

function GallerySection() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    if (lightbox) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="py-24 bg-[oklch(0.12_0.005_260)]"
      data-ocid="gallery.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading subtitle="Unforgettable moments from the track">
            Gallery
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              type="button"
              key={img.src}
              onClick={() => setLightbox(img)}
              data-ocid={`gallery.item.${i + 1}`}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-xl aspect-[3/2] border border-[oklch(0.22_0.006_260)] cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="card-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <span className="w-full px-4 py-3 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left bg-gradient-to-t from-black/70">
                  {img.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          data-ocid="gallery.modal"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
          }}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            data-ocid="gallery.close_button"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white font-bold tracking-widest uppercase text-sm">
            {lightbox.title}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
const STATS = [
  { icon: Trophy, value: "75+", label: "Years of Racing" },
  { icon: Flag, value: "20", label: "Grands Prix per Season" },
  { icon: Users, value: "10", label: "Constructor Teams" },
  { icon: Calendar, value: "20", label: "Drivers per Season" },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-[oklch(0.10_0.005_260)]"
      data-ocid="about.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading>About Formula 1</SectionHeading>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal space-y-4">
            <p className="text-[oklch(0.75_0_0)] leading-relaxed">
              Formula One, or Formula 1 (F1), is the highest class of
              single-seat auto racing sanctioned by the Fédération
              Internationale de l'Automobile (FIA). The FIA Formula One World
              Championship has been one of the premier forms of racing around
              the world since its inaugural season in 1950.
            </p>
            <p className="text-[oklch(0.75_0_0)] leading-relaxed">
              The sport combines cutting-edge engineering, aerodynamics, and
              driver skill at speeds exceeding 350 km/h. Each race weekend
              brings qualifying sessions and a Grand Prix, with teams spending
              hundreds of millions developing cars that push the very limits of
              physics and technology.
            </p>
            <p className="text-[oklch(0.75_0_0)] leading-relaxed">
              From legendary rivalries like Senna vs. Prost to modern battles
              between Hamilton and Verstappen, Formula 1 has delivered decades
              of unforgettable moments that have captivated billions of fans
              worldwide.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`reveal reveal-delay-${i + 1} bg-[oklch(0.14_0.006_260)] rounded-xl p-6 border border-[oklch(0.22_0.006_260)] text-center`}
                data-ocid={`about.item.${i + 1}`}
              >
                <Icon
                  size={28}
                  className="text-[oklch(0.52_0.22_25)] mx-auto mb-3"
                />
                <div className="font-display font-extrabold text-white text-3xl">
                  {value}
                </div>
                <div className="text-[oklch(0.62_0_0)] text-xs mt-1 leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[oklch(0.12_0.005_260)]"
      data-ocid="contact.section"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="reveal">
          <SectionHeading subtitle="We'd love to hear from you">
            Get In Touch
          </SectionHeading>
        </div>
        <div className="max-w-lg mx-auto reveal">
          {submitted ? (
            <div
              className="bg-[oklch(0.14_0.006_260)] border border-green-500/30 rounded-xl p-8 text-center"
              data-ocid="contact.success_state"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-green-400" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Message Sent!
              </h3>
              <p className="text-[oklch(0.62_0_0)]">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", message: "" });
                }}
                className="mt-6 text-[oklch(0.52_0.22_25)] text-sm hover:underline"
                data-ocid="contact.secondary_button"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[oklch(0.14_0.006_260)] border border-[oklch(0.22_0.006_260)] rounded-xl p-8 space-y-5"
              data-ocid="contact.panel"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[oklch(0.75_0_0)] mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  data-ocid="contact.input"
                  className="w-full px-4 py-3 bg-[oklch(0.10_0.005_260)] border border-[oklch(0.22_0.006_260)] rounded-lg text-white placeholder-[oklch(0.42_0.006_260)] focus:outline-none focus:border-[oklch(0.52_0.22_25)] transition-colors text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[oklch(0.75_0_0)] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  data-ocid="contact.search_input"
                  className="w-full px-4 py-3 bg-[oklch(0.10_0.005_260)] border border-[oklch(0.22_0.006_260)] rounded-lg text-white placeholder-[oklch(0.42_0.006_260)] focus:outline-none focus:border-[oklch(0.52_0.22_25)] transition-colors text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[oklch(0.75_0_0)] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Your message..."
                  rows={5}
                  data-ocid="contact.textarea"
                  className="w-full px-4 py-3 bg-[oklch(0.10_0.005_260)] border border-[oklch(0.22_0.006_260)] rounded-lg text-white placeholder-[oklch(0.42_0.006_260)] focus:outline-none focus:border-[oklch(0.52_0.22_25)] transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-ocid="contact.submit_button"
                className="w-full py-3 bg-[oklch(0.52_0.22_25)] hover:bg-[oklch(0.46_0.22_25)] disabled:opacity-60 text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-200"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      className="bg-[oklch(0.09_0.005_260)] border-t border-[oklch(0.22_0.006_260)] py-12"
      data-ocid="footer.panel"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[oklch(0.52_0.22_25)] rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-black text-xs">
                F1
              </span>
            </div>
            <div>
              <div className="font-display font-extrabold text-white text-sm tracking-widest uppercase">
                Formula 1 World
              </div>
              <div className="text-[oklch(0.42_0.006_260)] text-xs">
                The Pinnacle of Motorsport
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`footer.${link.label.toLowerCase()}.link`}
                className="text-[oklch(0.62_0_0)] hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {[
              { Icon: Twitter, href: "https://x.com", label: "X/Twitter" },
              {
                Icon: Instagram,
                href: "https://instagram.com",
                label: "Instagram",
              },
              { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              {
                Icon: Facebook,
                href: "https://facebook.com",
                label: "Facebook",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-[oklch(0.14_0.006_260)] border border-[oklch(0.22_0.006_260)] flex items-center justify-center text-[oklch(0.62_0_0)] hover:text-[oklch(0.52_0.22_25)] hover:border-[oklch(0.52_0.22_25)] transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[oklch(0.22_0.006_260)] text-center">
          <p className="text-[oklch(0.42_0.006_260)] text-sm">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.52_0.22_25)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Active Section Hook ──────────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sectionIds = [
      "home",
      "cars",
      "teams",
      "tracks",
      "gallery",
      "about",
      "contact",
    ];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const o of observers) o?.disconnect();
    };
  }, []);

  return active;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);
  const activeSection = useActiveSection();
  useScrollReveal();

  return (
    <div className="min-h-screen">
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <CarsSection />
        <TeamsSection />
        <TracksSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
