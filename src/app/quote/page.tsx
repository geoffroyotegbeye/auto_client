"use client";

import { useState } from "react";
import { quotesAPI } from "@/services/api";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    sector: "Concessionnaires automobiles et moto",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Bénin",
    city: "",
    vehicleType: "",
    brand: "",
    budget: "",
    services: [] as string[],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+\s()-]/g, "");
    setFormData({ ...formData, phone: value });
    setFieldErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2)
      errors.firstName = "Le prénom doit contenir au moins 2 caractères.";
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2)
      errors.lastName = "Le nom doit contenir au moins 2 caractères.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Adresse email invalide.";
    if (formData.phone && !/^[+0-9][\d\s()\-]{6,19}$/.test(formData.phone))
      errors.phone = "Numéro de téléphone invalide (chiffres uniquement).";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errors.message = "La demande doit contenir au moins 10 caractères.";
    return errors;
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white dark:bg-vm-dark border rounded-lg text-gray-900 dark:text-white focus:outline-none transition-colors ${
      fieldErrors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-gray-200 dark:border-gray-800 focus:border-amber-600"
    }`;

  const handleServiceToggle = (service: string) => {
    const services = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    setError("");

    try {
      await quotesAPI.create({
        type: 'new',
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        brand: formData.brand,
        model: '',
        message: `Budget: ${formData.budget}\nVille: ${formData.city}\nServices: ${formData.services.join(", ")}\n\n${formData.message}`,
      });
      setShowSuccessModal(true);
      setFormData({
        sector: "Concessionnaires automobiles et moto",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "Bénin",
        city: "",
        vehicleType: "",
        brand: "",
        budget: "",
        services: [],
        message: "",
      });
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  const vehicleTypes = [
    "Voiture neuve",
    "Moto",
    "Camion",
    "Véhicule utilitaire",
    "Autre (précisez)",
  ];

  const budgetRanges = [
    "Moins de 5 000 000 FCFA",
    "5 000 000 - 10 000 000 FCFA",
    "10 000 000 - 20 000 000 FCFA",
    "20 000 000 - 30 000 000 FCFA",
    "Plus de 30 000 000 FCFA",
  ];

  const services = [
    "Entretien et réparation",
    "Pièces détachées",
    "Service après-vente",
    "Contrat d'entretien",
    "Location de véhicule",
    "Autre (précisez)",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-vm-red transition-colors mb-6">
            <Icon name="ArrowLeftIcon" size={14} />
            Retour à l'accueil
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600 mb-4">
            Demande de devis
          </p>
          <h1 className="section-title text-gray-900 dark:text-white mb-4">
            Obtenez votre devis gratuit
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Secteur */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Secteur d'activité
              </label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 bg-gray-100 dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
              />
            </div>

            {/* Prénom & Nom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass("firstName")}
                  placeholder="Votre prénom"
                />
                {fieldErrors.firstName && <p className="mt-1 text-xs text-red-500">{fieldErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass("lastName")}
                  placeholder="Votre nom"
                />
                {fieldErrors.lastName && <p className="mt-1 text-xs text-red-500">{fieldErrors.lastName}</p>}
              </div>
            </div>

            {/* Email & Téléphone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="votre@email.com"
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={inputClass("phone")}
                  placeholder="+229 XX XX XX XX"
                />
                {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
              </div>
            </div>

            {/* Pays & Ville */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 transition-colors"
                  placeholder="Cotonou, Porto-Novo..."
                />
              </div>
            </div>

            {/* Type de véhicule */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quel type de véhicule recherchez-vous ?
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 transition-colors"
              >
                <option value="">Sélectionnez un type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Marque */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quelle marque de véhicule vous intéresse le plus ?
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="KIA, Mercedes, Toyota..."
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quel est votre budget approximatif pour l'achat d'un véhicule ?
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 transition-colors"
              >
                <option value="">Sélectionnez un budget</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                Quels services supplémentaires vous intéressent ?
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:border-amber-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-amber-600 focus:ring-amber-600"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Votre demande *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={inputClass("message") + " resize-none"}
                placeholder="Précisez votre besoin : localisation, délais..."
              />
              {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
            </div>

            {/* Note */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4">
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                <strong>Note :</strong> Les demandes d'emploi ne sont pas autorisées sur ce formulaire. Si vous recherchez un emploi, merci de nous contacter directement.
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-500 mt-2 leading-relaxed">
                Les informations recueillies font l'objet d'un traitement de données personnelles destiné à MIG Motors dans le cadre de la gestion des contacts. Vous disposez d'un droit d'accès, de modification et de suppression des données vous concernant.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Icon name="PaperAirplaneIcon" size={20} />
                  Envoyer ma demande de devis
                </>
              )}
            </button>
          </form>
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
              Demande envoyée !
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
