import { UserInfo } from '@/utils/http/user/getInfo';
import { GoodProp } from '@/utils/http/good/goodList';
import { getUserInfoByLocal } from '@/utils/userInfoLocal';

export interface CartProp extends GoodProp {
  num: number;
  orderType: 'buy' | 'rent';
}

export interface State {
  /**
   * @description 用户信息,未登陆时是 null
   * */
  userInfo: UserInfo | null;
  /**
   * 是否登录
   * */
  isLogin: boolean;
  /**
   * 搜索框内容
   * */
  searchContent: string;
  /**
   * 购物车商品
   * 暂存于localStorage
   */
  cartGoods: CartProp[];
}

export const state: State = {
  userInfo: getUserInfoByLocal(),
  isLogin: false,
  searchContent: '',
  cartGoods: [],
};
