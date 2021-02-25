import { GetterTree } from 'vuex';
import { State } from './state';

interface GetterProp {
  isLogin: boolean;
  searchWhat: string;
}

const getters: GetterTree<State, GetterProp> = {
  // 侧边栏状态
  isLogin(state: State): boolean {
    return state.userInfo !== null;
  },

  // 返回搜索框内容
  searchWhat(state: State): string {
    return state.searchContent;
  },
};
export default getters;
