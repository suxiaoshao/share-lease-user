import Vue from 'vue';
import App from './App.vue';
import router from './utils/plugins';
import vuetify from './utils/plugins/vuetify';
import store from './utils/plugins/store/index';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
