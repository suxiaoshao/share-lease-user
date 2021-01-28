import { ActionContext, ActionTree } from 'vuex';
import { State } from '@/utils/plugins/store/state';

const actions: ActionTree<State, {}> = {
  asyncAdd(context: ActionContext<State, {}>, payload: { num: number }) {
    setTimeout(() => {
      context.commit('add', payload.num);
    }, 1000);
  },
};

export default actions;
