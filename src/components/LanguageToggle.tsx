import * as React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 left-6 rounded-full bg-card p-3 shadow-lg ring-primary/25 transition-all duration-300 hover:shadow-xl hover:ring-4"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium text-primary">
        {i18n.language.toUpperCase()}
      </span>
    </button>
  );
}; 