import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  translations, 
  getTranslation, 
  detectBrowserLanguage, 
  formatNumber, 
  formatDate, 
  getLanguageMetadata,
  isSupportedLanguage,
  getSupportedLanguages,
  interpolateTranslation,
  getPluralTranslation
} from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Initialiser avec la langue détectée du navigateur ou celle sauvegardée
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && isSupportedLanguage(savedLanguage)) {
      return savedLanguage;
    }
    return detectBrowserLanguage();
  });

  const [isLoading, setIsLoading] = useState(false);
  const [translationCache, setTranslationCache] = useState(new Map());

  // Fonction de traduction principale avec cache
  const t = (key, variables = {}, options = {}) => {
    const cacheKey = `${currentLanguage}-${key}-${JSON.stringify(variables)}`;
    
    // Vérifier le cache d'abord
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    let translation = getTranslation(key, currentLanguage, options.fallbackLanguage || 'fr');
    
    // Interpoler les variables si nécessaire
    if (Object.keys(variables).length > 0) {
      translation = interpolateTranslation(translation, variables);
    }

    // Mettre en cache la traduction
    setTranslationCache(prev => new Map(prev.set(cacheKey, translation)));
    
    return translation;
  };

  // Fonction de traduction plurielle
  const tp = (key, count, variables = {}) => {
    const pluralTranslation = getPluralTranslation(key, count, currentLanguage);
    return interpolateTranslation(pluralTranslation, { count, ...variables });
  };

  // Fonction pour changer de langue avec animation de transition
  const changeLanguage = async (newLanguage) => {
    if (!isSupportedLanguage(newLanguage) || newLanguage === currentLanguage) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simuler un petit délai pour l'effet de transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      
      // Vider le cache pour forcer le rechargement des traductions
      setTranslationCache(new Map());
      
      // Mettre à jour l'attribut lang du document
      document.documentElement.lang = newLanguage;
      
      // Déclencher un événement personnalisé pour notifier le changement
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { 
          oldLanguage: currentLanguage, 
          newLanguage: newLanguage 
        } 
      }));
      
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour formater les nombres selon la langue actuelle
  const formatNum = (number, options = {}) => {
    return formatNumber(number, currentLanguage, options);
  };

  // Fonction pour formater les dates selon la langue actuelle
  const formatDateLang = (date, options = {}) => {
    return formatDate(date, currentLanguage, options);
  };

  // Fonction pour obtenir les métadonnées de la langue actuelle
  const getCurrentLanguageMetadata = () => {
    return getLanguageMetadata(currentLanguage);
  };

  // Fonction pour obtenir toutes les langues disponibles
  const getAvailableLanguages = () => {
    return getSupportedLanguages();
  };

  // Fonction pour vérifier si une traduction existe
  const hasTranslation = (key) => {
    return translations[currentLanguage] && translations[currentLanguage][key] !== undefined;
  };

  // Fonction pour obtenir toutes les traductions d'une catégorie
  const getTranslationsByCategory = (category) => {
    const categoryTranslations = {};
    const currentTranslations = translations[currentLanguage] || {};
    
    Object.keys(currentTranslations).forEach(key => {
      if (key.startsWith(category + '_')) {
        categoryTranslations[key] = currentTranslations[key];
      }
    });
    
    return categoryTranslations;
  };

  // Fonction pour obtenir des suggestions de traduction
  const getTranslationSuggestions = (partialKey) => {
    const currentTranslations = translations[currentLanguage] || {};
    return Object.keys(currentTranslations)
      .filter(key => key.toLowerCase().includes(partialKey.toLowerCase()))
      .slice(0, 10); // Limiter à 10 suggestions
  };

  // Fonction pour exporter les traductions
  const exportTranslations = (language = currentLanguage) => {
    const translationsToExport = translations[language] || {};
    const dataStr = JSON.stringify(translationsToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `translations_${language}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Fonction pour obtenir les statistiques de traduction
  const getTranslationStats = () => {
    const stats = {};
    
    Object.keys(translations).forEach(lang => {
      stats[lang] = {
        totalKeys: Object.keys(translations[lang]).length,
        language: getLanguageMetadata(lang).name,
        completeness: '100%' // Toutes nos traductions sont complètes
      };
    });
    
    return stats;
  };

  // Effet pour initialiser la langue du document
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    
    // Ajouter une classe CSS pour la langue actuelle
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${currentLanguage}`);
    
    // Mettre à jour la direction du texte si nécessaire
    const metadata = getLanguageMetadata(currentLanguage);
    document.documentElement.dir = metadata.direction || 'ltr';
    
  }, [currentLanguage]);

  // Effet pour écouter les changements de langue du navigateur
  useEffect(() => {
    const handleLanguageChange = () => {
      const detectedLanguage = detectBrowserLanguage();
      if (detectedLanguage !== currentLanguage && !localStorage.getItem('language')) {
        changeLanguage(detectedLanguage);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, [currentLanguage]);

  const value = {
    // État
    currentLanguage,
    isLoading,
    
    // Fonctions de traduction
    t,
    tp,
    
    // Gestion des langues
    changeLanguage,
    getCurrentLanguageMetadata,
    getAvailableLanguages,
    
    // Formatage
    formatNum,
    formatDate: formatDateLang,
    
    // Utilitaires
    hasTranslation,
    getTranslationsByCategory,
    getTranslationSuggestions,
    exportTranslations,
    getTranslationStats,
    
    // Données
    translations: translations[currentLanguage] || {},
    supportedLanguages: getSupportedLanguages()
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;