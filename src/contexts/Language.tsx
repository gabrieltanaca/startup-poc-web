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

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang ?? 'pt');

  useEffect(() => {
    try {
      const storedLang =
        typeof window !== 'undefined'
          ? (localStorage.getItem('app_language') as Language | null)
          : null;
      if (storedLang && storedLang !== lang) {
        setLangState(storedLang);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app_language', lang);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.cookie = `app_language=${lang}; path=/`;
    }
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
