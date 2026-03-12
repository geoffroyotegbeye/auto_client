"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface ChineseCar {
  id: string;
  name: string;
  brand: string;
  origin: string;
  price: string;
  year: number;
  range?: string;
  power: string;
  fuel: string;
  image: string;
  alt: string;
  badge?: string;
  color: string;
  tagline: string;
}

const chineseCars: ChineseCar[] = [
{
  id: "byd-han",
  name: "Han EV",
  brand: "BYD",
  origin: "Chine",
  price: "49 900 €",
  year: 2024,
  range: "610 km",
  power: "517 ch",
  fuel: "Électrique",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16edf0c81-1772528804993.png",
  alt: "BYD Han EV berline électrique rouge vue de profil sur route urbaine",
  badge: "Nouveau",
  color: "#E8A020",
  tagline: "L'élégance électrique"
},
{
  id: "nio-et7",
  name: "ET7",
  brand: "NIO",
  origin: "Chine",
  price: "69 900 €",
  year: 2024,
  range: "580 km",
  power: "644 ch",
  fuel: "Électrique",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f296a3e-1767747321990.png",
  alt: "NIO ET7 berline électrique blanche futuriste vue de trois-quarts avant",
  badge: "Premium",
  color: "#60A5FA",
  tagline: "Le futur est maintenant"
},
{
  id: "xpeng-p7",
  name: "P7",
  brand: "XPENG",
  origin: "Chine",
  price: "44 500 €",
  year: 2024,
  range: "670 km",
  power: "316 ch",
  fuel: "Électrique",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14824822a-1772528805046.png",
  alt: "XPENG P7 coupé électrique gris métallisé sur autoroute de nuit",
  badge: "Tendance",
  color: "#A78BFA",
  tagline: "Technologie de pointe"
},
{
  id: "li-auto-l9",
  name: "L9",
  brand: "Li Auto",
  origin: "Chine",
  price: "58 000 €",
  year: 2024,
  range: "1315 km",
  power: "449 ch",
  fuel: "Hybride",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_106f3eb20-1772528802755.png",
  alt: "Li Auto L9 SUV hybride noir luxueux vue de face en milieu naturel",
  badge: "Exclusif",
  color: "#34D399",
  tagline: "SUV de luxe hybride"
},
{
  id: "zeekr-001",
  name: "001",
  brand: "ZEEKR",
  origin: "Chine",
  price: "52 900 €",
  year: 2024,
  range: "620 km",
  power: "544 ch",
  fuel: "Électrique",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5933d05-1772528803334.png",
  alt: "ZEEKR 001 shooting brake électrique blanc sur route côtière",
  badge: "Sport",
  color: "#F472B6",
  tagline: "Performance redéfinie"
},
{
  id: "byd-seal",
  name: "Seal",
  brand: "BYD",
  origin: "Chine",
  price: "41 990 €",
  year: 2024,
  range: "570 km",
  power: "313 ch",
  fuel: "Électrique",
  image: "https://images.unsplash.com/photo-1728469877659-af24d1014059",
  alt: "BYD Seal berline électrique bleue vue de profil sur fond urbain nocturne",
  badge: "Populaire",
  color: "#E8A020",
  tagline: "Accessible & puissant"
}];


