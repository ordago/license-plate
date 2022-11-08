import { createI18n } from 'vue-i18n/index.js'
import { lang } from './lang.js'
export const  i18n = createI18n({
    messages: lang,
    fallbackLocale: 'es',
    locale: navigator.language || 'es',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    fallbackWarn: false,
    missingWarn: false,
})