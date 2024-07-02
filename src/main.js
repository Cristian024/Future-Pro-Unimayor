import './assets/styles/index.css'
import './assets/styles/main.css'
import router from './router';
import store from './store/index'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(store)

app.mount('#app');
