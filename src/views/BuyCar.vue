<template>
  <div class="buy-cart-main">
    <MainPage>
      <buyCar></buyCar>
    </MainPage>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainPage from '@/components/common/mainPage.vue';
import BuyCar from '@/components/buyCar/buyCar.vue';

export default Vue.extend({
  name: 'buy-car',
  components: { MainPage, BuyCar },
});
</script>

<style scoped lang="scss">
.buy-cart-main {
  width: 100%;
  height: 100%;
  background-color: #a12a;
}
</style>
