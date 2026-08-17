"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "tr";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.collections": "Collections",
    "hero.title": "Strata Collection",
    "hero.subtitle": "Transforming glass into a language of light, color, and form.",
    "footer.rights": "© 2026 Aurum Design Studio. All rights reserved.",
    "intro.text": "A seamless integration of light, form, and space. Our architecture focuses on the elemental connection between environment and structure, creating timeless spaces."
  },
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımızda",
    "nav.projects": "Projeler",
    "nav.blog": "Blog",
    "nav.contact": "İletişim",
    "nav.collections": "Koleksiyonlar",
    "hero.title": "Strata Koleksiyonu",
    "hero.subtitle": "Camı ışık, renk ve formun diline dönüştürüyoruz.",
    "footer.rights": "© 2026 Aurum Design Studio. Tüm hakları saklıdır.",
    "intro.text": "Işık, form ve mekanın kusursuz birleşimi. Mimarlığımız, çevre ve yapı arasındaki temel bağa odaklanarak zamansız mekanlar yaratır."
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
