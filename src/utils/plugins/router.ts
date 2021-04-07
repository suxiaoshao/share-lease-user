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
    path: '/good/*',
    name: 'Good',
    component: () => import('../../views/Good.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../../views/Orders.vue'),
    children: [
      {
        path: '/orders/detail',
        name: 'OrderDetail',
        component: () => import('@/components/orders/orderDetail/orderDetail.vue'),
        children: [
          {
            path: '/orders/detail/buy',
            name: 'OrderBuy',
            component: () => import('../../components/orders/orderDetail/orderBuy.vue'),
          },
          {
            path: '/orders/detail/rent',
            name: 'OrderRent',
            component: () => import('../../components/orders/orderDetail/orderRent.vue'),
          },
        ],
      },
      {
        path: '/orders/opt',
        name: 'OrderOpt',
        component: () => import('@/components/orders/orderOpt/orderOpt.vue'),
        children: [
          {
            path: '/orders/opt/create',
            name: 'OrderOptCreate',
            component: () => import('@/components/orders/orderOpt/createOrder.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/buyCar',
    name: 'BuyCar',
    component: () => import('../../views/BuyCar.vue'),
    children: [
      {
        path: '/buyCar/buy',
        name: 'BuyCarBuy',
        component: () => import('../../components/buyCar/buyCarBuy.vue'),
      },
      {
        path: '/buyCar/rent',
        name: 'BuyCarRent',
        component: () => import('../../components/buyCar/buyCarRent.vue'),
      },
    ],
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
 * 未登录时不允许访问的页面
 * */
export const afterLoginPage = ['User', 'Orders', 'BuyCar'];
/**
 * 添加路由守卫
 * */
router.beforeEach((to, from, next) => {
  /**
   * 未登陆时不显示
   * */
  if (afterLoginPage.includes(to.name ?? '*') && !store.getters.isLogin) {
    console.log(!store.getters.isLogin);
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
