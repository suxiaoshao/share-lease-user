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
          <v-btn color="orange" rounded large @click="buyDialog = true">结算 </v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <v-dialog v-model="buyDialog" persistent max-width="600px">
      <v-card>
        <v-card-title> 确认订单</v-card-title>
        <v-card-text>
          <v-spacer></v-spacer>
          <v-select :items="userAddressSelect" :value="pickedAddress" label="地址" solo></v-select>
          <v-btn color="pink darken-1" text @click="buyDialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="checkAndCreateOrder('buy')">保存</v-btn>
        </v-card-text>
      </v-card>
      <my-snackbar></my-snackbar>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import buyCatItem from '@/components/buyCar/buyCarItem.vue';
import { UserAdress } from '@/utils/http/user/addNewAddress';
import { createBugOrder } from '@/utils/http/order/createBugOrder';
import { CartProp } from '@/utils/store/state';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface BuyCarBuyState {
  /**
   * 订单类型
   */
  buyOrRent: 'buy' | 'rent';
  /**
   * 当前订单页
   */
  pageCur: number;
  /**
   * 购买对话框
   */
  buyDialog: boolean;
  /**
   * 用户地址列表
   * 用于select展示
   */
  userAddressSelect: string[];
  /**
   * 用户选择的邮寄地址
   */
  pickedAddress: string;
  /**
   * 消息条消息
   * */
  message: Message;
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
  /**
   * 用户地址
   */
  addressAll: UserAdress[];
}

interface BuyCarBuyMehtod {
  /**
   * 创建订单
   */
  checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void;
  /**
   * 提示
   */
  openMessage(message: string): void;
}
export default Vue.extend<BuyCarBuyState, BuyCarBuyMehtod, BuyCarBuyComputed, {}>({
  name: 'buycar-buy',
  data: () => ({
    buyOrRent: 'buy',
    pageCur: -1,
    buyDialog: false,
    message: { message: '', open: false },
    userAddressSelect: [],
    pickedAddress: '',
  }),
  components: {
    buyCatItem,
    MySnackbar,
  },
  mounted() {
    // 初始化地址列表
    console.log(this.addressAll);
    for (let i = 0; i < this.addressAll.length; i += 1) {
      this.userAddressSelect.push(
        `${this.addressAll[i].province}${this.addressAll[i].city}${this.addressAll[i].district}${this.addressAll[i].town}${this.addressAll[i].address}`,
      );
    }
    console.log(this.userAddressSelect);
  },
  computed: {
    cartList() {
      return this.$store.state.cartGoods;
    },
    cartBuyMoney() {
      return this.$store.state.cartBuyMoney;
    },
    addressAll(): UserAdress[] {
      return this.$store.state.userAddressList;
    },
  },
  // mounted() {},
  methods: {
    checkAndCreateOrder(buyOrRent: 'buy' | 'rent'): void {
      console.log(this.pickedAddress);
      // 创建订单
      if (buyOrRent === 'buy') {
        // 购买
        // 扫描订单，过滤出购买订单
        for (let i = 0; i < this.cartList.length; i += 1) {
          if (this.cartList[i].orderType === 'buy') {
            const good = this.cartList[i];
            createBugOrder(good.gid, good.num, 1)
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
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
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