function Car3DCard({ car, index }: {car: ChineseCar;index: number;}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 120);
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="chinese-car-wrapper"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`
      }}>
      
      <div
        className="chinese-car-scene"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ cursor: "pointer" }}>
        
        <div
          className="chinese-car-card"
          style={{
            transform: isFlipped ?
            "rotateY(180deg)" :
            `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isFlipped ?
            "transform 0.7s cubic-bezier(0.16,1,0.3,1)" :
            "transform 0.15s ease-out"
          }}>
          
          {/* Front face */}
          <div className="chinese-car-face chinese-car-front">
            {/* Glow accent */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${car.color}18 0%, transparent 70%)`
              }} />
            

            {/* Badge */}
            {car.badge &&
            <div className="absolute top-4 left-4 z-20">
                <span
                className="text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
                style={{
                  background: `${car.color}22`,
                  color: car.color,
                  border: `1px solid ${car.color}44`,
                  backdropFilter: "blur(8px)"
                }}>
                
                  {car.badge}
                </span>
              </div>
            }

            {/* Flip hint */}
            <div className="absolute top-4 right-4 z-20">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                
                <Icon name="ArrowPathIcon" size={12} className="text-gray-600 dark:text-gray-400" />
              </div>
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <AppImage
                src={car.image}
                alt={car.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-vm-dark via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.35em] mb-1"
                    style={{ color: car.color }}>
                    
                    {car.brand} · {car.origin}
                  </p>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{car.name}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-500 mt-0.5 italic">{car.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold" style={{ color: car.color }}>
                    {car.price}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">{car.year}</p>
                </div>
              </div>

              {/* Stats row */}
              <div
                className="flex items-center gap-3 pt-3 mt-3"
                style={{ borderTop: "1px solid rgba(84,86,92,0.15)" }}>
                
                {car.range &&
                <div className="flex items-center gap-1.5">
                    <Icon name="BoltIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">{car.range}</span>
                  </div>
                }
                <div className="flex items-center gap-1.5">
                  <Icon name="CpuChipIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                  <span className="text-[10px] text-gray-600 dark:text-gray-400">{car.power}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="FireIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                  <span className="text-[10px] text-gray-600 dark:text-gray-400">{car.fuel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back face */}
          <div className="chinese-car-face chinese-car-back">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${car.color}15 0%, #1a1a1f 60%)`
              }} />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
              {/* Brand circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: `${car.color}18`,
                  border: `2px solid ${car.color}44`
                }}>
                
                <span
                  className="font-display text-lg font-bold"
                  style={{ color: car.color }}>
                  
                  {car.brand.slice(0, 2)}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {car.brand} {car.name}
              </h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 italic mb-6">{car.tagline}</p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 w-full mb-6">
                {[
                { label: "Année", value: car.year.toString() },
                { label: "Motorisation", value: car.fuel },
                ...(car.range ? [{ label: "Autonomie", value: car.range }] : []),
                { label: "Puissance", value: car.power }].
                map((spec) =>
                <div
                  key={spec.label}
                  className="rounded-xl p-3 text-left"
                  style={{ background: "rgba(84,86,92,0.1)", border: "1px solid rgba(84,86,92,0.2)" }}>
                  
                    <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 dark:text-gray-500 mb-1">
                      {spec.label}
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">{spec.value}</p>
                  </div>
                )}
              </div>

              <Link
                href="/products"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full transition-all duration-300"
                style={{
                  background: `${car.color}18`,
                  color: car.color,
                  border: `1px solid ${car.color}44`
                }}>
                
                Voir l'annonce
                <Icon name="ArrowRightIcon" size={11} />
              </Link>

              <p className="text-[9px] text-gray-500 dark:text-gray-500 mt-4">Cliquez pour retourner</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

export default function ChineseCars3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          "linear-gradient(to bottom, transparent 0%, rgba(248,34,0,0.03) 40%, transparent 100%)",
          backgroundImage:
          "linear-gradient(to right, rgba(84,86,92,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(84,86,92,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(248,34,0,0.06) 0%, transparent 70%)",
          filter: "blur(40px)"
        }} />
      

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)"
            }}>
            
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
              Innovation Asiatique
            </p>
            <h2 className="section-title">
              Voitures
              <br />
              <span className="italic font-light text-gray-600 dark:text-gray-400">chinoises.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-4 max-w-sm leading-relaxed">
              Découvrez les marques électriques chinoises qui révolutionnent l'automobile mondiale.
              Cliquez sur une carte pour explorer les specs.
            </p>
          </div>

          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s"
            }}>
            
            {/* Brand pills */}
            <div className="flex flex-wrap gap-2 justify-end">
              {["BYD", "NIO", "XPENG", "Li Auto", "ZEEKR"].map((brand) =>
              <span
                key={brand}
                className="text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(248,34,0,0.08)",
                  border: "1px solid rgba(248,34,0,0.2)",
                  color: "#54565c"
                }}>
                
                  {brand}
                </span>
              )}
            </div>
            <Link
              href="/products"
              className="btn-outline mt-4 inline-flex items-center gap-2">
              
              Voir tout le catalogue
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chineseCars.map((car, index) =>
          <Car3DCard key={car.id} car={car} index={index} />
          )}
        </div>

        {/* Bottom floating badge */}
        <div
          className="flex items-center justify-center mt-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 1s ease 0.8s"
          }}>
          
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: "rgba(84,86,92,0.08)",
              border: "1px solid rgba(84,86,92,0.15)"
            }}>
            
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-500">
              Survol pour l'effet 3D · Clic pour les specs
            </span>
          </div>
        </div>
      </div>
    </section>);

}