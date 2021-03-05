<template>
  <!-- 购物车 -->
  <div style="width: 200px" class="cart">
    <v-btn color="blue" dark @click="sheet = !sheet" max-width="200">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet style="padding: 1rem 1rem 4rem" class="text-center bottom-sheet" height="500px">
        <h3 style="position: absolute; left: 49%">购物车</h3>
        <!-- expend items -->
        <v-container>
          <v-row dense style="overflow-y: scroll; height: 350px; margin-top: 1.5rem">
            <v-col v-for="(item, i) in cartList" :key="i" cols="6">
              <buy-cat-item :itemProp="item"></buy-cat-item>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import buyCatItem from '@/components/buyCar/buyCarItem.vue';
import { CartProp } from '@/utils/store/state';

interface BuyCarState {
  /**
   * 打开购物车
   */
  sheet: boolean;
  /**
   * 订单类型
   */
  buyOrRent: 'buy' | 'rent';
}

interface BuyCarComputed {
  /**
   * 购物车列表
   */
  cartList: CartProp[];
}

export default Vue.extend<BuyCarState, {}, BuyCarComputed, {}>({
  name: 'buyCar',
  components: {
    buyCatItem,
  },
  computed: {
    cartList() {
      return this.$store.state.cartGoods;
    },
  },
  mounted() {
    // init cart
    if (this.$store.getters.isLogin) {
      this.$store.commit('updateCartGoods', {
        good: null,
        method: 3,
      });
      console.log(this.$store.state.cartGoods);
    }
  },
  data: () => ({
    sheet: false,
    buyOrRent: 'buy',
  }),
});
</script>

<style lang="scss" scoped>
.cart {
  .bottom-sheet {
    position: relative;

    .close-cart {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
}
</style>
