import i18next, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import he from './locales/he.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

export const SUPPORTED_LOCALES = ['en', 'he', 'es', 'fr'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type ResourceLocale = {
  translation: Record<string, any>;
};

const resources: Record<string, ResourceLocale> = {
  en: { translation: en },
  he: { translation: he },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
};

let initialized = false;

export const i18n: I18nInstance = i18next;

export function initI18n(defaultLocale: string = 'en') {
  if (!initialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: defaultLocale,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
    initialized = true;
  } else if (defaultLocale) {
    void i18n.changeLanguage(defaultLocale);
  }
  return i18n.language;
}

export function setLocale(nextLocale: string) {
  const locale = nextLocale || 'en';
  void i18n.changeLanguage(locale);
  return i18n.language;
}

export function getCurrentLocale() {
  return i18n.language || 'en';
}

export function getBestDeviceLocale(): SupportedLocale {
  const locales = Localization.getLocales?.() ?? [];
  const primary = locales[0]?.languageCode?.toLowerCase() ?? 'en';
  if ((SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
    return primary as SupportedLocale;
  }
  return 'en';
}

export const AVAILABLE_LANGUAGES: { code: SupportedLocale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

// Initialize once with default English; App state will switch as needed.
initI18n('en');
