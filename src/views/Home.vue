<template>
  <main-page>
    <home-main class="normal-setting"></home-main>
  </main-page>
</template>

<script lang="ts">
import Vue from 'vue';
import homeMain from '../components/home/homeMain.vue';
import MainPage from '@/components/common/mainPage.vue';

interface HomeState {
  showOverlay: boolean;
}

export default Vue.extend<HomeState, {}, {}, {}>({
  name: 'Home',

  components: {
    MainPage,
    homeMain,
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
