<template>
  <div class="good-main">
    <v-container>
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab to="/orders/detail/buy"> 购买订单 </v-tab>
        <v-tab to="/orders/detail/rent"> 租金订单 </v-tab>
      </v-tabs>

      <router-view></router-view>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import { good } from '@/utils/http/good/good';
import { GoodProp } from '@/utils/http/good/goodList';
import { OrderDetail } from '@/utils/http/order/getOrderList';

interface OrderDetailMethod {
  /**
   * 解析url参数
   */
  parseGoodArgs(): void;
}

interface OrderDetailState {
  /**
   * 商品的id
   */
  goodID: string;
  /**
   * 商品信息
   */
  goodInfo: GoodProp | null;
  /**
   * 订单列表
   */
  ordersList: OrderDetail[];
  /**
   * 订单页码
   */
  pageNum: number;
  /**
   * 一页的订单数
   */
  pageSize: number;
  /**
   * 排序规则
   */
  orderRule: 'ASC' | 'DESC';
}

export default Vue.extend<OrderDetailState, OrderDetailMethod, {}, {}>({
  name: 'goodMain',

  data: () => ({
    goodID: '1',
    goodInfo: null,
    ordersList: [],
    pageNum: 0,
    pageSize: 20,
    orderRule: 'ASC',
  }),

  methods: {
    parseGoodArgs() {
      const url = location.href; //获取url中"?"符后的字串
      console.log(url);
      const urls = url.split('/');
      console.log(urls);
      for (let i = 0; i < urls.length; i += 1) {
        if (urls[i] === 'good' && i + 1 < urls.length) {
          this.goodID = urls[i + 1];
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.good-main {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
</style>
