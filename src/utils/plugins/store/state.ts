import { UserInfo } from '@/utils/http/getInfo';

export interface State {
  userInfo: UserInfo | null;
  isLogin: boolean;
}

export const state: State = {
  userInfo: null,
  isLogin: false,
};
