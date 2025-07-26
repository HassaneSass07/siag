import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};