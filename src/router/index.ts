import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '@enum/routesEnum';
import type { RouteRecordRaw, Router, RouterHistory } from 'vue-router';
import Layoutt from '@/layout/index.vue';
import Storage from '@/utils/Storage';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.HomePage,
    redirect: '/login',
  },
  {
    path: '/login',
    name: RouteName.LoginPage,
    component: () => import('@/views/static/login/index.vue'),
  },
  {
    path: '/home',
    component: Layoutt,
    redirect: '/about',
    meta: {
      title: 'HomePage',
      hideInMenu: true,
    },
    children: [
      {
        path: '/about',
        name: RouteName.AboutPage,
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'About' },
        beforeEnter: () => {
          console.log('token before', Storage.get(ACCESS_TOKEN_KEY));
        },
      },
      {
        path: '/create-collection',
        name: RouteName.CreateCollection,
        component: () =>
          import(
            /* webpackChunkName: "collection-gr" */ '@/views/dynamic/createUpdateCollection/index.vue'
          ),
        meta: { title: 'Create Study Set' },
      },
      {
        path: '/collection/:id',
        name: RouteName.CollectionDetails,
        component: () =>
          import(
            /* webpackChunkName: "collection-gr" */ '@/views/dynamic/studyCard/index.vue'
          ),
        props: (route) => ({ collectionId: route.params.id as string }),

        meta: { title: 'Study Card' },
      },
      {
        path: '/collection/:id/update',
        name: RouteName.UpdateCollection,
        component: () =>
          import(
            /* webpackChunkName: "collection-gr" */ '@/views/dynamic/createUpdateCollection/index.vue'
          ),
        props: (route) => ({ collectionId: route.params.id as string }),

        meta: { title: 'Study Card' },
      },
      {
        path: '/user/:userId',
        name: RouteName.UserIdProfile,
        component: () =>
          import(
            /* webpackChunkName: "user-gr" */ '@/views/dynamic/studyCard/index.vue'
          ),
        meta: { title: 'Hellooo' },
      },
      {
        path: '/my-profile',
        name: RouteName.MyProfile,
        component: () =>
          import(
            /* webpackChunkName: "user-gr" */ '@/views/dynamic/myProfile/index.vue'
          ),
        meta: { title: 'Hellooo' },
      },
      {
        path: '/:pathMatch(.*)*',
        name: RouteName.NotFound,
        component: () => import('@/views/error/404.vue'),
        meta: { title: 'Hellooo' },
      },
    ],
  },
  {
    path: '/collection/:id/test',
    name: RouteName.TestSession,
    component: () =>
      import(
        /* webpackChunkName: "test-session" */ '@/views/dynamic/testSession/index.vue'
      ),
    props: (route) => ({ collectionId: route.params.id }),
    meta: { title: 'Hellooo' },
  },
  {
    path: '/collection/:id/study',
    name: RouteName.StudySession,
    component: () =>
      import(
        /* webpackChunkName: "study-session" */ '@/views/dynamic/studySession/index.vue'
      ),
    props: (route) => ({ collectionId: route.params.id }),
    meta: { title: 'Hellooo' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFousssnd',
    component: () => import('@/views/error/404.vue'),
  },
];

const history: RouterHistory = createWebHistory();

export const router: Router = createRouter({
  history,
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log('bebore router');
//   next();
// });
// router.beforeResolve(() => {
//   console.log('resolve router');
//   console.log('tokekn is: ', Storage.get(ACCESS_TOKEN_KEY));
// });
export default router;
