<template>
  <v-container fluid class="buy-car-rent">
    <v-row justify="space-around">
      <v-container>
        <v-card v-for="(item, i) in cartList" :key="i" v-show="item.orderType === 'rent'">
          <buy-cat-item :itemProp="item"></buy-cat-item>
        </v-card>
      </v-container>
    </v-row>
    <v-card color="#385F73" light max-width="400px" class="check-cart">
      <div class="d-flex">
        <v-card-title>
          租赁金额合计：<span style="color: orange">{{ cartRentMoney.toFixed(2) }}￥</span>
        </v-card-title>

        <v-card-actions>
          <v-btn color="orange" rounded large @click="toCreateOrders">结算 </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import buyCatItem from '@/components/buyCar/buyCarItem.vue';
import { CartProp } from '@/utils/store/state';

interface BuyCarRentState {
  /**
   * 订单类型
   */
  buyOrRent: 'buy' | 'rent';
  /**
   * 当前订单页
   */
  pageCur: number;
}

interface BuyCarRentComputed {
  /**
   * 购物车列表
   */
  cartList: CartProp[];
  /**
   * 购物车购买金额
   */
  cartRentMoney: number;
}

interface BuyCarRentMehtod {
  /**
   * 跳转到创建订单页面
   */
  toCreateOrders(): void;
}
export default Vue.extend<BuyCarRentState, BuyCarRentMehtod, BuyCarRentComputed, {}>({
  name: 'buycar-buy',
  data: () => ({
    buyOrRent: 'buy',
    pageCur: -1,
  }),
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
  },
  // mounted() {},
  methods: {
    toCreateOrders(): void {
      // 创建订单
      // 租赁
      // 扫描订单，过滤出购买订单
      const goods: CartProp[] = [];
      for (let i = 0; i < this.cartList.length; i += 1) {
        if (this.cartList[i].orderType === 'rent') {
          goods.push(this.cartList[i]);
        }
      }
      this.$store.commit('updateOrdersCreateData', goods);
      this.$router.push({
        name: 'OrderOptCreate',
      });
    },
  },
});
</script>

<style lang="scss">
.buy-car-rent {
  .check-cart {
    position: fixed;
    right: 3rem;
    bottom: 3rem;
  }
  .order-page {
    position: fixed;
    bottom: 3rem;
  }
}
</style>
