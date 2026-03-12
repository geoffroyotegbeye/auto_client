"use client";

import { useEffect, useState } from 'react';
import { vehiclesAPI, appointmentsAPI, quotesAPI, contactAPI, reviewsAPI } from '@/services/api';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    vehicles: 0,
    appointments: 0,
    quotes: 0,
    contacts: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [vehicles, appointments, quotes, contacts, reviews] = await Promise.all([
        vehiclesAPI.getAll(),
        appointmentsAPI.getAll(),
        quotesAPI.getAll(),
        contactAPI.getAll(),
        reviewsAPI.getAll(),
      ]);

      setStats({
        vehicles: vehicles.vehicles?.length || vehicles.length || 0,
        appointments: appointments.length || 0,
        quotes: quotes.length || 0,
        contacts: contacts.length || 0,
        reviews: reviews.length || 0,
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: 'TruckIcon',
      label: 'Véhicules',
      value: stats.vehicles,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      href: '/admin/dashboard/vehicles',
    },
    {
      icon: 'CalendarIcon',
      label: 'Rendez-vous',
      value: stats.appointments,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      href: '/admin/dashboard/appointments',
    },
    {
      icon: 'DocumentTextIcon',
      label: 'Devis',
      value: stats.quotes,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      href: '/admin/dashboard/quotes',
    },
    {
      icon: 'ChatBubbleLeftIcon',
      label: 'Messages',
      value: stats.contacts,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      href: '/admin/dashboard/contacts',
    },
    {
      icon: 'StarIcon',
      label: 'Avis',
      value: stats.reviews,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      href: '/admin/dashboard/reviews',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="ArrowPathIcon" size={48} className="text-[#E8A020] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6 hover:border-[#E8A020] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon name={card.icon as any} size={24} className={card.color} />
              </div>
              <Icon
                name="ArrowRightIcon"
                size={16}
                className="text-gray-500 dark:text-[#5A5550] group-hover:text-[#E8A020] transition-colors"
              />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-[#F5F0E8] mb-1">{card.value}</p>
            <p className="text-sm text-gray-600 dark:text-[#A09A8E]">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[rgba(245,240,232,0.08)] rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/dashboard/vehicles"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#141414] rounded-lg hover:bg-gray-100 dark:bg-[#222222] transition-colors"
          >
            <Icon name="PlusIcon" size={20} className="text-[#E8A020]" />
            <span className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Ajouter un véhicule</span>
          </Link>
          <Link
            href="/admin/dashboard/appointments"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#141414] rounded-lg hover:bg-gray-100 dark:bg-[#222222] transition-colors"
          >
            <Icon name="CalendarIcon" size={20} className="text-[#E8A020]" />
            <span className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Voir les RDV</span>
          </Link>
          <Link
            href="/admin/dashboard/quotes"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#141414] rounded-lg hover:bg-gray-100 dark:bg-[#222222] transition-colors"
          >
            <Icon name="DocumentTextIcon" size={20} className="text-[#E8A020]" />
            <span className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Gérer les devis</span>
          </Link>
          <Link
            href="/admin/dashboard/reviews"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#141414] rounded-lg hover:bg-gray-100 dark:bg-[#222222] transition-colors"
          >
            <Icon name="StarIcon" size={20} className="text-[#E8A020]" />
            <span className="text-sm font-medium text-gray-900 dark:text-[#F5F0E8]">Modérer les avis</span>
          </Link>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#E8A020]/10 to-transparent border border-[#E8A020]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Icon name="InformationCircleIcon" size={24} className="text-[#E8A020] flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-[#F5F0E8] mb-2">Bienvenue sur votre dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-[#A09A8E] leading-relaxed">
              Gérez facilement vos véhicules, rendez-vous, devis et messages clients depuis cette interface.
              Utilisez le menu latéral pour naviguer entre les différentes sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
