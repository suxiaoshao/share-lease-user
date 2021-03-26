<template>
  <div>
    <v-card dark color="pink">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div style="color: black; text-align: left">
          <h3 style="padding: 0.5rem 0 0.4rem 2rem">[{{ itemProp.merchant.name }}]&nbsp;|&nbsp;{{ itemProp.name }}</h3>
          <h4 v-text="itemProp.info" style="color: white; padding: 0.5rem 0 0.4rem 2rem"></h4>
          <div style="color: #ccc; padding: 0.5rem 0 0.4rem 2rem">
            <strong style="color: rgb(255, 240, 240)">售价：￥{{ itemProp.price }}</strong>
            &nbsp;|&nbsp;
            <strong style="color: rgb(255, 240, 240)">租金：￥{{ itemProp.rent }}</strong
            >&nbsp;|&nbsp;
          </div>
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
        </div>

        <v-avatar class="ma-3" size="125" tile>
          <v-img @click="toGoodInfo(itemProp.gid)" :src="itemProp.picUrl" style="cursor: pointer"></v-img>
        </v-avatar>
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
      console.log('asdasdasdasdasd');
      this.$router.push({
        path: `/good/${gid}`,
      });
    },
  },
});
</script>
