<template>
  <!-- 购物车 -->
  <div class="cart">
    <v-container>
      <v-container style="overflow-y: scroll; padding: 1rem 1rem 4rem" class="text-center">
        <!-- expend items -->
        <h1 class="headline" style="text-align: left">购物车</h1>
        <h1 class="subtitle-1 orange" style="color: white; text-align: left; padding: 0.4rem">购买：</h1>
        <v-container>
          <v-row dense style="margin-top: 1.5rem">
            <v-col v-for="(item, i) in cartList" :key="i" cols="6" v-show="item.orderType === 'buy'">
              <buy-cat-item :itemProp="item"></buy-cat-item>
            </v-col>
          </v-row>
        </v-container>
        <h1 class="subtitle-1 orange" style="color: white; text-align: left; padding: 0.4rem">租赁：</h1>
        <v-container>
          <v-row dense style="margin-top: 1.5rem">
            <v-col v-for="(item, i) in cartList" :key="i" cols="6" v-show="item.orderType === 'rent'">
              <buy-cat-item :itemProp="item"></buy-cat-item>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <v-container>
        <!-- 金额记录 -->
        <v-card color="#385F73" dark max-width="400px" class="check-cart">
          <div class="d-flex">
            <v-card-title>
              购买金额合计：<span style="color: orange">{{ cartBuyMoney.toFixed(2) }}￥</span>
            </v-card-title>

            <v-card-actions>
              <v-btn color="orange" rounded large @click="checkAndCreateOrder('buy')">结算 </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-container>
      <v-container>
        <v-card color="#385F73" light max-width="400px" class="check-cart" style="left: 3rem">
          <div class="d-flex">
            <v-card-title>
              租赁金额合计：<span style="color: orange">{{ cartRentMoney.toFixed(2) }}￥</span>
            </v-card-title>

            <v-card-actions>
              <v-btn color="orange" rounded large @click="checkAndCreateOrder('rent')">结算 </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-container>
    </v-container>
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
  /**
   * 购买订单
   */
  buyList: CartProp[];
  /**
   * 租赁订单
   */
  rentList: CartProp[];
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
  components: {
    buyCatItem,
  },
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
      } else {
        // 购买
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
    sheet: false,
    buyOrRent: 'buy',
    buyList: [],
    rentList: [],
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
