<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">添加地址</v-btn>
    </template>
    <v-card>
      <v-card-title> 添加地址</v-card-title>
      <!-- <al-selector v-model="res_s"/>
        <al-cascader v-model="res_c"/> -->
      <v-card-text>
        <v-spacer></v-spacer>
        <v-text-field label="省份" v-model="address.province" />
        <v-text-field label="城市" v-model="address.city" />
        <v-text-field label="县/区" v-model="address.district" />
        <v-text-field label="镇/街道" v-model="address.town" />
        <v-text-field label="详细地址" v-model="address.address" />
        <v-text-field label="手机号" v-model="address.phone" />
        <v-text-field label="收件人" v-model="address.name" />
        <v-btn color="pink darken-1" text @click="dialog = false">取消</v-btn>
        <v-btn color="blue darken-1" text @click="addNewAddress">保存</v-btn>
      </v-card-text>
      <my-snackbar></my-snackbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';
import { UserAdress, addNewAddress } from '@/utils/http/user/addNewAddress';

interface UserAddressState {
  /**
   * 是否打开对话框
   * */
  dialog: boolean;
  /**
   * 消息条消息
   * */
  message: Message;
  /**
   * 地址
   */
  address: UserAdress;
}

interface UserAddressMethod {
  /**
   * 提示
   */
  openMessage(message: string): void;
  /**
   * 保存地址
   */
  addNewAddress(): void;
}

export default Vue.extend<UserAddressState, UserAddressMethod, {}, {}>({
  name: 'reset-password',
  components: { MySnackbar },
  data(): UserAddressState {
    return {
      dialog: false,
      message: { message: '', open: false },
      address: {
        province: '',
        city: '',
        district: '',
        town: '',
        address: '',
        phone: '',
        name: '',
      },
    };
  },
  methods: {
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    addNewAddress() {
      // 保存新地址
      // 检查是否为空
      const address = this.address;
      for (const key in address) {
        if (!address[key]) {
          console.log('in');
          this.openMessage('信息不完整');
          return;
        }
      }
      addNewAddress(address)
        .then((res) => {
          this.openMessage('地址添加成功');
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
          this.openMessage(err);
        });
    },
  },
  mounted() {
    // 收件人手机号默认是自己的
    if (this.$store.state.userInfo.phone) {
      this.address.phone = this.$store.state.userInfo.phone;
    }
  },
});
</script>

<style scoped lang="scss"></style>
