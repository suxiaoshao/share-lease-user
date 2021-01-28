import { State } from './state';

export default {
  openLeftBar(state: State): void {
    state.leftBarState = !state.leftBarState;
    console.log(state.leftBarState);
  },
};
