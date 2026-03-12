"use client";

import { useEffect, useState } from 'react';
import { appointmentsAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await appointmentsAPI.update(id, { status });
      loadAppointments();
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F5F0E8]">Rendez-vous</h2>
        <p className="text-sm text-gray-600 dark:text-[#A09A8E] mt-1">{appointments.length} rendez-vous</p>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#141414] border-b border-gray-200 dark:border-[rgba(245,240,232,0.08)]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Client</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Statut</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-600 dark:text-[#A09A8E]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(245,240,232,0.08)]">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50 dark:bg-[#141414]">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900 dark:text-[#F5F0E8]">{apt.first_name} {apt.last_name}</p>
                  <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{apt.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 dark:text-[#F5F0E8]">{apt.type === 'showroom' ? 'Showroom' : 'SAV'}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 dark:text-[#F5F0E8]">{new Date(apt.preferred_date).toLocaleDateString('fr-FR')}</p>
                  <p className="text-xs text-gray-600 dark:text-[#A09A8E]">{apt.preferred_time}</p>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={apt.status}
                    onChange={(e) => updateStatus(apt.id, e.target.value)}
                    className="search-input rounded px-3 py-1 text-sm"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                    <option value="completed">Terminé</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-600 dark:text-[#A09A8E] hover:text-[#E8A020]">
                    <Icon name="EyeIcon" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
