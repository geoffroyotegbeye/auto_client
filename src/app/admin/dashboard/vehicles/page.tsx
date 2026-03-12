"use client";

import { useEffect, useState } from 'react';
import { vehiclesAPI, brandsAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Toast from '@/components/Toast';
import ConfirmModal from '@/components/ConfirmModal';
import { getImageUrl } from '@/utils/imageUrl';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version?: string;
  price: number;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  color?: string;
  doors?: number;
  seats?: number;
  power?: number;
  body_style?: string;
  description?: string;
  features?: string;
  status: string;
  main_image?: string;
  images?: string;
  is_featured?: boolean;
  is_new?: boolean;
  badge?: string;
  badge_type?: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; vehicleId: number | null }>({
    show: false,
    vehicleId: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
  const itemsPerPage = 5;

  const showToast = (message: string, type: ToastState['type']) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  // Fonction pour compresser les images
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          // Redimensionner si nécessaire
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Erreur de compression'));
              }
            },
            'image/jpeg',
            0.8 // Qualité 80%
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  useEffect(() => {
    loadVehicles();
    loadBrands();
  }, [filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const loadVehicles = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const data = await vehiclesAPI.getAll(params);
      setVehicles(data.vehicles || data);
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Erreur lors du chargement des véhicules', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    try {
      const data = await brandsAPI.getAll({ active: 'true' });
      setBrands(data);
    } catch (error) {
      console.error('Erreur lors du chargement des marques:', error);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setIsCreating(false);
    setEditingVehicle(vehicle);
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      version: vehicle.version || '',
      price: vehicle.price,
      year: vehicle.year,
      km: vehicle.km,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      color: vehicle.color || '',
      doors: vehicle.doors || 4,
      seats: vehicle.seats || 5,
      power: vehicle.power || '',
      description: vehicle.description || '',
      features: vehicle.features || '',
      status: vehicle.status,
      is_featured: vehicle.is_featured || false,
      is_new: vehicle.is_new || false,
      badge: vehicle.badge || '',
      badge_type: vehicle.badge_type || '',
      body_style: vehicle.body_style || '',
    });
    
    // Charger les images existantes
    console.log('Vehicle images:', vehicle.images);
    try {
      const images = vehicle.images ? JSON.parse(vehicle.images) : [];
      console.log('Parsed images:', images);
      setExistingImages(images);
    } catch (e) {
      console.error('Error parsing images:', e);
      // Si images n'est pas un JSON, essayer de l'utiliser comme tableau
      if (Array.isArray(vehicle.images)) {
        setExistingImages(vehicle.images);
      } else if (vehicle.main_image) {
        // Fallback: utiliser main_image
        setExistingImages([vehicle.main_image]);
      } else {
        setExistingImages([]);
      }
    }
    
    setSelectedImages([]);
    setPreviewUrls([]);
    setImagesToDelete([]);
    setShowModal(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingVehicle(null);
    setFormData({
      brand: '',
      model: '',
      version: '',
      price: '',
      year: new Date().getFullYear(),
      km: 0,
      fuel: 'Essence',
      transmission: 'Manuelle',
      color: '',
      doors: 4,
      seats: 5,
      power: '',
      description: '',
      features: '',
      status: 'available',
      is_featured: false,
      is_new: false,
      badge: '',
      badge_type: '',
      body_style: '',
    });
    setExistingImages([]);
    setSelectedImages([]);
    setPreviewUrls([]);
    setImagesToDelete([]);
    setShowModal(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentTotal = isCreating 
      ? selectedImages.length 
      : existingImages.length - imagesToDelete.length + selectedImages.length;
    const totalImages = currentTotal + files.length;
    
    if (totalImages > 5) {
      showToast('Vous pouvez avoir maximum 5 images au total', 'warning');
      return;
    }

    try {
      // Compresser toutes les images
      showToast('Compression des images en cours...', 'info');
      const compressedFiles = await Promise.all(files.map(file => compressImage(file)));
      
      setSelectedImages([...selectedImages, ...compressedFiles]);

      // Créer les URLs de prévisualisation
      const newUrls = compressedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newUrls]);
      
      hideToast();
    } catch (error) {
      showToast('Erreur lors de la compression des images', 'error');
    }
  };

  const removeNewImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setPreviewUrls(newUrls);
  };

  const removeExistingImage = (imageUrl: string) => {
    setImagesToDelete([...imagesToDelete, imageUrl]);
  };

  const restoreExistingImage = (imageUrl: string) => {
    setImagesToDelete(imagesToDelete.filter(img => img !== imageUrl));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    try {
      const formDataToSend = new FormData();
      
      // Ajouter les champs texte
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key].toString());
        }
      });

      // Ajouter les nouvelles images
      selectedImages.forEach((image) => {
        formDataToSend.append('images', image);
      });

      if (isCreating) {
        // Création d'un nouveau véhicule
        await vehiclesAPI.create(formDataToSend);
        showToast('Véhicule créé avec succès', 'success');
      } else if (editingVehicle) {
        // Mise à jour d'un véhicule existant
        if (imagesToDelete.length > 0) {
          formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
        }
        await vehiclesAPI.update(editingVehicle.id.toString(), formDataToSend);
        showToast('Véhicule mis à jour avec succès', 'success');
      }

      setShowModal(false);
      setEditingVehicle(null);
      setIsCreating(false);
      setSelectedImages([]);
      setPreviewUrls([]);
      setExistingImages([]);
      setImagesToDelete([]);
      setImageRefreshKey(Date.now()); // Force image refresh
      loadVehicles();
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    setConfirmDelete({ show: true, vehicleId: id });
  };

  const confirmDeleteVehicle = async () => {
    if (!confirmDelete.vehicleId) return;

    try {
      await vehiclesAPI.delete(confirmDelete.vehicleId.toString());
      setConfirmDelete({ show: false, vehicleId: null });
      loadVehicles();
      showToast('Véhicule supprimé avec succès', 'success');
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de la suppression', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" />
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVehicles = vehicles.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Gestion des véhicules</h2>
          <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{vehicles.length} véhicule(s)</p>
        </div>
        <button onClick={handleCreate} className="btn-primary px-6 py-3">
          <Icon name="PlusIcon" size={16} />
          Ajouter un véhicule
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'available', 'reserved', 'sold'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              filter === status
                ? 'bg-[#E8A020] text-[#0D0D0D]'
                : 'bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-[#A09A8E] hover:bg-gray-100 dark:bg-[#222222]'
            }`}
          >
            {status === 'all' ? 'Tous' : status === 'available' ? 'Disponible' : status === 'reserved' ? 'Réservé' : 'Vendu'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#141414] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E]">
                  Véhicule
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E]">
                  Prix
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E]">
                  Année / KM
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E]">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(245,240,232,0.08)]">
              {currentVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 dark:bg-[#141414] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#141414] flex-shrink-0">
                        <img
                          src={`${getImageUrl(vehicle.main_image)}?t=${imageRefreshKey}`}
                          alt={vehicle.model}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{vehicle.version}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#E8A020]">
                      {vehicle.price ? Math.floor(vehicle.price).toLocaleString('fr-FR') : '0'} FCFA
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-[#F5F0E8]">{vehicle.year || 'N/A'}</p>
                    {vehicle.km > 0 && (
                      <p className="text-xs text-gray-600 dark:text-[#A09A8E]">{Math.floor(vehicle.km).toLocaleString('fr-FR')} km</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        vehicle.status === 'available'
                          ? 'bg-green-500/10 text-green-400'
                          : vehicle.status === 'reserved'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'bg-gray-500/10 text-gray-400'
                      }`}
                    >
                      {vehicle.status === 'available' ? 'Disponible' : vehicle.status === 'reserved' ? 'Réservé' : 'Vendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-[#E8A020] transition-colors"
                      >
                        <Icon name="PencilIcon" size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-rose-400 transition-colors"
                      >
                        <Icon name="TrashIcon" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <Icon name="TruckIcon" size={48} className="text-gray-500 dark:text-[#5A5550] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-[#A09A8E]">Aucun véhicule trouvé</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-100 dark:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="ChevronLeftIcon" size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-[#E8A020] text-[#0D0D0D] font-bold'
                  : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-100 dark:bg-[#222222]'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-100 dark:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="ChevronRightIcon" size={16} />
          </button>
        </div>
      )}

      {/* Modal de modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-[#F5F0E8]">
                {isCreating ? 'Ajouter un véhicule' : 'Modifier le véhicule'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Marque *</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="">Sélectionner une marque</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Modèle *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Prix (FCFA) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Année *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Kilométrage</label>
                  <input
                    type="number"
                    value={formData.km}
                    onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                    placeholder="0 (véhicule neuf)"
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Carburant *</label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                    <option value="GPL">GPL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Transmission *</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Couleur</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Statut *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="available">Disponible</option>
                    <option value="reserved">Réservé</option>
                    <option value="sold">Vendu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Type de carrosserie</label>
                  <select
                    value={formData.body_style}
                    onChange={(e) => setFormData({ ...formData, body_style: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="Break">Break</option>
                    <option value="Coupé">Coupé</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="Monospace">Monospace</option>
                    <option value="Citadine">Citadine</option>
                    <option value="Pick-up">Pick-up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: Nouveau, Promo, -20%"
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Type de badge</label>
                  <select
                    value={formData.badge_type}
                    onChange={(e) => setFormData({ ...formData, badge_type: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                  >
                    <option value="">Aucun</option>
                    <option value="badge-new">Nouveau (Orange)</option>
                    <option value="badge-promo">Promo (Vert)</option>
                    <option value="badge-accent">Accent (Bleu)</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg cursor-pointer hover:border-[#E8A020] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5 rounded border-[rgba(245,240,232,0.2)] bg-white dark:bg-[#0D0D0D] text-[#E8A020] focus:ring-[#E8A020] focus:ring-offset-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Véhicule en vedette</p>
                    <p className="text-xs text-gray-600 dark:text-[#A09A8E]">Afficher dans la section "En vedette"</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg cursor-pointer hover:border-[#E8A020] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="w-5 h-5 rounded border-[rgba(245,240,232,0.2)] bg-white dark:bg-[#0D0D0D] text-[#E8A020] focus:ring-[#E8A020] focus:ring-offset-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Véhicule neuf</p>
                    <p className="text-xs text-gray-600 dark:text-[#A09A8E]">Marquer comme véhicule neuf</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020] resize-none"
                />
              </div>

              {/* Upload d'images */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">
                  Images (max 5 au total) {isCreating && '*'}
                </label>
                <div className="space-y-4">
                  {/* Images existantes (seulement en mode édition) */}
                  {!isCreating && existingImages.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-[#A09A8E] mb-2">Images actuelles :</p>
                      <div className="grid grid-cols-5 gap-3">
                        {existingImages.map((imageUrl, index) => {
                          const isMarkedForDeletion = imagesToDelete.includes(imageUrl);
                          return (
                            <div key={index} className="relative group">
                              <img
                                src={`${getImageUrl(imageUrl)}?t=${imageRefreshKey}`}
                                alt={`Image ${index + 1}`}
                                className={`w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-[rgba(245,240,232,0.08)] ${
                                  isMarkedForDeletion ? 'opacity-30' : ''
                                }`}
                              />
                              {isMarkedForDeletion ? (
                                <button
                                  type="button"
                                  onClick={() => restoreExistingImage(imageUrl)}
                                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
                                >
                                  <Icon name="ArrowPathIcon" size={20} className="text-white" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(imageUrl)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Icon name="XMarkIcon" size={14} className="text-white" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Input file */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white dark:bg-[#0D0D0D] border-2 border-dashed border-[rgba(245,240,232,0.2)] rounded-lg text-gray-600 dark:text-[#A09A8E] hover:border-[#E8A020] hover:text-[#E8A020] transition-colors cursor-pointer"
                    >
                      <Icon name="PhotoIcon" size={20} />
                      <span className="text-sm">
                        {isCreating
                          ? `Ajouter des images (${selectedImages.length}/5)`
                          : `Ajouter des images (${existingImages.length - imagesToDelete.length + selectedImages.length}/5)`}
                      </span>
                    </label>
                  </div>

                  {/* Prévisualisation des nouvelles images */}
                  {previewUrls.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-[#A09A8E] mb-2">Nouvelles images à ajouter :</p>
                      <div className="grid grid-cols-5 gap-3">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Nouvelle ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-[rgba(245,240,232,0.08)]"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Icon name="XMarkIcon" size={14} className="text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-sm text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary px-6 py-2 text-sm disabled:opacity-50"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Confirm delete modal */}
      {confirmDelete.show && (
        <ConfirmModal
          title="Supprimer le véhicule"
          message="Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible."
          confirmText="Supprimer"
          cancelText="Annuler"
          type="danger"
          onConfirm={confirmDeleteVehicle}
          onCancel={() => setConfirmDelete({ show: false, vehicleId: null })}
        />
      )}
    </div>
  );
}
