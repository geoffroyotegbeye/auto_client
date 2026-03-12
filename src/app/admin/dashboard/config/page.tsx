"use client";

import { useEffect, useState } from 'react';
import { configAPI } from '@/services/api';
import { getImageUrl } from '@/utils/imageUrl';
import Icon from '@/components/ui/AppIcon';
import Toast from '@/components/Toast';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function ConfigPage() {
  const [config, setConfig] = useState({
    site_logo: null as string | null,
    site_logo_dark: null as string | null,
    currency_symbol: 'FCFA',
    currency_name: 'Franc CFA',
    currency_position: 'after'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [selectedLogoDark, setSelectedLogoDark] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrlDark, setPreviewUrlDark] = useState<string | null>(null);

  const showToast = (message: string, type: ToastState['type']) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await configAPI.get();
      setConfig(data);
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Erreur lors du chargement de la configuration', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleLogoDarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogoDark(file);
      setPreviewUrlDark(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('currency_symbol', config.currency_symbol);
      formData.append('currency_name', config.currency_name);
      formData.append('currency_position', config.currency_position);
      
      if (selectedLogo) {
        formData.append('logo', selectedLogo);
      }
      if (selectedLogoDark) {
        formData.append('logo_dark', selectedLogoDark);
      }

      await configAPI.update(formData);
      showToast('Configuration mise à jour avec succès', 'success');
      setSelectedLogo(null);
      setSelectedLogoDark(null);
      setPreviewUrl(null);
      setPreviewUrlDark(null);
      loadConfig();
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Configuration du site</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">Gérer le logo, la devise et les paramètres généraux</p>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Logo Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4 flex items-center gap-2">
              <Icon name="PhotoIcon" size={20} className="text-[#E8A020]" />
              Logos du site
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Light Mode */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Logo Light Mode</h4>
                {(previewUrl || config.site_logo) && (
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-4">
                      <img
                        src={previewUrl || getImageUrl(config.site_logo)}
                        alt="Logo Light"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-[#A09A8E]">
                      {previewUrl ? 'Nouveau logo (non enregistré)' : 'Logo actuel'}
                    </p>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:border-[#E8A020] transition-colors cursor-pointer"
                  >
                    <Icon name="ArrowUpTrayIcon" size={16} />
                    {config.site_logo ? 'Changer' : 'Ajouter'}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-2">
                    Pour fond clair (PNG transparent recommandé)
                  </p>
                </div>
              </div>

              {/* Logo Dark Mode */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Logo Dark Mode</h4>
                {(previewUrlDark || config.site_logo_dark) && (
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-[#1a1a1f] border border-gray-700 flex items-center justify-center p-4">
                      <img
                        src={previewUrlDark || getImageUrl(config.site_logo_dark)}
                        alt="Logo Dark"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-[#A09A8E]">
                      {previewUrlDark ? 'Nouveau logo (non enregistré)' : 'Logo actuel'}
                    </p>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    onChange={handleLogoDarkChange}
                    className="hidden"
                    id="logo-dark-upload"
                  />
                  <label
                    htmlFor="logo-dark-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] hover:border-[#E8A020] transition-colors cursor-pointer"
                  >
                    <Icon name="ArrowUpTrayIcon" size={16} />
                    {config.site_logo_dark ? 'Changer' : 'Ajouter'}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-2">
                    Pour fond sombre (PNG transparent recommandé)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)] pt-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4 flex items-center gap-2">
              <Icon name="CurrencyDollarIcon" size={20} className="text-[#E8A020]" />
              Configuration de la devise
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">
                  Symbole de la devise *
                </label>
                <input
                  type="text"
                  value={config.currency_symbol}
                  onChange={(e) => setConfig({ ...config, currency_symbol: e.target.value })}
                  required
                  placeholder="Ex: FCFA, €, $, MAD"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                />
                <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-1">
                  Le symbole qui sera affiché à côté des prix
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">
                  Nom de la devise *
                </label>
                <input
                  type="text"
                  value={config.currency_name}
                  onChange={(e) => setConfig({ ...config, currency_name: e.target.value })}
                  required
                  placeholder="Ex: Franc CFA, Euro, Dollar"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                />
                <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-1">
                  Le nom complet de la devise
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-[#F5F0E8] mb-2">
                  Position du symbole *
                </label>
                <select
                  value={config.currency_position}
                  onChange={(e) => setConfig({ ...config, currency_position: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg text-gray-900 dark:text-[#F5F0E8] focus:outline-none focus:border-[#E8A020]"
                >
                  <option value="before">Avant le prix ($ 1000)</option>
                  <option value="after">Après le prix (1000 FCFA)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D0D0D] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-lg p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#5A5550] mb-2">
              Aperçu
            </p>
            <p className="text-2xl font-bold text-[#E8A020]">
              {config.currency_position === 'before' 
                ? `${config.currency_symbol} 25,000,000`
                : `25,000,000 ${config.currency_symbol}`
              }
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <button
              type="button"
              onClick={() => {
                loadConfig();
                setSelectedLogo(null);
                setSelectedLogoDark(null);
                setPreviewUrl(null);
                setPreviewUrlDark(null);
              }}
              className="px-6 py-2 text-sm text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:text-[#F5F0E8] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-6 py-3 text-sm disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Icon name="CheckIcon" size={16} />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
