import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import frTranslation from "./locales/fr.json";
import deTranslation from "./locales/de.json";
import itTranslation from "./locales/it.json";
import ptTranslation from "./locales/pt.json";
import ruTranslation from "./locales/ru.json";
import zhTranslation from "./locales/zh.json";
import jaTranslation from "./locales/ja.json";
import koTranslation from "./locales/ko.json";
import nlTranslation from "./locales/nl.json";
import svTranslation from "./locales/sv.json";
import noTranslation from "./locales/no.json";
import daTranslation from "./locales/da.json";
import fiTranslation from "./locales/fi.json";
import plTranslation from "./locales/pl.json";

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  it: { translation: itTranslation },
  pt: { translation: ptTranslation },
  ru: { translation: ruTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  nl: { translation: nlTranslation },
  sv: { translation: svTranslation },
  no: { translation: noTranslation },
  da: { translation: daTranslation },
  fi: { translation: fiTranslation },
  pl: { translation: plTranslation }
};

const userLanguage = navigator.language.split('-')[0]; // Detect the user's language

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage, // Set the detected language
    interpolation: { escapeValue: false }
  });

export default i18n;
