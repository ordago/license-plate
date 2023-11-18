import { createApp } from 'vue'

window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments)
}

import App from './App.vue'
import './index.css'
import { i18n} from './i18n.js';

const app = createApp(App)
app.use(i18n)
app.mount('#app')
