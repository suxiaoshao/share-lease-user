<template>
  <v-app color="black" class="page" id="v-app-root">
    <nav-bar class="normal-setting"></nav-bar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '@/components/common/navBar/navBar.vue';

export default Vue.extend({
  name: 'UserInfo',
  components: { NavBar },
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
