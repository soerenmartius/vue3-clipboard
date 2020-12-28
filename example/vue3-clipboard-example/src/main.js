import { createApp } from 'vue'
import App from './App.vue'
import VueClipboard from '@soerenmartius/vue3-clipboard'
import './index.css'

createApp(App).use(VueClipboard).mount('#app')
