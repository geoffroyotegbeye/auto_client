"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { usePrice } from "@/hooks/usePrice";

import { heroAPI, brandsAPI } from "@/services/api";
import { getImageUrl } from "@/utils/imageUrl";

interface HeroSettings {
  title_line1: string;
  title_line2: string;
  title_line3: string;
  subtitle: string;
  badge_text: string;
  badge_subtext: string;
  main_image: string;
  card_title: string;
  card_subtitle: string;
  card_price: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
  floating_card_title: string;
  floating_card_text: string;
}

interface Stats {
  vehicles: number;
  brands: number;
  satisfaction: number;
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const [settings, setSettings] = useState<HeroSettings | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États pour la recherche rapide
  const [searchBrand, setSearchBrand] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchFuel, setSearchFuel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroSettings, heroStats, brandsData] = await Promise.all([
          heroAPI.getSettings(),
          heroAPI.getStats(),
          brandsAPI.getAll({ active: 'true' })
        ]);
        
        setSettings(heroSettings);
        setStats(heroStats);
        setBrands(brandsData);
      } catch (error) {
        console.error('Erreur lors du chargement du hero:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-hidden")?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, [settings]);

  if (loading || !settings || !stats) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20 bg-white dark:bg-vm-dark">
        <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin" />
      </section>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.floor(num / 1000)}K+`;
    return num.toString();
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchBrand) params.append('brand', searchBrand);
    if (searchBudget) params.append('maxPrice', searchBudget);
    if (searchFuel) params.append('fuel', searchFuel);
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-white dark:bg-vm-dark">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />
      
      {/* Background accent glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(248,34,0,0.06) 0%, transparent 70%)"
        }} />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Typography + Search */}
          <div className="lg:col-span-7 space-y-10">
            {/* Eyebrow */}
            <div className="reveal-hidden flex items-center gap-4">
              <span className="badge badge-accent">{settings.badge_text}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">
                {settings.badge_subtext}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title reveal-hidden delay-1 text-gray-900 dark:text-white" ref={titleRef}>
              {settings.title_line1}
              <br />
              <span className="italic text-vm-red accent-glow">{settings.title_line2}</span>
              <br />
              {settings.title_line3}
            </h1>

            {/* Sub */}
            <p className="reveal-hidden delay-2 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-medium" style={{ whiteSpace: 'pre-line' }}>
              {settings.subtitle}
            </p>

            {/* Search Glass Card */}
            <div className="reveal-hidden delay-3 bg-gray-50/80 dark:bg-vm-dark-card/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 max-w-xl shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-500 mb-4">
                Recherche rapide
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <select 
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm w-full outline-none focus:border-vm-red transition-colors"
                >
                  <option value="">Marque</option>
                  {brands.slice(0, 10).map((brand) => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
                <select 
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm w-full outline-none focus:border-vm-red transition-colors"
                >
                  <option value="">Budget max</option>
                  <option value="5000000">5 000 000 FCFA</option>
                  <option value="10000000">10 000 000 FCFA</option>
                  <option value="15000000">15 000 000 FCFA</option>
                  <option value="20000000">20 000 000 FCFA</option>
                  <option value="30000000">30 000 000 FCFA</option>
                  <option value="100000000">+ 30 000 000 FCFA</option>
                </select>
                <select 
                  value={searchFuel}
                  onChange={(e) => setSearchFuel(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm w-full outline-none focus:border-vm-red transition-colors"
                >
                  <option value="">Carburant</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                </select>
              </div>
              <button 
                onClick={handleSearch}
                className="btn-primary w-full justify-center rounded-lg"
              >
                <Icon name="MagnifyingGlassIcon" size={16} />
                Rechercher
              </button>
            </div>

            {/* Quick stats */}
            <div className="reveal-hidden delay-4 flex items-center gap-8">
              <div>
                <span className="font-display text-2xl font-bold text-vm-red">
                  {formatNumber(stats.vehicles)}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 mt-1">
                  Annonces
                </p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-vm-red">
                  {stats.brands}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 mt-1">
                  Marques
                </p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-vm-red">
                  {stats.satisfaction}%
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 mt-1">
                  Clients satisfaits
                </p>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards */}
          <div className="lg:col-span-5 hidden lg:block relative h-[600px]">
            {/* Main car image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden float-animation shadow-2xl">
              <img
                src={getImageUrl(settings.main_image)}
                alt={settings.card_subtitle}
                className="w-full h-full object-cover" />
              
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(26,26,31,0.9) 0%, transparent 60%)"
                }} />
              
              {/* Badge on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 dark:bg-vm-dark-card/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                        {settings.card_title}
                      </p>
                      <p className="font-display text-xl font-bold mt-1 text-gray-900 dark:text-white">{settings.card_subtitle}</p>
                      <p className="text-vm-red font-bold text-lg">{settings.card_price}</p>
                    </div>
                    <Link
                      href="/products"
                      className="w-12 h-12 rounded-full bg-vm-red flex items-center justify-center flex-shrink-0 hover:bg-vm-red-light transition-colors shadow-lg">
                      
                      <Icon name="ArrowRightIcon" size={18} className="text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card top-right */}
            <div
              className="absolute -top-4 -right-4 bg-white/90 dark:bg-vm-dark-card/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 z-10 float-animation-2 w-44 shadow-2xl"
              style={{ animationDelay: "1s" }}>
              
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
                {settings.floating_card_title}
              </p>
              <p className="font-bold text-sm mt-1 text-gray-900 dark:text-white">{settings.floating_card_text}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
                <span className="text-[10px] text-gray-600 dark:text-gray-400">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">
          Défiler
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-400 dark:from-gray-600 to-transparent" />
      </div>
    </section>);

}