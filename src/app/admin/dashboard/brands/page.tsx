"use client";

import { useEffect, useState } from 'react';
import { brandsAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Toast from '@/components/Toast';
import ConfirmModal from '@/components/ConfirmModal';
import { getImageUrl } from '@/utils/imageUrl';

interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  is_active: boolean;
  display_order: number;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; brandId: number | null }>({
    show: false,
    brandId: null,
  });

  const showToast = (message: string, type: ToastState['type']) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await brandsAPI.getAll();
      setBrands(data);
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Erreur lors du chargement des marques', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingBrand(null);
    setFormData({
      name: '',
      description: '',
      is_active: true,
      display_order: brands.length + 1,
    });
    setSelectedLogo(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleEdit = (brand: Brand) => {
    setIsCreating(false);
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description || '',
      is_active: brand.is_active,
      display_order: brand.display_order,
    });
    setSelectedLogo(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key].toString());
        }
      });

      if (selectedLogo) {
        formDataToSend.append('logo', selectedLogo);
      }

      if (isCreating) {
        await brandsAPI.create(formDataToSend);
        showToast('Marque créée avec succès', 'success');
      } else if (editingBrand) {
        await brandsAPI.update(editingBrand.id.toString(), formDataToSend);
        showToast('Marque mise à jour avec succès', 'success');
      }

      setShowModal(false);
      loadBrands();
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    const brand = brands.find(b => b.id === id);
    setConfirmDelete({ show: true, brandId: id });
  };

  const toggleBrandStatus = async (brand: Brand) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', brand.name);
      formDataToSend.append('is_active', (!brand.is_active).toString());
      formDataToSend.append('display_order', brand.display_order.toString());
      if (brand.description) formDataToSend.append('description', brand.description);

      await brandsAPI.update(brand.id.toString(), formDataToSend);
      loadBrands();
      showToast(`Marque ${!brand.is_active ? 'activée' : 'désactivée'} avec succès`, 'success');
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de la mise à jour', 'error');
    }
  };

  const confirmDeleteBrand = async () => {
    if (!confirmDelete.brandId) return;

    try {
      await brandsAPI.delete(confirmDelete.brandId.toString());
      setConfirmDelete({ show: false, brandId: null });
      loadBrands();
      showToast('Marque supprimée avec succès', 'success');
    } catch (error: any) {
      console.error('Delete error:', error);
      const errorMessage = error.message || 'Erreur lors de la suppression';
      showToast(errorMessage, 'error');
      setConfirmDelete({ show: false, brandId: null });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Gestion des marques</h2>
          <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{brands.length} marque(s)</p>
        </div>
        <button onClick={handleCreate} className="btn-primary px-6 py-3">
          <Icon name="PlusIcon" size={16} />
          Ajouter une marque
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6 hover:border-[#E8A020] transition-all"
          >
            <div className="w-full h-32 bg-white dark:bg-[#0D0D0D] rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {brand.logo ? (
                <img src={getImageUrl(brand.logo)} alt={brand.name} className="w-full h-full object-contain" />
              ) : (
                <Icon name="PhotoIcon" size={48} className="text-gray-500 dark:text-[#5A5550]" />
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-900 dark:text-[#F5F0E8] text-lg mb-1">{brand.name}</h3>
              {brand.description && <p className="text-sm text-gray-600 dark:text-[#A09A8E] line-clamp-2">{brand.description}</p>}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${brand.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                {brand.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-gray-500 dark:text-[#5A5550]">Ordre: {brand.display_order}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleBrandStatus(brand)} 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  brand.is_active 
                    ? 'bg-gray-100 dark:bg-[#0D0D0D] text-gray-600 dark:text-[#A09A8E] hover:bg-gray-200 dark:hover:bg-[#141414]' 
                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                }`}
                title={brand.is_active ? 'Désactiver' : 'Activer'}
              >
                <Icon name={brand.is_active ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
              </button>
              <button onClick={() => handleEdit(brand)} className="flex-1 px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors text-sm font-medium">
                <Icon name="PencilIcon" size={14} className="inline mr-2" />
                Modifier
              </button>
              <button onClick={() => handleDelete(brand.id)} className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-rose-400 transition-colors" title="Supprimer">
                <Icon name="TrashIcon" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl">
          <Icon name="TagIcon" size={48} className="text-gray-500 dark:text-[#5A5550] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-[#A09A8E]">Aucune marque trouvée</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-[#F5F0E8]">{isCreating ? 'Ajouter une marque' : 'Modifier la marque'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    ) : editingBrand?.logo ? (
                      <img src={getImageUrl(editingBrand.logo)} alt={formData.name} className="w-full h-full object-contain" />
                    ) : (
                      <Icon name="PhotoIcon" size={48} className="text-gray-500 dark:text-[#5A5550]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
                    <label htmlFor="logo-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-50 dark:bg-[#141414] transition-colors cursor-pointer">
                      <Icon name="PhotoIcon" size={16} />
                      Choisir un logo
                    </label>
                    <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-2">Format: PNG, JPG, SVG (max 2MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Nom *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020] resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Ordre d'affichage</label>
                  <input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })} min="0" className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Statut</label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg cursor-pointer hover:border-[#E8A020] transition-colors">
                    <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 rounded border-[rgba(245,240,232,0.2)] bg-white dark:bg-[#0D0D0D] text-[#E8A020] focus:ring-[#E8A020] focus:ring-offset-0" />
                    <span className="text-sm text-gray-900 dark:text-[#F5F0E8]">Marque active</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 text-sm text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="btn-primary px-6 py-2 text-sm disabled:opacity-50">
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {confirmDelete.show && (
        <ConfirmModal
          title="Supprimer la marque"
          message="Êtes-vous sûr de vouloir supprimer cette marque ? Cette action est irréversible."
          confirmText="Supprimer"
          cancelText="Annuler"
          type="danger"
          onConfirm={confirmDeleteBrand}
          onCancel={() => setConfirmDelete({ show: false, brandId: null })}
        />
      )}
    </div>
  );
}
