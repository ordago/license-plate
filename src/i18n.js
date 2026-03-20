import { createI18n } from 'vue-i18n'
import { lang } from './lang.js'
export const  i18n = createI18n({
    legacy: false,
    allowComposition: true,
    messages: lang,
    fallbackLocale: 'es',
    locale: navigator.language || 'es',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    fallbackWarn: false,
    missingWarn: false,
})