import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupAntd, setupStore, setupDayjs } from '@/plugins';
import '@/styles/index.less';

const app = createApp(App);
app.use(router);

function setupPlugins() {
  setupAntd(app);
  setupStore(app);
  setupDayjs(app);
}
setupPlugins();
app.mount('#app');
