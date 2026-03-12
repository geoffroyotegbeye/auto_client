"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { authAPI, configAPI } from '@/services/api';
import { getImageUrl } from '@/utils/imageUrl';
import Icon from '@/components/ui/AppIcon';
import ThemeToggle from '@/components/ThemeToggle';

const menuItems = [
  { icon: 'ChartBarIcon', label: 'Dashboard', href: '/admin/dashboard' },
  { icon: 'TruckIcon', label: 'Véhicules', href: '/admin/dashboard/vehicles' },
  { icon: 'TagIcon', label: 'Marques', href: '/admin/dashboard/brands' },
  { icon: 'PhotoIcon', label: 'Hero', href: '/admin/dashboard/hero' },
  { icon: 'CalendarIcon', label: 'Rendez-vous', href: '/admin/dashboard/appointments' },
  { icon: 'DocumentTextIcon', label: 'Devis', href: '/admin/dashboard/quotes' },
  { icon: 'ChatBubbleLeftIcon', label: 'Messages', href: '/admin/dashboard/contacts' },
  { icon: 'StarIcon', label: 'Avis clients', href: '/admin/dashboard/reviews' },
  { icon: 'WrenchScrewdriverIcon', label: 'Services SAV', href: '/admin/dashboard/services' },
  { icon: 'UsersIcon', label: 'Utilisateurs', href: '/admin/dashboard/users' },
  { icon: 'Cog6ToothIcon', label: 'Configuration', href: '/admin/dashboard/config' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoDark, setLogoDark] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setUser(authAPI.getUser());
    
    // Charger le logo
    const loadLogo = async () => {
      try {
        const config = await configAPI.get();
        if (config.site_logo) {
          setLogo(config.site_logo);
        }
        if (config.site_logo_dark) {
          setLogoDark(config.site_logo_dark);
        }
      } catch (error) {
        console.error('Erreur chargement logo:', error);
      }
    };
    loadLogo();
  }, [router]);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/admin/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-vm-dark flex items-center justify-center">
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={48} className="text-vm-red animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-vm-dark flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-50 dark:bg-vm-dark-card border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logo || logoDark ? (
              <>
                {logo && (
                  <img 
                    src={getImageUrl(logo)} 
                    alt="Logo" 
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                )}
                {logoDark && (
                  <img 
                    src={getImageUrl(logoDark)} 
                    alt="Logo" 
                    className="h-8 w-auto object-contain hidden dark:block"
                  />
                )}
                {!logo && logoDark && (
                  <img 
                    src={getImageUrl(logoDark)} 
                    alt="Logo" 
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                )}
                {logo && !logoDark && (
                  <img 
                    src={getImageUrl(logo)} 
                    alt="Logo" 
                    className="h-8 w-auto object-contain hidden dark:block"
                  />
                )}
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">Mig Motor</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Icon name={sidebarOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          sidebarOpen ? 'w-64' : 'lg:w-20'
        } bg-gray-50 dark:bg-vm-dark-card border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col fixed lg:sticky top-0 h-screen z-40 lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 hidden lg:block">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              {logo || logoDark ? (
                <>
                  {logo && (
                    <img 
                      src={getImageUrl(logo)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                  )}
                  {logoDark && (
                    <img 
                      src={getImageUrl(logoDark)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  )}
                  {!logo && logoDark && (
                    <img 
                      src={getImageUrl(logoDark)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                  )}
                  {logo && !logoDark && (
                    <img 
                      src={getImageUrl(logo)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Mig Motor
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">Admin</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {logo || logoDark ? (
                <>
                  {logo && (
                    <img 
                      src={getImageUrl(logo)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                  )}
                  {logoDark && (
                    <img 
                      src={getImageUrl(logoDark)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  )}
                  {!logo && logoDark && (
                    <img 
                      src={getImageUrl(logoDark)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                  )}
                  {logo && !logoDark && (
                    <img 
                      src={getImageUrl(logo)} 
                      alt="Logo" 
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <span className="text-xl font-bold text-vm-red">M</span>
              )}
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-vm-red text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-vm-dark hover:text-gray-900 dark:hover:text-white'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon name={item.icon as any} size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 relative">
          {sidebarOpen ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white dark:hover:bg-vm-dark rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-vm-red flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{user.email}</p>
                </div>
                <Icon name="ChevronUpIcon" size={16} className={`text-gray-500 transition-transform ${showUserDropdown ? '' : 'rotate-180'}`} />
              </button>
              
              {showUserDropdown && (
                <div className="absolute bottom-full right-4 mb-2 w-48 bg-white dark:bg-vm-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    href="/admin/dashboard/profile"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-vm-dark-card transition-colors"
                  >
                    <Icon name="UserCircleIcon" size={16} />
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={16} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
              title="Déconnexion"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
            </button>
          )}
        </div>

        {/* Toggle Desktop Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-vm-red rounded-full items-center justify-center hover:bg-red-600 transition-colors"
        >
          <Icon
            name={sidebarOpen ? 'ChevronLeftIcon' : 'ChevronRightIcon'}
            size={14}
            className="text-white"
          />
        </button>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full pt-16 lg:pt-0">
        {/* Top Bar - Desktop Only */}
        <header className="hidden lg:block bg-gray-50 dark:bg-vm-dark-card border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                {menuItems.find((item) => item.href === pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500 mt-1">
                Bienvenue, {user.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/"
                target="_blank"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-medium bg-white dark:bg-vm-dark border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Icon name="GlobeAltIcon" size={14} />
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
