import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Map, Database, User, Info, MessageSquare, Settings, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('dashboard') },
    { path: '/map', icon: Map, label: t('map') },
    { path: '/data', icon: Database, label: t('data') },
    { path: '/chat', icon: MessageSquare, label: t('chat') },
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/settings', icon: Settings, label: t('settings') },
    { path: '/help', icon: HelpCircle, label: t('help') },
    { path: '/about', icon: Info, label: t('about') },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-hidden w-84 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 lg:top-0 lg:h-[calc(100vh-4rem)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Close button mobile */}
          <div className="flex justify-between items-center lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('navigation', {}, { fallbackLanguage: 'fr' }) || 'Navigation'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation principale */}
          <nav className="space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-orange-600 dark:text-orange-400' : ''
                  }`} />
                  <span className="font-medium">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Stats rapides */}
          <div className="mt-8 p-4 bg-gradient-to-br from-orange-50 to-green-50 dark:from-orange-900/10 dark:to-green-900/10 rounded-lg border border-orange-100 dark:border-orange-800/20">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Database className="h-4 w-4 mr-2 text-orange-500" />
              {t('quick_stats', {}, { fallbackLanguage: 'fr' }) || 'Stats Rapides'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('regions')}</span>
                <span className="font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('infrastructures', {}, { fallbackLanguage: 'fr' }) || 'Infrastructures'}</span>
                <span className="font-medium text-gray-900 dark:text-white">50+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('data_points', {}, { fallbackLanguage: 'fr' }) || 'Données'}</span>
                <span className="font-medium text-gray-900 dark:text-white">1000+</span>
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('version')} 1.0.0 - SIATeG 2025
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;