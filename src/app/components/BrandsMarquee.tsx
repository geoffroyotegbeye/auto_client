"use client";

import { useEffect, useState } from "react";
import { brandsAPI } from "@/services/api";
import { getImageUrl } from "@/utils/imageUrl";
import AppImage from "@/components/ui/AppImage";

interface Brand {
  id: number;
  name: string;
  logo: string;
  is_active: boolean;
}

export default function BrandsMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandsAPI.getAll({ active: 'true' });
        setBrands(data);
      } catch (error) {
        console.error('Erreur lors du chargement des marques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading || brands.length === 0) {
    return null;
  }

  // Doubler les marques pour un défilement infini fluide
  const doubled = [...brands, ...brands];

  return (
    <section className="py-12 overflow-hidden border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-vm-dark">
      <div className="marquee-track">
        <div className="marquee-inner">
          {doubled?.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="inline-flex items-center justify-center px-8 hover:scale-110 transition-transform cursor-default"
            >
              <div className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <AppImage
                  src={getImageUrl(brand.logo)}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}