<template>
  <v-card class="mx-auto">
    <v-img :src="orderInfo.good.picUrl" height="200px"></v-img>

    <v-card-title> {{ orderInfo.good.name }} </v-card-title>
    <v-card-subtitle> {{ orderInfo.merchant.name }} </v-card-subtitle>

    <v-card-actions>
      <v-btn
        v-if="(orderInfo.status === 'paying') | 'create'"
        @click="payOrder(orderInfo.oid)"
        color="orange lighten-2"
        text
      >
        支付金额：{{ orderInfo.money }}
      </v-btn>
      <v-btn v-if="orderInfo.status === 'create'" @click="payOrder(orderInfo.oid)" color="orange lighten-2" text>
        支付金额：{{ orderInfo.money }}
      </v-btn>
      <v-btn v-else-if="orderInfo.status === 'overtime'" color="error" text>订单已经超时</v-btn>
      <v-btn v-else-if="orderInfo.status === 'payed'" color="blue" text>订单已支付</v-btn>
      <v-btn v-else-if="orderInfo.status === 'waiting'" color="yellow" text>收货完成</v-btn>
      <v-btn v-else-if="orderInfo.status === 'abandon'" color="warning" text>退货中</v-btn>
      <v-btn v-else-if="orderInfo.status === 'abandoned'" text>退货成功</v-btn>
      <v-btn v-else-if="orderInfo.status === 'finish'" text>订单已完成</v-btn>
      <v-btn v-else-if="orderInfo.status === 'expressing'" text color="green">
        邮寄中
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-btn icon @click="showOrderDetail = !showOrderDetail">
        <v-icon>{{ showOrderDetail ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showOrderDetail">
        <v-divider></v-divider>
        <v-card-text>
          <p>商品描述：{{ orderInfo.good.info }}</p>
          <p>订单创建时间：{{ orderInfo.createTime }}</p>
          <p>快递信息： {{ orderInfo.express ? orderInfo.express : '暂无' }}</p>
          <p>收货地址：{{ orderInfo.address }}</p>
          <p>收件人：{{ orderInfo.name }}</p>
          <p>手机：{{ orderInfo.phone }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="orderInfo.status !== 'expressing'" @click="confirmDialog = true" text color="green"
            >确认收货</v-btn
          >
          <v-btn :disabled="orderInfo.status !== 'waiting'" @click="revertDialog = true" text color="grey">退货</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
      </div>
    </v-expand-transition>
    <my-snackbar :message="message"></my-snackbar>
    <v-dialog v-model="confirmDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> 确认收货 </v-card-title>

        <v-card-text>确认收到货品后即可确认</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="confirmExpress"> 确认 </v-btn>
          <v-btn color="primary" text @click="confirmDialog = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="revertDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> 退货 </v-card-title>

        <v-card-text>
          <v-text-field v-model.trim="revertID" label="快递号"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="revert"> 确认 </v-btn>
          <v-btn color="primary" text @click="revertDialog = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { OrderProp } from '@/utils/http/order/getOrderList';
import { confirmReceipt } from '@/utils/http/order/confirmReceipt';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';
import { returnGood } from '@/utils/http/order/returnGoods';
import { pay } from '@/utils/http/orderPay';

interface OrderRentItemState {
  /**
   * 展开订单详情
   */
  showOrderDetail: boolean;

  /**
   * 消息条消息
   * */
  message: Message;

  /**
   * 打开确认收货的对话框
   */
  confirmDialog: boolean;

  /**
   * 退货快递id
   */
  revertID: string;

  /**
   * 退货对话框
   */
  revertDialog: boolean;
}

interface OrderRentItemProp {
  /**
   * 订单信息
   */
  orderInfo: OrderProp | null;
}

interface OrderRentItemMethod {
  /**
   * 支付订单
   */
  payOrder(oid: number): void;

  /**
   * 确认收货
   */
  confirmExpress(): void;

  /**
   * 提示
   */
  openMessage(message: string): void;

  /**
   * 退货
   */
  revert(): void;
}

export default Vue.extend<OrderRentItemState, OrderRentItemMethod, OrderRentItemProp, {}>({
  name: 'OrderRentItem',
  components: {
    MySnackbar,
  },
  data: () => ({
    showOrderDetail: false,
    message: { message: '', open: false },
    confirmDialog: false,
    revertID: '',
    revertDialog: false,
  }),
  props: {
    orderInfo: Object as PropType<OrderProp>,
  },
  mounted() {
    console.log(this.orderInfo?.status);
  },
  methods: {
    payOrder(oid: number): void {
      pay(oid)
        .then((res: string) => {
          console.log(res);
          const routerData = this.$router.resolve({ name: 'PayGateWay', query: { htmlData: res } });
          // 打开新页面
          window.open(routerData.href, '_ blank');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmExpress(): void {
      if (this.orderInfo)
        confirmReceipt(this.orderInfo.oid)
          .then((res) => {
            console.log(res);
            this.openMessage('确认收货成功！');
            this.confirmDialog = false;
          })
          .catch((err) => {
            console.log(err);
            this.openMessage(err);
          });
    },
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    revert(): void {
      if (this.revertID === '') {
        this.openMessage('请输入快递单号后再确认！');
        return;
      }
      if (this.orderInfo)
        returnGood(this.revertID, this.orderInfo.oid)
          .then((res) => {
            console.log(res);
            this.openMessage('确认退货成功！');
            this.revertDialog = false;
          })
          .catch((err) => {
            this.openMessage(err);
          });
    },
  },
});
</script>
