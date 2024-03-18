import en from '../src/locales/en.json'
import pl from '../src/locales/pl.json'
import ru from '../src/locales/ru.json'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: en
  },
  pl: {
    translation: pl
  },
  ru: {
    translation: ru
  }
};

export default i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language'),
    fallbackLng: 'en'
  });
