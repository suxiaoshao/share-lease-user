import { getUserAddress } from '@/utils/http/user/getAddress';
import store from './store';

/**
 * @description 获取用户所有地址 并初始化
 */
export function initUserAddressList(): void {
  getUserAddress()
    .then((res) => {
      console.log('user adress');
      console.log(res);
      store.commit('updateUserAddress', {
        method: -1,
        address: res,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
