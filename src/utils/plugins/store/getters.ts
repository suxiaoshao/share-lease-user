import { GetterTree } from 'vuex';
import { State } from './state';

const getters: GetterTree<State, any> = {
  // 侧边栏状态
  leftBarState(state: any): void {
    return state.leftBarState;
  },
};
export default getters;
