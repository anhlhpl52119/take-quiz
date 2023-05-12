import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import type { App } from 'vue';
import 'dayjs/locale/vi';

export function setupDayjs(app: App<Element>) {
  dayjs.extend(isLeapYear); // use leapYear
  dayjs.locale('vi'); // use locale
  app.config.globalProperties.$dayjs = dayjs;
}
