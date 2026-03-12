"use client";

import { useEffect, useState } from 'react';
import { quotesAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const data = await quotesAPI.getAll();
      setQuotes(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await quotesAPI.update(id, { status });
      loadQuotes();
      if (selectedQuote?.id === id) {
        setSelectedQuote({ ...selectedQuote, status });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const viewQuote = (quote: any) => {
    setSelectedQuote(quote);
    setShowModal(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Demandes de devis</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{quotes.length} demande(s)</p>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#141414] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Client</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Véhicule</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Statut</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(245,240,232,0.08)]">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 dark:bg-[#141414]">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">{quote.first_name} {quote.last_name}</p>
                  <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{quote.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 dark:text-[#F5F0E8]">
                    {quote.type === 'new' ? 'Neuf' : quote.type === 'used' ? 'Occasion' : 'Leasing'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 dark:text-[#F5F0E8]">{quote.brand} {quote.model}</p>
                  {quote.budget && <p className="text-xs text-gray-600 dark:text-[#A09A8E]">Budget: {quote.budget}€</p>}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={quote.status}
                    onChange={(e) => updateStatus(quote.id, e.target.value)}
                    className="search-input rounded px-3 py-1 text-sm"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En cours</option>
                    <option value="sent">Envoyé</option>
                    <option value="closed">Clôturé</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => viewQuote(quote)}
                    className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-[#E8A020] transition-colors"
                    title="Voir les détails"
                  >
                    <Icon name="EyeIcon" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de détails */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)] p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">
                Demande de devis #{selectedQuote.id}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-gray-900 dark:hover:text-[#F5F0E8] transition-colors"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Informations client */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E] mb-3">
                  Informations client
                </h4>
                <div className="bg-gray-50 dark:bg-[#141414] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Nom complet</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-[#F5F0E8]">
                      {selectedQuote.first_name} {selectedQuote.last_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Email</span>
                    <a href={`mailto:${selectedQuote.email}`} className="text-sm font-semibold text-[#E8A020] hover:underline">
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Téléphone</span>
                    <a href={`tel:${selectedQuote.phone}`} className="text-sm font-semibold text-[#E8A020] hover:underline">
                      {selectedQuote.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Détails du véhicule */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E] mb-3">
                  Détails du véhicule
                </h4>
                <div className="bg-gray-50 dark:bg-[#141414] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Type</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-[#F5F0E8]">
                      {selectedQuote.type === 'new' ? 'Neuf' : selectedQuote.type === 'used' ? 'Occasion' : 'Leasing'}
                    </span>
                  </div>
                  {selectedQuote.brand && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Marque</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-[#F5F0E8]">{selectedQuote.brand}</span>
                    </div>
                  )}
                  {selectedQuote.model && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-[#A09A8E]">Modèle</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-[#F5F0E8]">{selectedQuote.model}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              {selectedQuote.message && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E] mb-3">
                    Message
                  </h4>
                  <div className="bg-gray-50 dark:bg-[#141414] rounded-lg p-4">
                    <p className="text-sm text-gray-900 dark:text-[#F5F0E8] whitespace-pre-wrap">{selectedQuote.message}</p>
                  </div>
                </div>
              )}

              {/* Statut */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-[#A09A8E] mb-3">
                  Statut
                </h4>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => updateStatus(selectedQuote.id, e.target.value)}
                  className="w-full search-input rounded-lg px-4 py-3"
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En cours</option>
                  <option value="sent">Envoyé</option>
                  <option value="closed">Clôturé</option>
                </select>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500 dark:text-[#A09A8E] text-center pt-4 border-t border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
                Reçu le {new Date(selectedQuote.created_at).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
