'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import { DropdownOption } from '@/components/Dropdown';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (typeof translations)['pt'];
  langOptions: DropdownOption[];
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  setLang: () => {},
  t: translations.pt,
  langOptions: [],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('app_language') as Language;
      return storedLang || 'pt';
    }
    return 'pt';
  });

  useEffect(() => {
    localStorage.setItem('app_language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = translations[lang];

  const langOptions: DropdownOption[] = Object.entries(translations).map(([key, value]) => ({
    label: value.lang.name,
    value: key,
  }));

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, langOptions }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
