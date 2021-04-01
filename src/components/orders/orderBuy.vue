<template>
  <v-container fluid class="orders-buy">
    <v-row justify="space-around">
      <v-col cols="5">
        <div class="title mb-1">Default (cover)</div>
        <div class="subheading">Matching</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
        <div class="subheading pt-4">Too high</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
        <div class="subheading pt-4">Too low</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4"></v-img>
      </v-col>

      <v-col cols="5">
        <div class="title mb-1">Contain</div>
        <div class="subheading">Matching</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" contain></v-img>
        <div class="subheading pt-4">Too high</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
        <div class="subheading pt-4">Too low</div>
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4" contain></v-img>
      </v-col>
      <div class="order-page">
        <v-btn rounded @click="getOrders('prev')">&lt;</v-btn>
        <v-btn rounded @click="getOrders('next')">&gt;</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { getOrderList, OrderDetail } from '@/utils/http/order/getOrderList';

interface OrderBuyState {
  /**
   * 订单列表
   */
  buyOrders: OrderDetail[];
  /**
   * 当前订单页
   */
  pageCur: number;
}

interface OrderBuyMethod {
  /**
   * 分页获取订单
   */
  getOrders(to: string): void;
}

export default Vue.extend<OrderBuyState, OrderBuyMethod, {}, {}>({
  name: 'order-buy',
  data: () => ({
    buyOrders: [],
    pageCur: -1,
  }),
  mounted() {
    this.getOrders('next');
  },
  methods: {
    getOrders(to: string) {
      if (to === 'next') {
        this.pageCur += 1;
      } else if (to === 'prev') {
        this.pageCur -= 1;
        if (this.pageCur < 0) this.pageCur = 0;
      }
      console.log(this.pageCur);
      getOrderList('status', 10, this.pageCur, 'ASC', 'create')
        .then((res) => {
          console.log('get order list');
          console.log(res);
          if (res.length === 0) {
            // 页数上限
            this.pageCur -= 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>

<style lang="scss">
.orders-buy {
  .order-page {
    position: fixed;
    bottom: 1rem;
  }
}
</style>
