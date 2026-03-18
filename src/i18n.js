// i18n.js
import { createI18n } from 'vue-i18n'
import { lang } from './lang.js'

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language || 'es',
  fallbackLocale: 'es',
  messages: lang,
  globalInjection: true,
})