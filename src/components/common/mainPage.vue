<template>
  <v-app color="black" class="page">
    <navbar></navbar>
    <main>
      <slot></slot>
    </main>
    <buyCar class="buy-car" v-if="$store.getters.isLogin"></buyCar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import navbar from '@/components/common/navbar/navbar.vue';
import buyCar from '@/components/orders/buyCar.vue';

export default Vue.extend({
  name: 'main-page',
  components: {
    navbar,
    buyCar,
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

  .buy-car {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
