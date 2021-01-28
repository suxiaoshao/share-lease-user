import { GetterTree } from 'vuex';
import { State } from './state';

interface GetterProp {
  leftBarState: boolean;
}

const getters: GetterTree<State, GetterProp> = {
  // 侧边栏状态
  leftBarState(state: State): boolean {
    return state.leftBarState;
  },
};
export default getters;
