"use client";

import Link from "next/link";
import { getImageUrl } from "@/utils/imageUrl";
import Icon from "@/components/ui/AppIcon";

export interface VehicleItem {
  id: string;
  brand: string;
  model: string;
  version: string;
  price: number;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  power: string;
  location: string;
  image: string;
  alt: string;
  isNew: boolean;
  isFeatured?: boolean;
  badge?: string;
  badgeType?: string;
  daysAgo: number;
}

const fuelColors: Record<string, string> = {
  Électrique: "text-green-400",
  Hybride: "text-emerald-400",
  "Hybride rechargeable": "text-teal-400",
  Essence: "text-orange-400",
  Diesel: "text-yellow-400",
  GPL: "text-blue-400",
};

interface Props {
  vehicle: VehicleItem;
  view: "grid" | "list";
}

export default function VehicleCard({ vehicle: v, view }: Props) {
  if (view === "list") {
    return (
      <Link href={`/products/${v.id}`} className="block">
        <div className="bg-white dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl flex overflow-hidden group hover:border-vm-red transition-all shadow-sm hover:shadow-lg">
        <div className="relative w-72 h-48 flex-shrink-0 overflow-hidden">
          <img src={getImageUrl(v.image)} alt={v.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {v.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`badge ${v.badgeType}`}>{v.badge}</span>
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white">{v.brand}</p>
                <h3 className="font-display text-xl font-bold mt-0.5 text-gray-900 dark:text-white">
                  {v.model}{" "}
                  <span className="text-gray-600 dark:text-gray-400 font-light italic text-base">{v.version}</span>
                </h3>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-[11px] text-gray-500 dark:text-gray-500 font-medium">À partir de</p>
                <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  {v.price.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-gray-600 dark:text-gray-400 mt-3">
              <span className="flex items-center gap-1.5"><Icon name="CalendarIcon" size={13} />{v.year}</span>
              <span className={`flex items-center gap-1.5 font-semibold ${fuelColors[v.fuel] || ""}`}>
                <Icon name="BoltIcon" size={13} />{v.fuel}
              </span>
              <span className="flex items-center gap-1.5"><Icon name="CogIcon" size={13} />{v.transmission}</span>
              <span className="flex items-center gap-1.5"><Icon name="BoltIcon" size={13} variant="solid" className="text-vm-red" />{v.power}</span>
              <span className="flex items-center gap-1.5"><Icon name="MapPinIcon" size={13} />{v.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
            <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">
              {v.daysAgo === 0 ? "Ajouté aujourd'hui" : `Il y a ${v.daysAgo} jours`}
            </span>
          </div>
        </div>
      </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${v.id}`} className="block">
      <div className="bg-white dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-vm-red transition-all shadow-sm hover:shadow-lg group">
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img src={getImageUrl(v.image)} alt={v.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-vm-dark/50 to-transparent" />
        {v.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`badge ${v.badgeType}`}>{v.badge}</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400">
          {v.daysAgo === 0 ? "Aujourd'hui" : `Il y a ${v.daysAgo}j`}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white">{v.brand}</p>
            <h3 className="font-display text-lg font-bold mt-0.5 text-gray-900 dark:text-white">{v.model}</h3>
            <p className="text-[12px] text-gray-600 dark:text-gray-400 italic">{v.version}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-500 font-medium">À partir de</p>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
              {v.price.toLocaleString("fr-FR")} FCFA
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-600 dark:text-gray-400 my-3">
          <span className="flex items-center gap-1"><Icon name="CalendarIcon" size={11} />{v.year}</span>
          <span>·</span>
          <span className={`flex items-center gap-1 font-semibold ${fuelColors[v.fuel] || ""}`}>
            <Icon name="BoltIcon" size={11} />{v.fuel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-500">
          <Icon name="MapPinIcon" size={11} />
          {v.location}
        </div>
      </div>
    </div>
    </Link>
  );
}