"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import { vehiclesAPI } from '@/services/api';

interface BrandStats {
  brand: string;
  count: number;
  minPrice: number;
  maxPrice: number;
  avgYear: number;
}

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<BrandStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await vehiclesAPI.getAll();
      const vehicles = data.vehicles || data;

      // Grouper par marque et calculer les stats
      const brandMap = new Map<string, any[]>();
      
      vehicles.forEach((vehicle: any) => {
        if (!brandMap.has(vehicle.brand)) {
          brandMap.set(vehicle.brand, []);
        }
        brandMap.get(vehicle.brand)!.push(vehicle);
      });

      // Calculer les statistiques par marque
      const brandStats: BrandStats[] = Array.from(brandMap.entries()).map(([brand, vehicleList]) => {
        const prices = vehicleList.map(v => v.price);
        const years = vehicleList.map(v => v.year);
        
        return {
          brand,
          count: vehicleList.length,
          minPrice: Math.min(...prices),
          maxPrice: Math.max(...prices),
          avgYear: Math.round(years.reduce((a, b) => a + b, 0) / years.length)
        };
      });

      // Trier par nombre de véhicules décroissant
      brandStats.sort((a, b) => b.count - a.count);
      
      setBrands(brandStats);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandClick = (brand: string) => {
    router.push(`/products?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <main className="bg-white dark:bg-[#0D0D0D] min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="pt-32 pb-12 border-b border-gray-200 dark:border-[rgba(245,240,232,0.06)] bg-gray-50 dark:bg-[#0A0A0A] grid-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#E8A020] mb-4">
            Toutes les marques
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none">
            Parcourir par{' '}
            <span className="italic font-light text-gray-600 dark:text-[#A09A8E]">marque.</span>
          </h1>
          <p className="text-gray-600 dark:text-[#A09A8E] mt-4 text-lg max-w-xl">
            Découvrez notre sélection de véhicules classés par marque. Des grandes marques premium aux constructeurs généralistes.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-12">
              <div className="flex items-center gap-8">
                <div>
                  <span className="font-display text-4xl font-bold text-[#E8A020]">
                    {brands.length}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">Marques disponibles</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-bold text-[#E8A020]">
                    {brands.reduce((sum, b) => sum + b.count, 0)}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">Véhicules au total</p>
                </div>
              </div>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand, index) => (
                <div
                  key={brand.brand}
                  onClick={() => handleBrandClick(brand.brand)}
                  className={`brand-card rounded-xl p-6 cursor-pointer reveal-hidden delay-${Math.min(index % 6 + 1, 5)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#E8A020]/10 flex items-center justify-center">
                        <Icon name="TruckIcon" size={24} className="text-[#E8A020]" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">
                          {brand.brand}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-[#A09A8E]">
                          {brand.count} véhicule{brand.count > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Icon
                      name="ArrowRightIcon"
                      size={20}
                      className="text-gray-500 dark:text-[#5A5550] group-hover:text-[#E8A020] transition-colors"
                    />
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-[rgba(245,240,232,0.06)]">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-[#A09A8E]">Prix</span>
                      <span className="text-gray-900 dark:text-[#F5F0E8] font-medium">
                        {brand.minPrice.toLocaleString('fr-FR')} - {brand.maxPrice.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-[#A09A8E]">Année moyenne</span>
                      <span className="text-gray-900 dark:text-[#F5F0E8] font-medium">{brand.avgYear}</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full btn-outline py-2 text-xs justify-center">
                    <Icon name="MagnifyingGlassIcon" size={14} />
                    Voir les véhicules
                  </button>
                </div>
              ))}
            </div>

            {brands.length === 0 && (
              <div className="text-center py-32">
                <Icon name="TruckIcon" size={48} className="text-gray-500 dark:text-[#5A5550] mx-auto mb-4" />
                <p className="font-display text-2xl font-bold text-gray-600 dark:text-[#A09A8E]">Aucune marque disponible</p>
                <p className="text-gray-500 dark:text-[#5A5550] mt-2 text-sm">Les véhicules seront bientôt disponibles</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
