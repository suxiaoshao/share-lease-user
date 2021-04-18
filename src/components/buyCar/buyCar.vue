<template>
  <!-- 购物车 -->
  <div class="cart">
    <v-container>
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab to="/buyCar/buy"> 购买 </v-tab>
        <v-tab to="/buyCar/rent"> 租赁 </v-tab>
      </v-tabs>
      <v-container> </v-container>
      <v-container> </v-container>
    </v-container>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CartProp } from '@/utils/store/state';

interface BuyCarState {
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
  /**
   * 购物车租赁金额
   */
  cartRentMoney: number;
  /**
   * 购物车购买金额
   */
  cartBuyMoney: number;
}

// interface BuyCarMehtod {}

export default Vue.extend<BuyCarState, {}, BuyCarComputed, {}>({
  name: 'buyCar',
  computed: {
    cartList() {
      return this.$store.state.cartGoods;
    },
    cartRentMoney() {
      return this.$store.state.cartRentMoney;
    },
    cartBuyMoney() {
      return this.$store.state.cartBuyMoney;
    },
  },
  mounted() {
    // init cart
    if (this.$store.getters.isLogin) {
      this.$store.commit('updateCartGoods', {
        good: null,
        method: 3,
      });
      this.$store.commit('cartMoneyCheck');
      console.log(this.$store.state.cartGoods);
    }
  },
  data: () => ({
    buyOrRent: 'buy',
  }),
});
</script>

<style lang="scss" scoped>
.cart {
  .bottom-sheet {
    position: relative;
  }
  .check-cart {
    position: fixed;
    right: 3rem;
    bottom: 3rem;
  }
}
</style>
