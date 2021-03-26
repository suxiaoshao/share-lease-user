<template>
  <v-container fluid class="buy-car-buy">
    <v-row justify="space-around">
      <!-- expend items -->
      <v-container>
        <v-row dense style="margin-top: 1.5rem">
          <v-col v-for="(item, i) in cartList" :key="i" cols="6" v-show="item.orderType === 'buy'">
            <buy-cat-item :itemProp="item"></buy-cat-item>
          </v-col>
        </v-row>
      </v-container>
      <div class="order-page">
        <v-btn rounded @click="getOrders('prev')">&lt;</v-btn>
        <v-btn rounded @click="getOrders('next')">&gt;</v-btn>
      </div>
    </v-row>
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
</template>

<script lang="ts">
import Vue from 'vue';
import buyCatItem from '@/components/buyCar/buyCarItem.vue';
import { createBugOrder } from '@/utils/http/order/createBugOrder';
import { CartProp } from '@/utils/store/state';

interface BuyCarBuyState {
  /**
   * 订单类型
   */
  buyOrRent: 'buy' | 'rent';
  /**
   * 当前订单页
   */
  pageCur: number;
}

interface BuyCarBuyComputed {
  /**
   * 购物车列表
   */
  cartList: CartProp[];
  /**
   * 购物车购买金额
   */
  cartBuyMoney: number;
}

interface BuyCarBuyMehtod {
  /**
   * 创建订单
   */
  checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void;
}
export default Vue.extend<BuyCarBuyState, BuyCarBuyMehtod, BuyCarBuyComputed, {}>({
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
    cartBuyMoney() {
      return this.$store.state.cartBuyMoney;
    },
  },
  // mounted() {},
  methods: {
    checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void {
      // 创建订单
      if (buyOrRent === 'buy') {
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
});
</script>

<style lang="scss" scoped>
.buy-car-buy {
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
