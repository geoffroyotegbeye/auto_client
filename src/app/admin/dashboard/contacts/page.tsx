"use client";

import { useEffect, useState } from 'react';
import { contactAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await contactAPI.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await contactAPI.update(id, { status });
      loadContacts();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Messages de contact</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{contacts.length} message(s)</p>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">{contact.name}</p>
                <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{contact.email}</p>
              </div>
              <select
                value={contact.status}
                onChange={(e) => updateStatus(contact.id, e.target.value)}
                className="search-input rounded px-3 py-1 text-sm"
              >
                <option value="new">Nouveau</option>
                <option value="read">Lu</option>
                <option value="replied">Répondu</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-[#F5F0E8] mb-2">{contact.subject}</p>
            <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{contact.message}</p>
            <p className="text-xs text-gray-500 dark:text-[#5A5550] mt-4">
              {new Date(contact.created_at).toLocaleString('fr-FR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
