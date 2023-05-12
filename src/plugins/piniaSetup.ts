import { createPinia } from 'pinia';
import type { App } from 'vue';

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  // pinia.use(({ store }) => {
  //   store.router = markRaw(router);
  // });
  app.use(pinia);
}

export { pinia as store };
