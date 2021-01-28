<template>
  <v-app color="black" style="width: 100vw">
    <navBar class="normal-setting"></navBar>
    <mainPageContent class="normal-setting"></mainPageContent>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import navBar from './components/navBar.vue';
import mainPageContent from './components/mainPageContent.vue';

export default Vue.extend({
  name: 'App',

  components: {
    // HelloWorld,
    navBar,
    mainPageContent,
  },
  data: () => ({
    showOverlay: false,
  }),

  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
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
