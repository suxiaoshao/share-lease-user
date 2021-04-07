import store from './store';

/**
 * @description 获取用户购物车信息并初始化
 */
export function initUserCarts(): void {
  store.commit('updateCartGoods', {
    method: 3,
  });
}
