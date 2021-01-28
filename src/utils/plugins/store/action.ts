export default {
  asyncAdd(context: any, paylod: any) {
    setTimeout(() => {
      context.commit('add', paylod.num);
    }, 1000);
  },
};
