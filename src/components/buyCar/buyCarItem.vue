<template>
  <div class="cart-item">
    <v-card light>
      <v-card-title>[{{ itemProp.merchant.name }}]&nbsp;|&nbsp;{{ itemProp.name }}</v-card-title>
      <v-card-text>{{ itemProp.info }}</v-card-text>
      <v-card-subtitle>
        <strong>售价：￥{{ itemProp.price }}</strong>
        &nbsp;|&nbsp;
        <strong>租金：￥{{ itemProp.rent }}</strong
        >&nbsp;|&nbsp;</v-card-subtitle
      >
      <v-card-actions>
        <v-btn class="ml-2 mt-3" fab icon height="40px" left width="40px">
          <v-icon @click="minumGoodNum(itemProp.gid)">mdi-minus</v-icon>
        </v-btn>
        <span class="ml-2 mt-3" style="padding: 0 0.1rem">{{ itemProp.num }}</span>
        <v-btn class="ml-2 mt-3" fab icon height="40px" left width="40px">
          <v-icon @click="plusGoodNum(itemProp.gid)">mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-radio-group v-model="itemProp.orderType" row>
          <v-radio @change="changeOrderType(itemProp.gid, 'buy')" label="购买" value="buy"></v-radio>
          <v-radio @change="changeOrderType(itemProp.gid, 'rent')" label="租赁" value="rent"></v-radio>
        </v-radio-group>
      </v-card-actions>

      <div class="ma-3 item-img">
        <v-img height="200px" @click="toGoodInfo(itemProp.gid)" :src="itemProp.picUrl" style="cursor: pointer"></v-img>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { CartProp } from '@/utils/store/state';

interface BuyCarItemState {
  /**
   * 订单类型
   */
  buyOrRent: 'buy' | 'rent';
}

interface BuyCarItemMethod {
  /**
   * 减少商品数量
   */
  minumGoodNum(gid: number): void;

  /**
   * 增加商品数量
   */
  plusGoodNum(gid: number): void;

  /**
   * 修改类型
   */
  changeOrderType(gid: number, orderType: 'buy' | 'rent'): void;

  /**
   * 查看商品信息
   */
  toGoodInfo(gid: number): void;
}

interface BuyCarItemProp {
  itemProp: CartProp;
}

export default Vue.extend<BuyCarItemState, BuyCarItemMethod, {}, BuyCarItemProp>({
  name: 'buyCarItem',
  data: () => ({
    sheet: false,
    buyOrRent: 'buy',
  }),
  props: {
    itemProp: Object as PropType<CartProp>,
  },
  methods: {
    minumGoodNum(gid: number): void {
      this.$store.commit('updateCartGoods', {
        good: {
          gid,
        },
        method: 2,
      });
      this.$store.commit('cartMoneyCheck');
    },
    plusGoodNum(gid: number): void {
      this.$store.commit('updateCartGoods', {
        good: {
          gid,
        },
        method: 1,
      });
      this.$store.commit('cartMoneyCheck');
    },
    changeOrderType(gid: number, orderType: 'buy' | 'rent'): void {
      this.$store.commit('updateCartGoods', {
        good: {
          gid,
        },
        method: 4,
        orderType,
      });
      this.$store.commit('cartMoneyCheck');
    },
    toGoodInfo(gid: number) {
      console.log(gid);
      this.$router.push({
        path: `/good/${gid}`,
      });
    },
  },
});
</script>

<style lang="scss">
.cart-item {
  position: relative;
  .item-img {
    position: absolute;
    right: 0;
    top: 10%;
  }
}
</style>
