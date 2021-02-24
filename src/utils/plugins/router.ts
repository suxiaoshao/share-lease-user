import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../../views/About.vue'),
  },
  {
    path: '/userInfo',
    name: 'User',
    component: () => import('../../views/UserInfo.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../../views/SearchResult.vue'),
  },
  {
    path: '*',
    name: '404',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * 添加路由守卫
 * */
router.beforeEach((to, from, next) => {
  /**
   * 未登陆时不显示
   * */
  if (to.name === 'User' && store.state.userInfo === null) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
