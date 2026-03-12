"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { vehiclesAPI } from '@/services/api';
import { getImageUrl } from '@/utils/imageUrl';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  transmission: string;
  power: string;
  body_style: string;
  color: string;
  doors: number;
  seats: number;
  description: string;
  main_image: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
  status: string;
  location: string;
  is_new: boolean;
  badge?: string;
  badge_type?: string;
}

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehiclesAPI.getById(Number(params.id));
        setVehicle(data);
        setSelectedImage(data.main_image);
      } catch (error) {
        console.error('Erreur chargement véhicule:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchVehicle();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-vm-dark pt-32 pb-20 flex items-center justify-center">
        <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin" />
      </div>
    );
  }

  if (!vehicle) {
    return null;
  }

  const images = [
    vehicle.main_image,
    vehicle.image_2,
    vehicle.image_3,
    vehicle.image_4,
    vehicle.image_5,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-8">
          <Link href="/" className="hover:text-vm-red transition-colors">Accueil</Link>
          <Icon name="ChevronRightIcon" size={12} />
          <Link href="/products" className="hover:text-vm-red transition-colors">Véhicules</Link>
          <Icon name="ChevronRightIcon" size={12} />
          <span className="text-gray-900 dark:text-white">{vehicle.brand} {vehicle.model}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 shadow-lg">
              <img
                src={getImageUrl(selectedImage)}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
              {vehicle.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`badge ${vehicle.badge_type || 'badge-new'}`}>
                    {vehicle.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-vm-red'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${vehicle.brand} ${vehicle.model} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Détails */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-vm-red mb-2">
                {vehicle.brand}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {vehicle.model}
              </h1>
              {vehicle.version && (
                <p className="text-xl text-gray-600 dark:text-gray-400 italic">{vehicle.version}</p>
              )}
            </div>

            {/* Prix */}
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Prix</p>
              <p className="text-4xl font-bold text-vm-red">
                {Math.floor(vehicle.price).toLocaleString('fr-FR')} FCFA
              </p>
            </div>

            {/* Caractéristiques principales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CalendarIcon" size={18} className="text-vm-red" />
                  <p className="text-xs text-gray-500 dark:text-gray-500">Année</p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.year}</p>
              </div>

              {vehicle.km > 0 && (
                <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ChartBarIcon" size={18} className="text-vm-red" />
                    <p className="text-xs text-gray-500 dark:text-gray-500">Kilométrage</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.km.toLocaleString('fr-FR')} km</p>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="BoltIcon" size={18} className="text-vm-red" />
                  <p className="text-xs text-gray-500 dark:text-gray-500">Carburant</p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.fuel}</p>
              </div>

              <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CogIcon" size={18} className="text-vm-red" />
                  <p className="text-xs text-gray-500 dark:text-gray-500">Transmission</p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.transmission}</p>
              </div>
            </div>

            {/* Autres caractéristiques */}
            <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {vehicle.power && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Puissance</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.power}</span>
                  </div>
                )}
                {vehicle.body_style && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Carrosserie</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.body_style}</span>
                  </div>
                )}
                {vehicle.color && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Couleur</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.color}</span>
                  </div>
                )}
                {vehicle.doors && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Portes</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.doors}</span>
                  </div>
                )}
                {vehicle.seats && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Places</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.seats}</span>
                  </div>
                )}
                {vehicle.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Localisation</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vehicle.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="bg-gray-50 dark:bg-vm-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-primary flex-1 justify-center py-4 rounded-lg text-base"
              >
                <Icon name="ChatBubbleLeftIcon" size={20} />
                Nous contacter
              </Link>
              <button className="btn-outline flex-1 justify-center py-4 rounded-lg text-base">
                <Icon name="HeartIcon" size={20} />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
