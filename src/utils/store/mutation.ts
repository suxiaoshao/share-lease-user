import { State } from './state';
import { MutationTree } from 'vuex';
import { UserInfo } from '@/utils/http/user/getInfo';

const mutations: MutationTree<State> = {
  login(state: State, userInfo: UserInfo | null) {
    if (userInfo !== null) {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      window.localStorage.removeItem('userInfo');
    }
    state.userInfo = userInfo;
  },
  searchGood(state: State, content: string) {
    state.searchContent = content;
  },
};

export default mutations;
