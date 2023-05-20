import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupAntd, setupStore, setupDayjs } from '@/plugins';
import '@/styles/index.less';

const app = createApp(App);

function setupPlugins() {
  setupAntd(app);
  setupStore(app);
  setupDayjs(app);
}
async function SetupRouter() {
  app.use(router);
  await router.isReady();
  app.mount('#app');
}
setupPlugins();
await SetupRouter();
