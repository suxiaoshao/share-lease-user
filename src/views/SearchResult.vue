<template>
  <v-app color="black" class="page" id="v-app-root">
    <navBar class="normal-setting"></navBar>
    <searchResultContent></searchResultContent>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import searchResultContent from '@/components/search/searchResultContent.vue';
import NavBar from '@/components/common/navBar/navBar.vue';

export default Vue.extend({
  name: 'UserInfo',
  components: { NavBar, searchResultContent },
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
