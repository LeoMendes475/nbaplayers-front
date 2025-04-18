import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";
import 'primeicons/primeicons.css';

import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'prime',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});
app.use(ToastService);

app.mount('#app');
