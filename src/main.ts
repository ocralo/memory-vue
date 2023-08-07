import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/config/i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
