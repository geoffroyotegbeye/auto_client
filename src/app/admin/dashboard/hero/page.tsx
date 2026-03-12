"use client";

import { useEffect, useState } from 'react';
import { heroAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Toast from '@/components/Toast';
import { getImageUrl } from '@/utils/imageUrl';

interface HeroSettings {
  title_line1: string;
  title_line2: string;
  title_line3: string;
  subtitle: string;
  badge_text: string;
  badge_subtext: string;
  main_image: string;
  card_title: string;
  card_subtitle: string;
  card_price: string;
  floating_card_title: string;
  floating_card_text: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function HeroPage() {
  const [settings, setSettings] = useState<HeroSettings | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  const showToast = (message: string, type: ToastState['type']) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await heroAPI.getSettings();
      setSettings(data);
      setFormData(data);
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Erreur lors du chargement des paramètres', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && key !== 'id' && key !== 'updated_at' && key !== 'is_active') {
          formDataToSend.append(key, formData[key].toString());
        }
      });

      if (selectedImage) {
        formDataToSend.append('main_image', selectedImage);
      }

      await heroAPI.updateSettings(formDataToSend);
      showToast('Paramètres mis à jour avec succès', 'success');
      loadSettings();
      setSelectedImage(null);
      setPreviewUrl('');
    } catch (error: any) {
      showToast(error.message || 'Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
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
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Gestion du Hero</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">Personnalisez la section hero de la page d'accueil</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Titre */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Titre principal</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Ligne 1</label>
              <input
                type="text"
                value={formData.title_line1}
                onChange={(e) => setFormData({ ...formData, title_line1: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Ligne 2 (accent)</label>
              <input
                type="text"
                value={formData.title_line2}
                onChange={(e) => setFormData({ ...formData, title_line2: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Ligne 3</label>
              <input
                type="text"
                value={formData.title_line3}
                onChange={(e) => setFormData({ ...formData, title_line3: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
          </div>
        </div>

        {/* Sous-titre */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Sous-titre</h3>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020] resize-none"
            placeholder="Utilisez \n pour les sauts de ligne"
          />
        </div>

        {/* Badge */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Badge</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Texte du badge</label>
              <input
                type="text"
                value={formData.badge_text}
                onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Sous-texte</label>
              <input
                type="text"
                value={formData.badge_subtext}
                onChange={(e) => setFormData({ ...formData, badge_subtext: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
          </div>
        </div>

        {/* Image principale */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Image principale</h3>
          <div className="flex items-center gap-4">
            <div className="w-64 h-40 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg overflow-hidden relative">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : settings?.main_image ? (
                <img src={getImageUrl(settings.main_image)} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="PhotoIcon" size={48} className="text-gray-500 dark:text-[#5A5550]" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="hero-image"
              />
              <label
                htmlFor="hero-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:bg-gray-50 dark:bg-[#141414] transition-colors cursor-pointer"
              >
                <Icon name="PhotoIcon" size={16} />
                Choisir une image
              </label>
              <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-2">Format: JPG, PNG (max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Card flottante */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Card sur l'image</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Titre</label>
              <input
                type="text"
                value={formData.card_title}
                onChange={(e) => setFormData({ ...formData, card_title: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Sous-titre</label>
              <input
                type="text"
                value={formData.card_subtitle}
                onChange={(e) => setFormData({ ...formData, card_subtitle: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Prix</label>
              <input
                type="text"
                value={formData.card_price}
                onChange={(e) => setFormData({ ...formData, card_price: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
          </div>
        </div>

        {/* Floating card */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Card flottante (coin supérieur droit)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Titre</label>
              <input
                type="text"
                value={formData.floating_card_title}
                onChange={(e) => setFormData({ ...formData, floating_card_title: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">Texte</label>
              <input
                type="text"
                value={formData.floating_card_text}
                onChange={(e) => setFormData({ ...formData, floating_card_text: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={loadSettings}
            className="px-6 py-2 text-sm text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-6 py-3 disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
