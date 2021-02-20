import { GetterTree } from 'vuex';
import { State } from './state';

interface GetterProp {
  isLogin: boolean;
}

const getters: GetterTree<State, GetterProp> = {
  // 侧边栏状态
  isLogin(state: State): boolean {
    return state.userInfo !== null;
  },
};
export default getters;
