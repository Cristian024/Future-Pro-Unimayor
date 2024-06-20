import './assets/styles/index.css'
import './assets/styles/main.css'
import router from './router';

import { createApp } from 'vue'
import App from './App.vue'

console.log(import.meta.env);

const app = createApp(App);

app.use(router);

app.mount('#app');
