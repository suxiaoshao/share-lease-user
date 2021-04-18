<template>
  <form>
    <h1>创建订单</h1>
    <v-card>
      <v-card-title> 选择地址</v-card-title>
      <v-list two-line>
        <v-list-item-group v-model="selectedAddress" active-class="pink--text">
          <template v-for="(item, index) in addressAll">
            <v-list-item :key="item.aid" @click="selectThisAddress(index)">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>

                  <v-list-item-subtitle class="text--primary" v-text="item.phone"></v-list-item-subtitle>

                  <v-list-item-subtitle
                    >{{ item.province }}{{ item.city }}{{ item.district }}{{ item.town
                    }}{{ item.address }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card>
      <v-list>
        <v-list-item-group>
          <template v-for="itemProp in ordersCreateData">
            <v-list-item :key="itemProp.gid" dense class="text--primary">
              <v-list-item-content>
                <v-list-item-title> [{{ itemProp.merchant.name }}]&nbsp;|&nbsp;{{ itemProp.name }} </v-list-item-title>
                <v-list-item-subtitle>
                  <strong>售价：￥{{ itemProp.price }}</strong>
                </v-list-item-subtitle>
                <v-list-item-subtitle> 购买数量：{{ itemProp.num }} </v-list-item-subtitle>
                <v-img :src="itemProp.picUrl" max-height="125" class="grey darken-4"></v-img>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-btn class="mr-4" style="margin-top: 1rem" @click="createBuyOrders"> 创建 </v-btn>
    <v-btn style="margin-top: 1rem"> 取消 </v-btn>
    <my-snackbar></my-snackbar>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserAdress } from '@/utils/http/user/addNewAddress';
import { createBugOrder } from '@/utils/http/order/createBugOrder';
import { createRentOrder } from '@/utils/http/order/createRentOrder';
import { CartProp } from '@/utils/store/state';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';
interface CreateOrderState {
  /**
   * 当前订单页
   */
  pageCur: number;
  /**
   * 被选中的地址
   */
  selectedAddress: number[];
  /**
   * 消息条消息
   * */
  message: Message;
}

interface CreateOrderComputed {
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
  /**
   * 传输的订单数据
   */
  ordersCreateData: CartProp[];
}

interface CreateOrderMethod {
  /**
   * 挑选这个地址作为订单地址
   */
  selectThisAddress(index: number): void;
  /**
   * 购买
   */
  createBuyOrders(): void;
  /**
   * 提示
   */
  openMessage(message: string): void;
}

export default Vue.extend<CreateOrderState, CreateOrderMethod, CreateOrderComputed, {}>({
  name: 'order-buy',
  components: { MySnackbar },
  data: () => ({
    buyOrders: [],
    pageCur: -1,
    message: { message: '', open: false },
    selectedAddress: [0],
  }),
  methods: {
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    createBuyOrders(): void {
      const aid = this.addressAll[this.selectedAddress[0]];
      for (let i = 0; i < this.ordersCreateData.length; i += 1) {
        if (this.ordersCreateData[i].orderType === 'buy') {
          createBugOrder(this.ordersCreateData[i].gid, this.ordersCreateData[i].num, Number(aid.aid))
            .then((res) => {
              console.log(res);
              this.openMessage('创建订单成功！');
              // 从购物车中清楚该商品信息
              this.$store.commit('updateCartGoods', {
                method: 2,
                good: this.ordersCreateData[i],
              });
            })
            .catch((err) => {
              console.log(err);
              this.openMessage(err);
            });
        } else {
          // 租赁订单
          createRentOrder(
            this.ordersCreateData[i].gid,
            this.ordersCreateData[i].rent,
            this.ordersCreateData[i].num,
            aid.aid,
          )
            .then((res) => {
              console.log(res);
              this.openMessage('创建订单成功！');
              // 从购物车中清楚该商品信息
              this.$store.commit('updateCartGoods', {
                method: 2,
                good: this.ordersCreateData[i],
              });
              this.$router.push({
                name: 'OrderDoing',
              });
            })
            .catch((err) => {
              console.log(err);
              this.openMessage(err);
            });
        }
      }
    },
    selectThisAddress(index: number): void {
      console.log(index);
      this.selectedAddress = [index];
    },
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
    ordersCreateData() {
      return this.$store.state.ordersCreateData;
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
