import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  User, 
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from '../components/Common/LanguageSelector';

const Settings = () => {
  const { 
    t, 
    currentLanguage, 
    getTranslationStats, 
    exportTranslations,
    getAvailableLanguages 
  } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      dataUpdates: true,
      systemAlerts: true
    },
    privacy: {
      profileVisible: true,
      shareData: false,
      analytics: true
    },
    display: {
      compactMode: false,
      showAnimations: true,
      highContrast: false
    }
  });

  const tabs = [
    { id: 'general', label: t('general', {}, { fallbackLanguage: 'fr' }) || 'Général', icon: SettingsIcon },
    { id: 'language', label: t('language'), icon: Globe },
    { id: 'appearance', label: t('appearance', {}, { fallbackLanguage: 'fr' }) || 'Apparence', icon: isDark ? Moon : Sun },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'privacy', label: t('privacy', {}, { fallbackLanguage: 'fr' }) || 'Confidentialité', icon: Shield },
    { id: 'data', label: t('data'), icon: Database }
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    // Afficher une notification de succès
    console.log('Paramètres sauvegardés');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      notifications: {
        email: true,
        push: false,
        dataUpdates: true,
        systemAlerts: true
      },
      privacy: {
        profileVisible: true,
        shareData: false,
        analytics: true
      },
      display: {
        compactMode: false,
        showAnimations: true,
        highContrast: false
      }
    };
    setSettings(defaultSettings);
  };

  const translationStats = getTranslationStats();
  const availableLanguages = getAvailableLanguages();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('settings')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('settings_description', {}, { fallbackLanguage: 'fr' }) || 'Personnalisez votre expérience sur le Géoportail Niger'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar des onglets */}
        <div className="lg:w-64">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            
            {/* Onglet Général */}
            {activeTab === 'general' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('general_settings', {}, { fallbackLanguage: 'fr' }) || 'Paramètres généraux'}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('default_region', {}, { fallbackLanguage: 'fr' }) || 'Région par défaut'}
                    </label>
                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="">{t('select_region', {}, { fallbackLanguage: 'fr' }) || 'Sélectionner une région'}</option>
                      <option value="niamey">{t('niamey')}</option>
                      <option value="agadez">{t('agadez')}</option>
                      <option value="diffa">{t('diffa')}</option>
                      <option value="dosso">{t('dosso')}</option>
                      <option value="maradi">{t('maradi')}</option>
                      <option value="tahoua">{t('tahoua')}</option>
                      <option value="tillaberi">{t('tillaberi')}</option>
                      <option value="zinder">{t('zinder')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.display.compactMode}
                        onChange={(e) => handleSettingChange('display', 'compactMode', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('compact_mode', {}, { fallbackLanguage: 'fr' }) || 'Mode compact'}
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                      {t('compact_mode_description', {}, { fallbackLanguage: 'fr' }) || 'Affichage plus dense des informations'}
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.display.showAnimations}
                        onChange={(e) => handleSettingChange('display', 'showAnimations', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('show_animations', {}, { fallbackLanguage: 'fr' }) || 'Afficher les animations'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Langue */}
            {activeTab === 'language' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('language_settings', {}, { fallbackLanguage: 'fr' }) || 'Paramètres de langue'}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      {t('select_language', {}, { fallbackLanguage: 'fr' }) || 'Sélectionner la langue'}
                    </label>
                    <LanguageSelector variant="buttons" showFlag={true} showName={true} />
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('translation_statistics', {}, { fallbackLanguage: 'fr' }) || 'Statistiques de traduction'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(translationStats).map(([lang, stats]) => (
                        <div key={lang} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">
                              {availableLanguages.find(l => l.code === lang)?.flag}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {stats.language}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stats.totalKeys} {t('translation_keys', {}, { fallbackLanguage: 'fr' }) || 'clés'}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {stats.completeness} {t('complete', {}, { fallbackLanguage: 'fr' }) || 'complet'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('translation_tools', {}, { fallbackLanguage: 'fr' }) || 'Outils de traduction'}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => exportTranslations(currentLanguage)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>{t('export_translations', {}, { fallbackLanguage: 'fr' }) || 'Exporter les traductions'}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span>{t('import_translations', {}, { fallbackLanguage: 'fr' }) || 'Importer les traductions'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Apparence */}
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('appearance_settings', {}, { fallbackLanguage: 'fr' }) || 'Paramètres d\'apparence'}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      {t('theme', {}, { fallbackLanguage: 'fr' }) || 'Thème'}
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => !isDark && toggleTheme()}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          !isDark 
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <p className="font-medium text-gray-900 dark:text-white">
                          {t('light_theme', {}, { fallbackLanguage: 'fr' }) || 'Thème clair'}
                        </p>
                      </button>
                      
                      <button
                        onClick={() => isDark && toggleTheme()}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isDark 
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Moon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <p className="font-medium text-gray-900 dark:text-white">
                          {t('dark_theme', {}, { fallbackLanguage: 'fr' }) || 'Thème sombre'}
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.display.highContrast}
                        onChange={(e) => handleSettingChange('display', 'highContrast', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('high_contrast', {}, { fallbackLanguage: 'fr' }) || 'Contraste élevé'}
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                      {t('high_contrast_description', {}, { fallbackLanguage: 'fr' }) || 'Améliore la lisibilité pour les personnes malvoyantes'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('notification_settings')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('email_notifications', {}, { fallbackLanguage: 'fr' }) || 'Notifications par email'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('push_notifications', {}, { fallbackLanguage: 'fr' }) || 'Notifications push'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.dataUpdates}
                        onChange={(e) => handleSettingChange('notifications', 'dataUpdates', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('data_update_notifications', {}, { fallbackLanguage: 'fr' }) || 'Mises à jour des données'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.systemAlerts}
                        onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('system_alerts', {}, { fallbackLanguage: 'fr' }) || 'Alertes système'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Confidentialité */}
            {activeTab === 'privacy' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('privacy_settings')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.privacy.profileVisible}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('public_profile', {}, { fallbackLanguage: 'fr' }) || 'Profil public'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareData}
                        onChange={(e) => handleSettingChange('privacy', 'shareData', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('share_usage_data', {}, { fallbackLanguage: 'fr' }) || 'Partager les données d\'utilisation'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.privacy.analytics}
                        onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('analytics', {}, { fallbackLanguage: 'fr' }) || 'Analyses et statistiques'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Données */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('data_management', {}, { fallbackLanguage: 'fr' }) || 'Gestion des données'}
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      {t('data_export', {}, { fallbackLanguage: 'fr' }) || 'Export des données'}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                      {t('export_description', {}, { fallbackLanguage: 'fr' }) || 'Téléchargez vos données personnelles et contributions'}
                    </p>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>{t('export_data', {}, { fallbackLanguage: 'fr' }) || 'Exporter mes données'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                      {t('data_deletion', {}, { fallbackLanguage: 'fr' }) || 'Suppression des données'}
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                      {t('deletion_warning', {}, { fallbackLanguage: 'fr' }) || 'Cette action est irréversible et supprimera définitivement votre compte'}
                    </p>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="h-4 w-4" />
                      <span>{t('delete_account', {}, { fallbackLanguage: 'fr' }) || 'Supprimer mon compte'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between">
                <button
                  onClick={handleResetSettings}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>{t('reset_settings', {}, { fallbackLanguage: 'fr' }) || 'Réinitialiser'}</span>
                </button>
                
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{t('save_settings', {}, { fallbackLanguage: 'fr' }) || 'Sauvegarder'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;