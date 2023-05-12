import { useRouter } from 'vue-router';
const router = useRouter();
/**
 * @description push to page without import useRouter
 * @param {string} routeName URL
 */
export function pushToRoute(routeName: string) {
  router.push({ name: routeName });
}

/**
 * @description replace to page without import useRouter
 * @param {string} routeName URL
 */
export function replaceToRoute(routeName: string) {
  return router.replace({ name: routeName });
}
