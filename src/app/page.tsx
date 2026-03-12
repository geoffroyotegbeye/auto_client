import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import FeaturedVehicles from "./components/FeaturedVehicules";
import BrandsMarquee from "./components/BrandsMarquee";
import StatsSection from "./components/StatsSection";
import RecentListings from "./components/RecentListings";
import BrandsGrid from "./components/BrandsGrid";
import ReviewsSection from "./components/ReviewsSection";

export const metadata: Metadata = {
  title: "Mig Motors — Vente de véhicules neufs au Bénin",
  description:
    "Trouvez votre prochain véhicule neuf parmi plus de 12 000 modèles. BMW, Mercedes, Renault, Toyota et bien plus. Livraison rapide au Bénin.",
  keywords: ["voiture neuve", "vente", "neuf", "automobile", "concessionnaire", "Bénin", "Cotonou"],
};

export default function HomepagePage() {
  return (
    <main className="bg-white dark:bg-vm-dark min-h-screen">
      <HeroSection />
      <BrandsMarquee />
      <RecentListings />
      <StatsSection />
      <BrandsGrid />
      <FeaturedVehicles />
      <ReviewsSection />
    </main>
  );
}