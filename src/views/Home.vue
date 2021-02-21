<template>
  <v-app color="black" class="page" id="v-app-root">
    <navBar class="normal-setting"></navBar>
    <mainPageContent class="normal-setting"></mainPageContent>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import navBar from '../components/common/navBar/navBar.vue';
import mainPageContent from '../components/home/mainPageContent.vue';

interface HomeState {
  showOverlay: boolean;
}

export default Vue.extend<HomeState, {}, {}, {}>({
  name: 'Home',

  components: {
    navBar,
    mainPageContent,
  },
});
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  .normal-setting {
    width: 70%;
    @media screen and (max-width: 1260px) {
      width: 100%;
    }
  }
}
</style>
