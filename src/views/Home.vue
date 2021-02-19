<template>
  <v-app color="black" style="width: 100vw" id="v-app-root">
    <navBar class="normal-setting"></navBar>
    <mainPageContent class="normal-setting"></mainPageContent>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import navBar from '../components/navBar.vue';
import mainPageContent from '../components/mainPageContent.vue';

interface HomeState {
  showOverlay: boolean;
}

export default Vue.extend<HomeState, {}, {}, {}>({
  name: 'Home',

  components: {
    navBar,
    mainPageContent,
  },
  data: () => ({
    showOverlay: false,
  }),

  watch: {
    showOverlay: function () {
      window.setTimeout(() => {
        this.showOverlay = false;
      }, 2000);
    },
  },
});
</script>

<style>
.normal-setting {
  width: 70%;
}

@media screen and (max-device-width: 1260px) {
  .normal-setting {
    width: 100%;
  }
}
</style>
