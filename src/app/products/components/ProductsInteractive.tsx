"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import FilterSidebar from "./FilterSidebar";
import VehicleCard, { VehicleItem } from "./VehicleCard";
import { vehiclesAPI, configAPI } from "@/services/api";

const getDefaultFilters = (minPrice = 0, maxPrice = 100000000) => ({
  brands: [] as string[],
  priceMin: minPrice,
  priceMax: maxPrice,
  yearMin: 2010,
  yearMax: 2024,
  fuels: [] as string[],
  bodyStyles: [] as string[],
  transmissions: [] as string[],
  kmMax: 200000
});

const sortOptions = [
{ value: "recent", label: "Plus récent" },
{ value: "price-asc", label: "Prix croissant" },
{ value: "price-desc", label: "Prix décroissant" },
{ value: "km-asc", label: "Kilométrage croissant" },
{ value: "year-desc", label: "Année décroissante" }];


const ITEMS_PER_PAGE = 12;

export default function ProductsInteractive() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(getDefaultFilters());
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState<VehicleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 100000000 });
  const [currency, setCurrency] = useState('FCFA');
  const [initialFiltersApplied, setInitialFiltersApplied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fetchData = async () => {
      try {
        const [vehiclesData, priceData, configData] = await Promise.all([
          vehiclesAPI.getAll({ status: 'available' }),
          configAPI.getPriceRange(),
          configAPI.get()
        ]);
        
        const vehiclesList = Array.isArray(vehiclesData) ? vehiclesData : (vehiclesData.vehicles || []);
        const mapped = vehiclesList.map((v: any) => ({
          id: v.id.toString(),
          brand: v.brand,
          model: v.model,
          version: v.version || '',
          price: parseFloat(v.price) || 0,
          year: v.year,
          km: v.km,
          fuel: v.fuel,
          transmission: v.transmission,
          power: v.power || '',
          location: v.location || 'Zongo, Bénin',
          image: v.main_image,
          alt: `${v.brand} ${v.model}`,
          isNew: v.is_new || false,
          badge: v.badge || '',
          badgeType: v.badge_type || 'badge-new',
          daysAgo: 0
        }));
        setVehicles(mapped);
        setPriceRange(priceData);
        setCurrency(configData.currency_symbol || 'FCFA');
        
        // Appliquer les filtres depuis l'URL
        const brand = searchParams.get('brand');
        const maxPrice = searchParams.get('maxPrice');
        const fuel = searchParams.get('fuel');
        
        const newFilters = getDefaultFilters(priceData.minPrice, priceData.maxPrice);
        if (brand) newFilters.brands = [brand];
        if (maxPrice) newFilters.priceMax = parseInt(maxPrice);
        if (fuel) newFilters.fuels = [fuel];
        
        setFilters(newFilters);
        setInitialFiltersApplied(true);
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mounted, searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal-hidden").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page, filters, sort]);

  const filtered = useMemo(() => {
    let result = vehicles;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.version.toLowerCase().includes(q)
      );
    }
    if (filters.brands.length) result = result.filter((v) => filters.brands.includes(v.brand));
    if (filters.fuels.length) result = result.filter((v) => filters.fuels.includes(v.fuel));
    if (filters.transmissions.length) result = result.filter((v) => filters.transmissions.includes(v.transmission));
    result = result.filter((v) => v.price >= filters.priceMin && v.price <= filters.priceMax);
    result = result.filter((v) => v.year >= filters.yearMin && v.year <= filters.yearMax);

    switch (sort) {
      case "price-asc":result = [...result].sort((a, b) => a.price - b.price);break;
      case "price-desc":result = [...result].sort((a, b) => b.price - a.price);break;
      case "km-asc":result = [...result].sort((a, b) => a.km - b.km);break;
      case "year-desc":result = [...result].sort((a, b) => b.year - a.year);break;
      default:result = [...result].sort((a, b) => a.daysAgo - b.daysAgo);
    }

    return result;
  }, [filters, sort, searchQuery, vehicles]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilterCount =
  filters.brands.length +
  filters.fuels.length +
  filters.transmissions.length +
  filters.bodyStyles.length + (
  filters.priceMin > priceRange.minPrice || filters.priceMax < priceRange.maxPrice ? 1 : 0) + (
  filters.yearMin > 2010 || filters.yearMax < 2024 ? 1 : 0);

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "brand":setFilters((f) => ({ ...f, brands: f.brands.filter((b) => b !== value) }));break;
      case "fuel":setFilters((f) => ({ ...f, fuels: f.fuels.filter((x) => x !== value) }));break;
      case "transmission":setFilters((f) => ({ ...f, transmissions: f.transmissions.filter((x) => x !== value) }));break;
      case "body":setFilters((f) => ({ ...f, bodyStyles: f.bodyStyles.filter((x) => x !== value) }));break;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
      {!mounted || loading ? (
        <div className="flex items-center justify-center py-32">
          <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin" />
        </div>
      ) : (
        <>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Marque, modèle, version..."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value);setPage(1);}}
            className="w-full bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors" />
          
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden btn-outline px-4 py-2.5 text-[11px] relative">
            
            <Icon name="FunnelIcon" size={14} />
            Filtres
            {activeFilterCount > 0 &&
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-vm-red text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            }
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {setSort(e.target.value);setPage(1);}}
            className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm pr-8 text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors">
            
            {sortOptions.map((o) =>
            <option key={o.value} value={o.value}>{o.label}</option>
            )}
          </select>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 transition-colors ${view === "grid" ? "bg-vm-red text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
              aria-label="Vue grille">
              
              <Icon name="Squares2X2Icon" size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 transition-colors ${view === "list" ? "bg-vm-red text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
              aria-label="Vue liste">
              
              <Icon name="ListBulletIcon" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {(filters.brands.length > 0 || filters.fuels.length > 0 || filters.transmissions.length > 0 || filters.bodyStyles.length > 0) &&
      <div className="flex flex-wrap gap-2 mb-6">
          {filters.brands.map((b) =>
        <button key={b} className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:border-vm-red transition-colors flex items-center gap-2" onClick={() => removeFilter("brand", b)}>
              {b} <Icon name="XMarkIcon" size={12} />
            </button>
        )}
          {filters.fuels.map((f) =>
        <button key={f} className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:border-vm-red transition-colors flex items-center gap-2" onClick={() => removeFilter("fuel", f)}>
              {f} <Icon name="XMarkIcon" size={12} />
            </button>
        )}
          {filters.transmissions.map((t) =>
        <button key={t} className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:border-vm-red transition-colors flex items-center gap-2" onClick={() => removeFilter("transmission", t)}>
              {t} <Icon name="XMarkIcon" size={12} />
            </button>
        )}
          {filters.bodyStyles.map((b) =>
        <button key={b} className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:border-vm-red transition-colors flex items-center gap-2" onClick={() => removeFilter("body", b)}>
              {b} <Icon name="XMarkIcon" size={12} />
            </button>
        )}
          <button
          onClick={() => setFilters(defaultFilters)}
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-500 hover:text-vm-red transition-colors px-2">
          
            Tout effacer
          </button>
        </div>
      }

      {/* Main layout */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={(f) => {setFilters(f);setPage(1);}}
          onReset={() => {setFilters(getDefaultFilters(priceRange.minPrice, priceRange.maxPrice));setPage(1);}}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          priceRange={priceRange}
          currency={currency} />
        

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[13px] text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white text-lg font-display">{filtered.length}</span>{" "}
              véhicule{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            </p>
            {totalPages > 1 &&
            <p className="text-[11px] text-gray-500 dark:text-gray-500">
                Page {page} / {totalPages}
              </p>
            }
          </div>

          {/* Grid */}
          {paginated.length === 0 ?
          <div className="text-center py-32">
              <Icon name="MagnifyingGlassIcon" size={48} className="text-gray-500 dark:text-gray-500 mx-auto mb-4" />
              <p className="font-display text-2xl font-bold text-gray-600 dark:text-gray-400">Aucun résultat</p>
              <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">Essayez d'élargir vos critères de recherche</p>
              <button
              onClick={() => {setFilters(getDefaultFilters(priceRange.minPrice, priceRange.maxPrice));setSearchQuery("");}}
              className="btn-primary mt-6">
              
                Réinitialiser les filtres
              </button>
            </div> :

          <div
            className={
            view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"
            }>
            
              {paginated.map((v, i) =>
            <div key={v.id} className={`reveal-hidden delay-${Math.min(i % 6 + 1, 5)}`}>
                  <VehicleCard vehicle={v} view={view} />
                </div>
            )}
            </div>
          }

          {/* Pagination */}
          {totalPages > 1 &&
          <div className="flex items-center justify-center gap-2 mt-12">
              <button
              onClick={() => {setPage((p) => Math.max(1, p - 1));window.scrollTo({ top: 0, behavior: "smooth" });}}
              disabled={page === 1}
              className="btn-outline px-4 py-2.5 text-[11px] disabled:opacity-30 disabled:cursor-not-allowed">
              
                <Icon name="ChevronLeftIcon" size={14} />
                Précédent
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
            <button
              key={p}
              onClick={() => {setPage(p);window.scrollTo({ top: 0, behavior: "smooth" });}}
              className={`w-10 h-10 rounded-lg text-[12px] font-bold transition-all ${
              p === page ?
              "bg-vm-red text-white" :
              "border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-vm-red hover:text-vm-red"}`
              }>
              
                  {p}
                </button>
            )}

              <button
              onClick={() => {setPage((p) => Math.min(totalPages, p + 1));window.scrollTo({ top: 0, behavior: "smooth" });}}
              disabled={page === totalPages}
              className="btn-outline px-4 py-2.5 text-[11px] disabled:opacity-30 disabled:cursor-not-allowed">
              
                Suivant
                <Icon name="ChevronRightIcon" size={14} />
              </button>
            </div>
          }
        </div>
      </div>
      </>
      )}
    </div>);

}