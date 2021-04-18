<template>
  <v-container fluid class="orders-buy">
    <v-select :items="orderStates" label="筛选订单" @change="selectOrders"></v-select>
    <v-row justify="space-around">
      <v-col v-for="item in newOrders" :key="item.oid">
        <orderItem :orderInfo="item"></orderItem>
      </v-col>
      <v-pagination @input="getOrders" v-model="curPage" :length="pages" circle></v-pagination>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { getOrderList } from '@/utils/http/order/getOrderList';
import orderItem from '@/components/orders/orderDetail/orderBuyItem.vue';
import { OrderProp } from '@/utils/http/order/getOrderList';

interface OrderBuyState {
  /**
   * 订单列表
   */
  Orders: OrderProp[];
  /**
   * 筛选后的订单
   */
  newOrders: OrderProp[];
  /**
   * 订单总页数
   */
  pages: number;
  /**
   * 当前页
   */
  curPage: number;
  /**
   * 订单状态
   */
  orderStates: string[];
}

interface OrderBuyMethod {
  /**
   * 分页获取订单
   */
  getOrders(to: number): void;
  /**
   * 选择订单
   */
  selectOrders(e: string): void;
}

export default Vue.extend<OrderBuyState, OrderBuyMethod, {}, {}>({
  name: 'order-buy',
  components: { orderItem },
  data: () => ({
    Orders: [],
    pages: 1,
    curPage: 1,
    orderStates: ['全部订单', 'overtime', 'payed', 'waiting', 'abandon', 'abandoned', 'finish', 'expressing'],
    newOrders: [],
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
      getOrderList('status', 10, this.curPage - 1, 'ASC', 'buy')
        .then((res) => {
          console.log(res);
          this.pages = Math.ceil(res.total / res.pageSize);
          this.Orders = res.list;
          this.newOrders = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectOrders(e: string): void {
      console.log(e);
      this.newOrders = [];
      for (let i = 0; i < this.Orders.length; i += 1) {
        if (this.Orders[i].status === e || e === '全部订单') this.newOrders.push(this.Orders[i]);
      }
      console.log(this.newOrders);
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
