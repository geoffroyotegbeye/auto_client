"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";
import ThemeToggle from "@/components/ThemeToggle";
import { configAPI } from "@/services/api";
import { getImageUrl } from "@/utils/imageUrl";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Véhicules", href: "/products" },
  { label: "À Propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoDark, setLogoDark] = useState<string | null>(null);

  // Charger le logo
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const config = await configAPI.get();
        if (config.site_logo) {
          setLogo(config.site_logo);
        }
        if (config.site_logo_dark) {
          setLogoDark(config.site_logo_dark);
        }
      } catch (error) {
        console.error('Erreur chargement logo:', error);
      }
    };
    loadLogo();
  }, []);

  // Effet de transparence au scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer le scroll du corps de la page quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  // Fermer le menu au changement de page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-vm-dark/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group z-[60]">
          <div className="flex items-center gap-2">
            {logo || logoDark ? (
              <>
                {logo && (
                  <img 
                    src={getImageUrl(logo)} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain dark:hidden"
                  />
                )}
                {logoDark && (
                  <img 
                    src={getImageUrl(logoDark)} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain hidden dark:block"
                  />
                )}
                {!logo && logoDark && (
                  <img 
                    src={getImageUrl(logoDark)} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain dark:hidden"
                  />
                )}
                {logo && !logoDark && (
                  <img 
                    src={getImageUrl(logo)} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain hidden dark:block"
                  />
                )}
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Mig Motor
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[11px] font-bold uppercase tracking-[0.25em] transition-colors ${
                  isActive ? "text-vm-red" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && <span className="absolute -bottom-2 left-0 h-[2px] bg-vm-red w-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Mobile */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Bouton recherche - Desktop: avec texte, Mobile: icône seulement */}
          <Link 
            href="/products" 
            className="btn-primary text-[11px] py-2 rounded-full lg:px-6 px-2.5"
            aria-label="Rechercher"
          >
            <Icon name="MagnifyingGlassIcon" size={14} />
            <span className="hidden lg:inline">Rechercher</span>
          </Link>
          
          <button
            className="lg:hidden p-2 text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:hover:text-[#F5F0E8] transition-colors z-[60]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <Icon name={mobileOpen ? "XMarkIcon" : "Bars3Icon"} size={28} />
          </button>
        </div>
      </div>

      {/* Menu Mobile - Version Drawer Latéral */}
      <div
        className={`lg:hidden fixed inset-0 w-full h-screen bg-white dark:bg-vm-dark transition-transform duration-500 ease-in-out z-50 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xl font-bold uppercase tracking-[0.3em] ${
                pathname === link.href ? "text-vm-red" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/products" 
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full max-w-xs py-4 text-center rounded-lg flex justify-center items-center gap-3 mt-4"
          >
            <Icon name="MagnifyingGlassIcon" size={20} />
            Rechercher un véhicule
          </Link>
          <div className="mt-6">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}