import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vant from 'vant'
import 'vant/lib/index.css'
import { createI18n } from 'vue-i18n'
import messages from './i18n/index'
// @ts-ignore
import App from './App.vue'


const I18n = createI18n({
  locale: 'cn', // set locale
  fallbackLocale: 'us', // set fallback locale
  messages, // set locale messages
})

const app = createApp(App);
app.use(createPinia());
app.use(Vant);
app.use(I18n);
app.mount('#app');
