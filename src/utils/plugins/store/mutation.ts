import { State } from './state';
import { MutationTree } from 'vuex';

const mutations: MutationTree<State> = {
  openLeftBar(state: State): void {
    state.leftBarState = !state.leftBarState;
    console.log(state.leftBarState);
  },
};

export default mutations;
