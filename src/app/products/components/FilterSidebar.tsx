"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import { brandsAPI } from '@/services/api';

interface Filters {
  brands: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  fuels: string[];
  bodyStyles: string[];
  transmissions: string[];
  kmMax: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  priceRange?: { minPrice: number; maxPrice: number };
  currency?: string;
}

interface Brand {
  id: number;
  name: string;
  logo?: string;
}

const fuelOptions = ["Essence", "Diesel", "Hybride", "Hybride rechargeable", "Électrique", "GPL"];
const bodyOptions = ["Berline", "SUV", "Break", "Coupé", "Cabriolet", "Monospace", "Citadine", "Pick-up"];
const transmissionOptions = ["Manuelle", "Automatique", "Semi-automatique"];

export default function FilterSidebar({ filters, onChange, onReset, isOpen, onClose, priceRange, currency = 'FCFA' }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["brand", "price", "fuel"]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    brandsAPI.getAll().then(data => {
      setBrands(data.sort((a: Brand, b: Brand) => a.name.localeCompare(b.name)));
    }).catch(err => console.error('Erreur chargement marques:', err));
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const toggleBrand = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: updated });
  };

  const toggleFuel = (fuel: string) => {
    const updated = filters.fuels.includes(fuel)
      ? filters.fuels.filter((f) => f !== fuel)
      : [...filters.fuels, fuel];
    onChange({ ...filters, fuels: updated });
  };

  const toggleBody = (body: string) => {
    const updated = filters.bodyStyles.includes(body)
      ? filters.bodyStyles.filter((b) => b !== body)
      : [...filters.bodyStyles, body];
    onChange({ ...filters, bodyStyles: updated });
  };

  const toggleTransmission = (t: string) => {
    const updated = filters.transmissions.includes(t)
      ? filters.transmissions.filter((x) => x !== t)
      : [...filters.transmissions, t];
    onChange({ ...filters, transmissions: updated });
  };

  const sectionHeader = (id: string, label: string) => (
    <button
      className="flex items-center justify-between w-full py-3 text-left"
      onClick={() => toggleSection(id)}
    >
      <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white">{label}</span>
      <Icon
        name={expandedSections.includes(id) ? "ChevronUpIcon" : "ChevronDownIcon"}
        size={14}
        className="text-gray-500 dark:text-gray-500"
      />
    </button>
  );

  const content = (
    <div className="w-72 flex-shrink-0 bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 h-fit sticky top-24 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-[13px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">Filtres</h3>
        <button
          onClick={onReset}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-vm-red hover:text-red-600 transition-colors"
        >
          Réinitialiser
        </button>
      </div>

      <div className="p-6 space-y-1">
        {/* Brand */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          {sectionHeader("brand", "Marque")}
          {expandedSections.includes("brand") && (
            <div className="mt-2 space-y-2 max-h-52 overflow-y-auto pr-1">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-vm-red focus:ring-vm-red"
                    checked={filters.brands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                  />
                  <span className="text-[12px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          {sectionHeader("price", "Budget")}
          {expandedSections.includes("price") && (
            <div className="mt-3 space-y-4">
              <div className="flex items-center justify-between text-[12px] text-gray-600 dark:text-gray-400">
                <span>{Math.floor(filters.priceMin).toLocaleString("fr-FR")} {currency}</span>
                <span>{Math.floor(filters.priceMax).toLocaleString("fr-FR")} {currency}</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-2">Prix minimum</p>
                <input
                  type="range"
                  min={priceRange?.minPrice || 0}
                  max={priceRange?.maxPrice || 100000000}
                  step={100000}
                  value={filters.priceMin}
                  onChange={(e) => {
                    const newMin = Number(e.target.value);
                    if (newMin <= filters.priceMax) {
                      onChange({ ...filters, priceMin: newMin });
                    }
                  }}
                  className="w-full"
                />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-2">Prix maximum</p>
                <input
                  type="range"
                  min={priceRange?.minPrice || 0}
                  max={priceRange?.maxPrice || 100000000}
                  step={100000}
                  value={filters.priceMax}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    if (newMax >= filters.priceMin) {
                      onChange({ ...filters, priceMax: newMax });
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Year */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          {sectionHeader("year", "Année")}
          {expandedSections.includes("year") && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">De</p>
                <select
                  className="bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm w-full text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                  value={filters.yearMin}
                  onChange={(e) => onChange({ ...filters, yearMin: Number(e.target.value) })}
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">À</p>
                <select
                  className="bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm w-full text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                  value={filters.yearMax}
                  onChange={(e) => onChange({ ...filters, yearMax: Number(e.target.value) })}
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Fuel */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          {sectionHeader("fuel", "Carburant")}
          {expandedSections.includes("fuel") && (
            <div className="mt-2 space-y-2">
              {fuelOptions.map((fuel) => (
                <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-vm-red focus:ring-vm-red"
                    checked={filters.fuels.includes(fuel)}
                    onChange={() => toggleFuel(fuel)}
                  />
                  <span className="text-[12px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {fuel}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          {sectionHeader("body", "Carrosserie")}
          {expandedSections.includes("body") && (
            <div className="mt-2 flex flex-wrap gap-2">
              {bodyOptions.map((body) => (
                <button
                  key={body}
                  onClick={() => toggleBody(body)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] border rounded transition-all ${
                    filters.bodyStyles.includes(body)
                      ? "bg-vm-red border-vm-red text-white"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-vm-red"
                  }`}
                >
                  {body}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Transmission */}
        <div className="pb-4">
          {sectionHeader("transmission", "Boîte")}
          {expandedSections.includes("transmission") && (
            <div className="mt-2 space-y-2">
              {transmissionOptions.map((t) => (
                <label key={t} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-vm-red focus:ring-vm-red"
                    checked={filters.transmissions.includes(t)}
                    onChange={() => toggleTransmission(t)}
                  />
                  <span className="text-[12px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{content}</div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 w-80 h-full overflow-y-auto bg-gray-50 dark:bg-vm-dark-card border-r border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-[13px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">Filtres</h3>
              <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <div className="p-6">{/* Reuse same filter groups */}</div>
          </div>
        </div>
      )}
    </>
  );
}