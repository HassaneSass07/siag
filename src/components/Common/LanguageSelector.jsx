import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSelector = ({ 
  variant = 'dropdown', // 'dropdown', 'buttons', 'minimal'
  showFlag = true,
  showName = true,
  className = '',
  position = 'bottom-right' // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
}) => {
  const { 
    currentLanguage, 
    changeLanguage, 
    getAvailableLanguages, 
    isLoading,
    t 
  } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = async (languageCode) => {
    if (languageCode !== currentLanguage) {
      await changeLanguage(languageCode);
      setIsOpen(false);
    }
  };

  const currentLangData = availableLanguages.find(lang => lang.code === currentLanguage);

  // Position classes for dropdown
  const positionClasses = {
    'bottom-right': 'right-0 mt-2',
    'bottom-left': 'left-0 mt-2',
    'top-right': 'right-0 mb-2 bottom-full',
    'top-left': 'left-0 mb-2 bottom-full'
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentLanguage === lang.code
                ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-2 ring-orange-200 dark:ring-orange-800'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {showFlag && <span className="text-lg">{lang.flag}</span>}
            {showName && <span>{lang.nativeName}</span>}
            {currentLanguage === lang.code && <Check className="h-4 w-4" />}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
              currentLanguage === lang.code
                ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-2 ring-orange-200 dark:ring-orange-800'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={lang.nativeName}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        title={t('change_language')}
        aria-label={t('change_language')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
        ) : (
          <Globe className="h-5 w-5" />
        )}
        
        {showFlag && currentLangData && (
          <span className="text-lg">{currentLangData.flag}</span>
        )}
        
        {showName && currentLangData && (
          <span className="hidden sm:inline text-sm font-medium">
            {currentLangData.nativeName}
          </span>
        )}
        
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`absolute z-20 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 ${positionClasses[position]}`}>
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('change_language')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('select_preferred_language', {}, { fallbackLanguage: 'fr' }) || 'Sélectionnez votre langue préférée'}
              </p>
            </div>
            
            <div className="py-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isLoading}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group ${
                    currentLanguage === lang.code 
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <div className="font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {lang.name} • {lang.speakers}
                      </div>
                    </div>
                  </div>
                  
                  {currentLanguage === lang.code && (
                    <Check className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer avec informations */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('translation_help', {}, { fallbackLanguage: 'fr' }) || 'Aidez-nous à améliorer les traductions'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;