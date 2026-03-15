"use client";

import { useEffect, useState } from 'react';
import { servicesAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price_from: '',
    duration: '',
    icon: 'WrenchScrewdriverIcon'
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({ name: '', category: '', description: '', price_from: '', duration: '', icon: 'WrenchScrewdriverIcon' });
    setShowModal(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price_from: service.price_from.toString(),
      duration: service.duration,
      icon: service.icon || 'WrenchScrewdriverIcon'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, price_from: Math.floor(parseFloat(formData.price_from)) };
      if (editingService) {
        await servicesAPI.update(editingService.id, payload);
      } else {
        await servicesAPI.create(payload);
      }
      await loadServices();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce service ?')) return;
    try {
      await servicesAPI.delete(id.toString());
      await loadServices();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Services SAV</h2>
          <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{services.length} service(s)</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary px-6 py-3">
          <Icon name="PlusIcon" size={16} />
          Ajouter un service
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8A020]/10 flex items-center justify-center">
                  <Icon name={service.icon || 'WrenchScrewdriverIcon'} size={20} className="text-[#E8A020]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">{service.name}</p>
                  <p className="text-xs text-gray-600 dark:text-[#A09A8E]">{service.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(service)} className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-[#E8A020]">
                  <Icon name="PencilIcon" size={16} />
                </button>
                <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-rose-400">
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-[#A09A8E] mb-4">{service.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#E8A020] font-bold">À partir de {Math.floor(service.price_from).toLocaleString('fr-FR')} FCFA</span>
              <span className="text-gray-500 dark:text-[#5A5550]">{service.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-200 dark:border-[rgba(245,240,232,0.08)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">{editingService ? 'Modifier le service' : 'Ajouter un service'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-[#A09A8E] dark:hover:text-[#F5F0E8]">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Nom du service</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Catégorie</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required>
                  <option value="">Sélectionner...</option>
                  <option value="entretien">Entretien</option>
                  <option value="reparation">Réparation</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="carrosserie">Carrosserie</option>
                  <option value="pneumatique">Pneumatique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Prix (FCFA)</label>
                  <input type="number" step="1" value={formData.price_from} onChange={(e) => setFormData({...formData, price_from: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#A09A8E] mb-2">Durée</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="Ex: 2-3 heures" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-[#F5F0E8]" required />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-[rgba(245,240,232,0.08)] text-gray-700 dark:text-[#A09A8E] hover:bg-gray-50 dark:hover:bg-[#0D0D0D]">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary px-6 py-3 disabled:opacity-50">
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
