import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './i18n';

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('lumina-lang') === 'en' ? 'en' : 'pt';
    } catch {
      return 'pt';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumina-lang', lang);
    } catch {
      // ignorar
    }
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
  }, [lang]);

  const setLang = (l) => setLangState(l === 'en' ? 'en' : 'pt');

  const t = (key) => {
    const value = translations[lang] && translations[lang][key];
    if (value !== undefined) return value;
    return translations.pt[key] !== undefined ? translations.pt[key] : key;
  };

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
