import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsInteractive from "./components/ProductsInteractive";
import Icon from "@/components/ui/AppIcon";

export const metadata: Metadata = {
  title: "Catalogue véhicules neufs — Mig Motors",
  description:
    "Parcourez notre catalogue de plus de 12 000 véhicules neufs toutes marques. Filtrez par marque, budget, carburant et plus encore.",
};

function ProductsLoading() {
  return (
    <div className="flex items-center justify-center py-32">
      <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin" />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-white dark:bg-vm-dark min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-12 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-vm-dark-card grid-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
            Catalogue complet
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">
            Tous les{" "}
            <span className="italic font-light text-gray-600 dark:text-gray-400">véhicules.</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-xl">
            Trouvez votre prochain véhicule neuf parmi notre sélection de 12 000+ modèles disponibles.
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsInteractive />
      </Suspense>
    </main>
  );
}