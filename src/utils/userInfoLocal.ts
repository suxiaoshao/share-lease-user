import { getInfo, UserInfo } from '@/utils/http/user/getInfo';
import store from './store';

/**
 * @description 浏览器 localStorage 中读取数据
 * */
export function initUserInfoByLocal(): void {
  const userInfoStr = window.localStorage.getItem('userInfo');
  if (userInfoStr !== null) {
    const userInfo = JSON.parse(userInfoStr) as UserInfo;
    getInfo(userInfo.uid)
      .then((value) => {
        store.commit('login', value);
      })
      .catch(() => {
        window.localStorage.removeItem('userInfo');
      });
  }
}
