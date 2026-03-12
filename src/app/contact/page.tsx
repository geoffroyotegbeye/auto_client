"use client";

import { useState } from "react";
import { contactAPI } from "@/services/api";
import Icon from "@/components/ui/AppIcon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await contactAPI.create(formData);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vm-red mb-4">
            Contact
          </p>
          <h1 className="section-title text-gray-900 dark:text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>

        {/* Image de l'agence + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Image de l'agence */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/assets/image/agence.webp" 
              alt="MIG Motors - Notre agence à Cotonou" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vm-dark/80 via-vm-dark/20 to-transparent" />
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1 md:mb-2">
                Notre showroom
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-white">MIG Motors Cotonou</h3>
            </div>
          </div>

          {/* Google Maps */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6537891234567!2d2.4289!3d6.3654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjEnNTUuNCJOIDLCsDI1JzQ0LjAiRQ!5e0!3m2!1sfr!2sbj!4v1234567890123!5m2!1sfr!2sbj"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <a
              href="https://maps.app.goo.gl/DRwvU7ToirdGdrsJA"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-vm-red hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 md:gap-2 shadow-lg transition-colors"
            >
              <Icon name="MapPinIcon" size={12} className="md:w-3.5 md:h-3.5" />
              <span className="hidden sm:inline">Ouvrir dans Maps</span>
              <span className="sm:hidden">Maps</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Informations de contact */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Nos coordonnées</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPinIcon" size={20} className="md:w-6 md:h-6 text-vm-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-semibold mb-1">Adresse</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">Zongo, Cotonou, Bénin</p>
                    <a
                      href="https://maps.app.goo.gl/DRwvU7ToirdGdrsJA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-vm-red hover:text-red-600 transition-colors"
                    >
                      <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                      Voir sur la carte
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="PhoneIcon" size={20} className="md:w-6 md:h-6 text-vm-red" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+22901213100229" className="block text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                      (+229) 01 21 31 00 29
                    </a>
                    <a href="tel:+22901619864606" className="block text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                      (+229) 01 61 98 64 06
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="GlobeAltIcon" size={20} className="md:w-6 md:h-6 text-vm-red" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-semibold mb-1">Site web</h3>
                    <a href="https://www.migmotors.net" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-vm-red transition-colors">
                      www.migmotors.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ClockIcon" size={20} className="md:w-6 md:h-6 text-vm-red" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base text-gray-900 dark:text-white font-semibold mb-1">Horaires</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Lun - Ven: 08H00 - 18H30</p>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Samedi: 09H00 - 13H00</p>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Nos services</h2>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="md:w-5 md:h-5 text-vm-red flex-shrink-0" />
                  Vente de véhicules neufs
                </li>
                <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="md:w-5 md:h-5 text-vm-red flex-shrink-0" />
                  Service après-vente
                </li>
                <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="md:w-5 md:h-5 text-vm-red flex-shrink-0" />
                  Prise de rendez-vous
                </li>
                <li className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="md:w-5 md:h-5 text-vm-red flex-shrink-0" />
                  Demande de devis
                </li>
              </ul>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Envoyez-nous un message</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base text-gray-900 dark:text-white font-medium mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base text-gray-900 dark:text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base text-gray-900 dark:text-white font-medium mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                  placeholder="+229 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base text-gray-900 dark:text-white font-medium mb-2">Sujet *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="information">Demande d'information</option>
                  <option value="devis">Demande de devis</option>
                  <option value="rdv">Prise de rendez-vous</option>
                  <option value="sav">Service après-vente</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm md:text-base text-gray-900 dark:text-white font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-vm-red transition-colors resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Icon name="PaperAirplaneIcon" size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-vm-dark-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={32} variant="solid" className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Message envoyé !
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
