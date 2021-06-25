<template>
  <v-container fluid class="orders-buy">
    <v-row justify="space-around">
      <v-col v-for="item in Orders" :key="item.oid">
        <orderItem :orderInfo="item"></orderItem>
      </v-col>
      <v-pagination v-show="pages > 0" @input="getOrders" v-model="curPage" :length="pages" circle></v-pagination>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { getOrderList } from '@/utils/http/order/getOrderList';
import orderItem from '@/components/orders/orderDetail/orderRentItem.vue';
import { OrderProp } from '@/utils/http/order/getOrderList';

interface OrdeRentState {
  /**
   * 订单列表
   */
  Orders: OrderProp[];
  /**
   * 订单总页数
   */
  pages: number;
  /**
   * 当前页
   */
  curPage: number;
}

interface OrdeRentMethod {
  /**
   * 分页获取订单
   */
  getOrders(to: number): void;
}

export default Vue.extend<OrdeRentState, OrdeRentMethod, {}, {}>({
  name: 'order-rent',
  components: { orderItem },
  data: () => ({
    Orders: [],
    pages: 1,
    curPage: 1,
  }),
  mounted() {
    this.getOrders(-1);
  },
  methods: {
    getOrders(to: number) {
      console.log(to);
      if (to !== -1) {
        this.curPage = to;
      }
      getOrderList('status', 10, this.curPage - 1, 'ASC', 'rent')
        .then((res) => {
          console.log(res);
          this.pages = Math.ceil(res.total / res.pageSize);
          this.Orders = [];
          for (let i = 0; i < res.list.length; i += 1) {
            if (res.list[i].pledge !== -1) this.Orders.push(res.list[i]);
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
