"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { configAPI } from '@/services/api';
import { getImageUrl } from '@/utils/imageUrl';

const socialLinks = [
  { icon: "GlobeAltIcon", label: "Site web", href: "https://www.migmotors.net" },
  { icon: "CameraIcon", label: "Instagram", href: "#" },
  { icon: "ChatBubbleLeftEllipsisIcon", label: "Facebook", href: "#" },
];

const schedule = [
  { day: "Lundi", hours: "08H00 — 18H30" },
  { day: "Mardi", hours: "08H00 — 18H30" },
  { day: "Mercredi", hours: "08H00 — 18H30" },
  { day: "Jeudi", hours: "08H00 — 18H30" },
  { day: "Vendredi", hours: "08H00 — 18H30" },
  { day: "Samedi", hours: "09H00 — 13H00" },
  { day: "Dimanche", hours: "Fermé" },
];

export default function Footer() {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const config = await configAPI.get();
        if (config.site_logo) {
          setLogo(config.site_logo);
        }
      } catch (error) {
        console.error('Erreur chargement logo:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLogo();
  }, []);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-vm-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {!loading && logo ? (
                <img 
                  src={getImageUrl(logo)} 
                  alt="MIG Motors" 
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  MIG Motors
                </span>
              )}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Distributeur exclusif au Bénin des plus grandes marques automobiles. Excellence, proximité et expertise depuis 2013.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-vm-dark-card border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-vm-red hover:text-white hover:border-vm-red transition-all"
                >
                  <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-4">
              Coordonnées
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2">
                <Icon name="MapPinIcon" size={16} className="text-vm-red flex-shrink-0 mt-0.5" />
                <div>
                  <p>124 Zongo Ehuzu 569 ZB, Ehuzu</p>
                  <p>06 BP 2026</p>
                  <p>Cotonou - Bénin</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="PhoneIcon" size={16} className="text-vm-red flex-shrink-0" />
                <div>
                  <a href="tel:+22901213100229" className="hover:text-vm-red transition-colors">
                    (+229) 01 21 31 00 29
                  </a>
                  <br />
                  <a href="tel:+22901619864606" className="hover:text-vm-red transition-colors">
                    (+229) 01 61 98 64 06
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="GlobeAltIcon" size={16} className="text-vm-red flex-shrink-0" />
                <a href="https://www.migmotors.net" target="_blank" rel="noopener noreferrer" className="hover:text-vm-red transition-colors">
                  www.migmotors.net
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-4">
              Horaires d'ouverture
            </h3>
            <div className="space-y-2 text-sm">
              {schedule.map((item) => (
                <div key={item.day} className="flex justify-between items-center">
                  <span className={`${
                    item.hours === "Fermé" 
                      ? "text-gray-400 dark:text-gray-600" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {item.day}
                  </span>
                  <span className={`font-medium ${
                    item.hours === "Fermé" 
                      ? "text-gray-400 dark:text-gray-600" 
                      : "text-gray-900 dark:text-white"
                  }`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-4">
              Navigation
            </h3>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Accueil
              </Link>
              <Link href="/products" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Véhicules
              </Link>
              <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                À Propos
              </Link>
              <Link href="/brands" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Marques
              </Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="block text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <p>
              © {new Date().getFullYear()} MIG Motors SA. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}