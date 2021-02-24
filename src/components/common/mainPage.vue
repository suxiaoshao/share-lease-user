<template>
  <v-app color="black" class="page">
    <navbar></navbar>
    <main>
      <slot></slot>
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import navbar from '@/components/common/navbar/navbar.vue';

export default Vue.extend({
  name: 'main-page',
  components: {
    navbar,
  },
});
</script>

<style scoped lang="scss">
.page {
  width: 100vw;

  main {
    margin-top: 64px;
    height: calc(100% - 64px);
    width: 100%;
  }
}
</style>
