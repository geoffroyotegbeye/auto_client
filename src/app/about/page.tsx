import type { Metadata } from "next";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos — MIG Motors Bénin",
  description: "Découvrez l'histoire de MIG Motors Bénin, concessionnaire exclusif des plus grandes marques automobiles depuis 2013.",
};

const brands = [
  { name: "KIA", origin: "Sud-coréenne", logo: "🇰🇷" },
  { name: "MITSUBISHI FUSO", origin: "Japonaise", logo: "🇯🇵" },
  { name: "FIAT & FIAT PROFESSIONAL", origin: "Italienne", logo: "🇮🇹" },
  { name: "JEEP", origin: "Américaine", logo: "🇺🇸" },
  { name: "MAZDA", origin: "Japonaise", logo: "🇯🇵" },
];

const countries = [
  { name: "Bénin", flag: "🇧🇯" },
  { name: "Togo", flag: "🇹🇬" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Tchad", flag: "🇹🇩" },
];

const values = [
  {
    icon: "ShieldCheckIcon",
    title: "Qualité garantie",
    description: "Véhicules neufs avec garantie constructeur et pièces d'origine",
  },
  {
    icon: "UserGroupIcon",
    title: "Équipe qualifiée",
    description: "Personnel compétent, soudé et formé régulièrement par les constructeurs",
  },
  {
    icon: "WrenchScrewdriverIcon",
    title: "Service après-vente",
    description: "Équipements performants et expertise technique de haut niveau",
  },
  {
    icon: "HeartIcon",
    title: "Satisfaction client",
    description: "Respect et satisfaction au cœur de notre engagement quotidien",
  },
  {
    icon: "CurrencyDollarIcon",
    title: "Prix compétitifs",
    description: "Véhicules neufs et résistants à moindre coût",
  },
  {
    icon: "TruckIcon",
    title: "Service AUTORENT",
    description: "Location courte durée et leasing pour tous vos besoins",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
            À Propos
          </p>
          <h1 className="section-title text-gray-900 dark:text-white mb-4">
            MIG Motors Bénin
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Votre partenaire automobile de confiance depuis 2013
          </p>
        </div>

        {/* Histoire */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                  <Icon name="BuildingOfficeIcon" size={24} className="text-vm-red" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notre Histoire</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Depuis 2013</p>
                </div>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-gray-900 dark:text-white">MIG MOTORS BENIN</strong> a été créée le <strong className="text-vm-red">25 Novembre 2013</strong> avec un capital social de <strong className="text-vm-red">100.000.000 FCFA</strong>. Elle est située à la zone résidentielle Zongo, Ilots 572.
                </p>
                <p>
                  L'arrivée au Bénin de <strong className="text-gray-900 dark:text-white">KIA</strong>, constructeur automobile sud-coréen, est la concrétisation d'un rêve majeur de la population qui consiste en l'achat de véhicules neufs et résistants à moindre coût.
                </p>
                <p>
                  Elle dispose également du service <strong className="text-gray-900 dark:text-white">AUTORENT</strong> qui s'occupe de la location de véhicules courte durée avec possibilité de leasing.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                  <Icon name="GlobeAltIcon" size={24} className="text-vm-red" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Présence Africaine</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MIG MOTORS est implantée dans <strong className="text-gray-900 dark:text-white">quatre pays africains</strong> :
              </p>
              <div className="grid grid-cols-2 gap-3">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className="flex items-center gap-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg p-3"
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{country.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                  <Icon name="StarIcon" size={24} className="text-vm-red" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notre Engagement</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Dans le but de satisfaire les besoins tant exprimés en matière de véhicules, de pièces de rechange et d'un service après-vente, <strong className="text-gray-900 dark:text-white">MIG MOTORS s'engage chaque jour</strong> grâce à une équipe compétente, soudée et qualifiée aux côtés de ses clients en visant le <strong className="text-vm-red">respect et la satisfaction</strong>.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                  <Icon name="TruckIcon" size={24} className="text-vm-red" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nos Marques</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MIG MOTORS BENIN est <strong className="text-gray-900 dark:text-white">concessionnaire exclusif</strong> des marques automobiles :
              </p>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center justify-between bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                  >
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{brand.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Origine {brand.origin}</p>
                    </div>
                    <span className="text-2xl">{brand.logo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-vm-red to-red-600 rounded-2xl p-8 shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="WrenchScrewdriverIcon" size={32} />
                <h2 className="text-2xl font-bold">Service Après-Vente</h2>
              </div>
              <p className="leading-relaxed">
                MIG MOTORS Bénin offre une <strong>large possibilité de service après-vente</strong> qui s'appuie sur des <strong>équipements performants</strong> et un <strong>personnel qualifié et formé régulièrement</strong> par les constructeurs.
              </p>
            </div>
          </div>
        </div>

        {/* Pourquoi nous choisir */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
              Nos Valeurs
            </p>
            <h2 className="section-title text-gray-900 dark:text-white">
              Pourquoi nous choisir ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-vm-red transition-all shadow-sm hover:shadow-lg group"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-950/30 transition-colors">
                  <Icon name={value.icon as any} size={28} className="text-vm-red" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-vm-dark-card dark:to-vm-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prêt à trouver votre véhicule idéal ?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Découvrez notre large gamme de véhicules neufs et bénéficiez de notre expertise depuis plus de 10 ans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary px-8 py-4 text-base justify-center">
              <Icon name="TruckIcon" size={20} />
              Voir nos véhicules
            </Link>
            <Link href="/contact" className="btn-outline px-8 py-4 text-base justify-center">
              <Icon name="ChatBubbleLeftIcon" size={20} />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
