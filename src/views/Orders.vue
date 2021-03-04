<template>
  <main-page>
    <orderMain class="normal-setting"></orderMain>
  </main-page>
</template>

<script lang="ts">
import Vue from 'vue';
import orderMain from '../components/orders/ordersMain.vue';
import MainPage from '@/components/common/mainPage.vue';

interface HomeState {
  showOverlay: boolean;
}

export default Vue.extend<HomeState, {}, {}, {}>({
  name: 'Home',

  components: {
    MainPage,
    orderMain,
  },
});
</script>

<style lang="scss" scoped>
.normal-setting {
  width: 100%;
  @media screen and (min-width: 960px) {
    padding: 0 15% 0 15%;
  }
  @media screen and (min-width: 1260px) {
    padding: 0 20% 0 20%;
  }
  overflow: auto;
  height: 100%;
}
</style>
