import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Germany from '@src/assets/locales/De.json';
import English from '@src/assets/locales/En.json';

export const defaultNS = 'ns1';
export const resources = { en: { ns1: English }, de: { ns1: Germany } } as const;

i18n.use(initReactI18next).init({ lng: localStorage.getItem('lang') || 'de', ns: [defaultNS], resources });

export default i18n;
