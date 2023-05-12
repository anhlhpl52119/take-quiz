import '@/styles/ant.less';
import Antd from 'ant-design-vue';
import type { App } from 'vue';

export function setupAntd(app: App<Element>) {
  app.use(Antd);
}
