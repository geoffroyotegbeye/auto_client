import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-16 md:py-20">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Icon name="SparklesIcon" size={16} className="text-gray-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Sans engagement
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Obtenez une estimation gratuite et sans engagement pour votre prochain véhicule. Notre équipe vous répond sous 24h.
            </p>
          </div>

          {/* Bouton */}
          <div className="flex-shrink-0">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-3 bg-vm-red hover:bg-red-700 text-white font-bold px-8 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="DocumentTextIcon" size={24} />
              <span className="text-lg">Demander un devis</span>
              <Icon
                name="ArrowRightIcon"
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">24h</p>
            <p className="text-sm text-gray-400">Réponse garantie</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">100%</p>
            <p className="text-sm text-gray-400">Gratuit</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">0</p>
            <p className="text-sm text-gray-400">Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">10+</p>
            <p className="text-sm text-gray-400">Ans d'expertise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
