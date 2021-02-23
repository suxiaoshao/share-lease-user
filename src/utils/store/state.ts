import { UserInfo } from '@/utils/http/getInfo';

export interface State {
  userInfo: UserInfo | null;
  isLogin: boolean;
  searchContent: string;
  searchWhat: string;
}

export const state: State = {
  userInfo: null,
  isLogin: false,
  searchContent: '',
  searchWhat: '',
};
