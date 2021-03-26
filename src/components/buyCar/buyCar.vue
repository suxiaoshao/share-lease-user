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
import { createBugOrder } from '@/utils/http/order/createBugOrder';
import { createRentOrder } from '@/utils/http/order/createRentOrder';
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

interface BuyCarMehtod {
  /**
   * 创建订单
   */
  checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void;
}

export default Vue.extend<BuyCarState, BuyCarMehtod, BuyCarComputed, {}>({
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
  methods: {
    checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void {
      // 创建订单
      if (buyOrRent === 'rent') {
        // 租赁
        // 还没写
        for (let i = 0; i < this.cartList.length; i += 1) {
          if (this.cartList[i].orderType === 'buy') {
            const good = this.cartList[i];
            createRentOrder(good.gid, good.rent, good.num, 'fandouhuayuan 30#001')
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else {
        // 购买
        // 扫描订单，过滤出购买订单
        for (let i = 0; i < this.cartList.length; i += 1) {
          if (this.cartList[i].orderType === 'buy') {
            const good = this.cartList[i];
            createBugOrder(good.gid, good.num, 'fandouhuayuan 30#001')
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
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
