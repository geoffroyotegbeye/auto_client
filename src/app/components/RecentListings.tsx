"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { vehiclesAPI } from "@/services/api";
import { getImageUrl } from "@/utils/imageUrl";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  transmission: string;
  main_image: string;
  status: string;
  created_at: string;
}

const fuelColors: Record<string, string> = {
  Électrique: "text-green-400",
  Hybride: "text-emerald-400",
  "Hybride rechargeable": "text-teal-400",
  Essence: "text-orange-400",
  Diesel: "text-yellow-400",
  GPL: "text-purple-400"
};

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
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
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const daysAgo = (() => {
    const date = new Date(vehicle.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  })();

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`
      }}
    >
      <Link href={`/products/${vehicle.id}`}>
        <div
          className="group relative bg-white dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-vm-red transition-all duration-300 shadow-md hover:shadow-xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease-out, border-color 0.3s"
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(248,34,0,0.15) 0%, transparent 70%)"
            }}
          />

          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={getImageUrl(vehicle.main_image)}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vm-dark via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {daysAgo <= 7 && (
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(248,34,0,0.15)",
                    color: "#f82200",
                    border: "1px solid rgba(248,34,0,0.3)",
                    backdropFilter: "blur(8px)"
                  }}
                >
                  Nouveau
                </span>
              )}
            </div>
            
            {/* Days ago */}
            <div className="absolute bottom-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                {daysAgo === 0 ? "Aujourd'hui" : `Il y a ${daysAgo}j`}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-vm-red mb-1">
                  {vehicle.brand}
                </p>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                  {vehicle.model}
                </h3>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-vm-red">
                  {Math.floor(vehicle.price).toLocaleString("fr-FR")} FCFA
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">{vehicle.year}</p>
              </div>
            </div>

            {/* Stats row */}
            <div
              className="flex items-center gap-3 pt-3 mt-3"
              style={{ borderTop: "1px solid rgba(84,86,92,0.15)" }}
            >
              <div className="flex items-center gap-1.5">
                <Icon name="ChartBarIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                <span className="text-[10px] text-gray-600 dark:text-gray-400">{vehicle.km.toLocaleString("fr-FR")} km</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="BoltIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                <span className="text-[10px] text-gray-600 dark:text-gray-400">{vehicle.fuel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="CogIcon" size={11} className="text-gray-500 dark:text-gray-500" />
                <span className="text-[10px] text-gray-600 dark:text-gray-400">{vehicle.transmission}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function RecentListings() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const filters = ["Tous", "Électrique", "Hybride", "Essence", "Diesel"];

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesAPI.getAll({ status: 'available' });
        const vehiclesList = data.vehicles || data;
        const sorted = vehiclesList
          .filter((v: Vehicle) => v.status === 'available')
          .sort((a: Vehicle, b: Vehicle) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6);
        setVehicles(sorted);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

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

  const filtered =
    activeFilter === "Tous"
      ? vehicles
      : vehicles.filter((v) => v.fuel.includes(activeFilter));

  if (loading) {
    return (
      <section className="py-32 bg-gray-50 dark:bg-vm-dark relative overflow-hidden" ref={sectionRef}>
        {/* Background grid + glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(248,34,0,0.03) 40%, transparent 100%)",
            backgroundImage: "linear-gradient(to right, rgba(84,86,92,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(84,86,92,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(248,34,0,0.06) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
                Dernières annonces
              </p>
              <h2 className="section-title text-gray-900 dark:text-white">
                Ajoutées
                <br />
                <span className="italic font-light text-gray-600 dark:text-gray-400">récemment.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-4 max-w-sm leading-relaxed">
                Découvrez les dernières annonces ajoutées sur notre plateforme.
                Survol pour l'effet 3D.
              </p>
            </div>
          </div>

          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin mx-auto mb-4" />
            Chargement des annonces...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-gray-50 dark:bg-vm-dark relative overflow-hidden" ref={sectionRef}>
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(248,34,0,0.03) 40%, transparent 100%)",
          backgroundImage: "linear-gradient(to right, rgba(84,86,92,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(84,86,92,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(248,34,0,0.06) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)"
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
              Dernières annonces
            </p>
            <h2 className="section-title text-gray-900 dark:text-white">
              Nouveautés
              <br />
              <span className="italic font-light text-gray-600 dark:text-gray-400">du showroom.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-4 max-w-sm leading-relaxed">
              Découvrez les dernières annonces ajoutées sur notre plateforme.
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s"
            }}
          >
            <div className="flex flex-wrap gap-2 justify-end mb-4">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] rounded-full transition-all ${
                    activeFilter === f
                      ? "bg-vm-red text-white"
                      : "bg-gray-100 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-vm-red"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <Link href="/products" className="btn-outline inline-flex items-center gap-2">
              Voir tout le catalogue
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Icon name="TruckIcon" size={48} className="text-gray-500 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Aucun véhicule trouvé pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}