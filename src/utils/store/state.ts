import { UserInfo } from '@/utils/http/getInfo';

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
   * 搜索框内容
   * */
  searchWhat: string;
}

export const state: State = {
  userInfo: null,
  isLogin: false,
  searchContent: '',
  searchWhat: '',
};
