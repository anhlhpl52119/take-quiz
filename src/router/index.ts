import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '@enum/routesEnum';
import type { RouteRecordRaw, Router, RouterHistory } from 'vue-router';
import Layoutt from '@/layout/index.vue';
// import { verifyUser } from '@/apis/auth';

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
      },
      {
        path: '/create-study-set',
        name: RouteName.CreateCollection,
        component: () =>
          import('@/views/dynamic/createUpdateCollection/index.vue'),
        meta: { title: 'Create Study Set' },
      },
      {
        path: '/collection/:id',
        name: RouteName.CollectionDetails,
        component: () => import('@/views/dynamic/studyCard/index.vue'),
        props: (route) => ({ collectionId: route.params.id as string }),

        meta: { title: 'Study Card' },
      },
      {
        path: '/collection/:id/update',
        name: RouteName.UpdateCollection,
        component: () =>
          import('@/views/dynamic/createUpdateCollection/index.vue'),
        props: (route) => ({ collectionId: route.params.id as string }),

        meta: { title: 'Study Card' },
      },
      {
        path: '/user/:userId',
        name: RouteName.UserIdProfile,
        component: () => import('@/views/dynamic/studyCard/index.vue'),
        meta: { title: 'Hellooo' },
      },
      {
        path: '/my-profile',
        name: RouteName.MyProfile,
        component: () => import('@/views/dynamic/myProfile/index.vue'),
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
    component: () => import('@/views/dynamic/testSession/index.vue'),
    props: (route) => ({ collectionId: route.params.id }),
    meta: { title: 'Hellooo' },
  },
  {
    path: '/collection/:id/study',
    name: RouteName.StudySession,
    component: () => import('@/views/dynamic/studySession/index.vue'),
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

router.beforeEach((to, from, next) => {
  next();
});
export default router;
