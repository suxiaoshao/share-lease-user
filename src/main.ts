import Vue from 'vue';
import App from './App.vue';
import router from './utils/plugins/router';
import vuetify from './utils/plugins/vuetify';
import store from './utils/store/index';
import { initUserInfoByLocal } from '@/utils/userInfoLocal';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

initUserInfoByLocal();
