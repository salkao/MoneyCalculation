import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/scss/app.scss';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();

// use this plugin to persist the state of the store
pinia.use(piniaPersist);
app.use(router);
app.use(pinia);
app.mount('#app');
