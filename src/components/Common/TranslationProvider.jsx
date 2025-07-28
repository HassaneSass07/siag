import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Composant pour fournir des traductions contextuelles à une section spécifique
export const TranslationProvider = ({ 
  children, 
  namespace = '', 
  fallbackLanguage = 'fr',
  loadingComponent = null 
}) => {
  const { 
    currentLanguage, 
    t: globalT, 
    tp: globalTp, 
    isLoading: globalLoading,
    getTranslationsByCategory,
    hasTranslation
  } = useLanguage();
  
  const [localTranslations, setLocalTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fonction de traduction avec namespace
  const t = (key, variables = {}, options = {}) => {
    const namespacedKey = namespace ? `${namespace}_${key}` : key;
    
    // Essayer d'abord avec le namespace
    if (hasTranslation(namespacedKey)) {
      return globalT(namespacedKey, variables, { fallbackLanguage, ...options });
    }
    
    // Fallback vers la clé sans namespace
    return globalT(key, variables, { fallbackLanguage, ...options });
  };

  // Fonction de traduction plurielle avec namespace
  const tp = (key, count, variables = {}) => {
    const namespacedKey = namespace ? `${namespace}_${key}` : key;
    
    if (hasTranslation(namespacedKey)) {
      return globalTp(namespacedKey, count, variables);
    }
    
    return globalTp(key, count, variables);
  };

  // Charger les traductions du namespace au changement de langue
  useEffect(() => {
    if (namespace) {
      setIsLoading(true);
      
      // Simuler un chargement asynchrone
      setTimeout(() => {
        const namespaceTranslations = getTranslationsByCategory(namespace);
        setLocalTranslations(namespaceTranslations);
        setIsLoading(false);
      }, 100);
    }
  }, [currentLanguage, namespace, getTranslationsByCategory]);

  const value = {
    t,
    tp,
    namespace,
    localTranslations,
    isLoading: isLoading || globalLoading,
    currentLanguage,
    fallbackLanguage
  };

  if (isLoading && loadingComponent) {
    return loadingComponent;
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook pour les traductions de formulaire
export const useFormTranslations = () => {
  const { t } = useLanguage();
  
  return {
    required: t('required_field'),
    invalidEmail: t('invalid_email'),
    passwordTooShort: t('password_too_short'),
    passwordsDontMatch: t('passwords_dont_match'),
    invalidPhone: t('invalid_phone'),
    invalidDate: t('invalid_date'),
    invalidNumber: t('invalid_number'),
    fieldTooLong: t('field_too_long'),
    fieldTooShort: t('field_too_short'),
    pleaseSelect: t('please_select'),
    save: t('save'),
    cancel: t('cancel'),
    submit: t('submit', {}, { fallbackLanguage: 'fr' }) || 'Soumettre',
    reset: t('reset')
  };
};

// Hook pour les traductions de statut
export const useStatusTranslations = () => {
  const { t } = useLanguage();
  
  return {
    loading: t('loading'),
    success: t('success'),
    error: t('error'),
    warning: t('warning'),
    info: t('info'),
    completed: t('completed'),
    failed: t('failed'),
    pending: t('pending'),
    approved: t('approved'),
    rejected: t('rejected'),
    active: t('active'),
    inactive: t('inactive'),
    online: t('online'),
    offline: t('offline')
  };
};

// Hook pour les traductions de navigation
export const useNavigationTranslations = () => {
  const { t } = useLanguage();
  
  return {
    home: t('home'),
    dashboard: t('dashboard'),
    map: t('map'),
    data: t('data'),
    profile: t('profile'),
    about: t('about'),
    settings: t('settings'),
    help: t('help'),
    login: t('login'),
    logout: t('logout'),
    back: t('back', {}, { fallbackLanguage: 'fr' }) || 'Retour',
    next: t('next', {}, { fallbackLanguage: 'fr' }) || 'Suivant',
    previous: t('previous', {}, { fallbackLanguage: 'fr' }) || 'Précédent'
  };
};

// Hook pour les traductions de données
export const useDataTranslations = () => {
  const { t } = useLanguage();
  
  return {
    regions: t('regions'),
    population: t('population'),
    area: t('area'),
    density: t('density'),
    educationAccess: t('education_access'),
    healthAccess: t('health_access'),
    waterAccess: t('water_access'),
    electricityAccess: t('electricity_access'),
    statistics: t('statistics'),
    indicators: t('indicators'),
    analysis: t('analysis'),
    comparison: t('comparison'),
    trends: t('trends'),
    noData: t('no_data'),
    noResults: t('no_results')
  };
};

export default TranslationProvider;