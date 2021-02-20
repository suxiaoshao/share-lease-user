import { State } from './state';
import { MutationTree } from 'vuex';
import { UserInfo } from '@/utils/http/getInfo';

const mutations: MutationTree<State> = {
  login(state: State, userInfo: UserInfo) {
    state.userInfo = userInfo;
  },
};

export default mutations;
