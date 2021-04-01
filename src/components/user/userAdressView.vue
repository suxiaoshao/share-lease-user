<template>
  <div>
    <v-timeline align-top dense>
      <!-- 用户的几个地址展示 -->
      <v-timeline-item fill-dot small v-for="item in addressAll" :key="item.aid">
        <v-card>
          <v-card-subtitle class="font-weight-normal">
            <strong>收件人：</strong>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.town
            }}{{ item.address }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-normal"><strong>手机号：</strong>{{ item.phone }}</v-card-subtitle>
          <v-card-subtitle class="font-weight-normal"><strong>收件人：</strong>{{ item.name }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4" @click="openEditAddress(item)">编辑</v-btn>
            <v-btn text color="deep-purple accent-4" @click="openDelete(item.aid)">删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span>确定删除该地址？</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="deleteDialog = false"> 关闭 </v-btn>
          <v-btn color="warning" text @click="deleteAddress"> 删除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title> 修改地址</v-card-title>
        <v-card-text>
          <v-spacer></v-spacer>
          <v-text-field label="省份" v-model="editAddress.province" />
          <v-text-field label="城市" v-model="editAddress.city" />
          <v-text-field label="县/区" v-model="editAddress.district" />
          <v-text-field label="镇/街道" v-model="editAddress.town" />
          <v-text-field label="详细地址" v-model="editAddress.address" />
          <v-text-field label="手机号" v-model="editAddress.phone" />
          <v-text-field label="收件人" v-model="editAddress.name" />
          <v-btn color="pink darken-1" text @click="dialogEdit = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="saveEditAddress">保存</v-btn>
        </v-card-text>
      </v-card>
      <my-snackbar></my-snackbar>
    </v-dialog>
    <my-snackbar v-model="message"></my-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/user/getInfo';
import { UserAdress } from '@/utils/http/user/addNewAddress';
import { deleteUserAddress } from '@/utils/http/user/deleteAddress';
import { modifyUserAddress } from '@/utils/http/user/modifyUserAddress';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface UserAdressViewCompute {
  userInfo: UserInfo;
  /**
   * 用户地址列表
   */
  addressAll: UserAdress[];
}

interface UserAdressViewState {
  /**
   * 编辑的地址
   */
  editAddress: UserAdress;
  /**
   * 打开删除地址的dialog
   */
  deleteDialog: boolean;
  /**
   * 打开修改地址的dialog
   */
  dialogEdit: boolean;
  /**
   * 需要删除的aid
   */
  deleteAid: string;
  /**
   * 消息条消息
   * */
  message: Message;
}

interface UserAddressViewMethod {
  /**
   * 打开地址编辑
   */
  openEditAddress(item: UserAdress): void;
  /**
   * 打开删除窗口
   */
  openDelete(aid: string): void;
  /**
   * 删除地址
   */
  deleteAddress(): void;
  /**
   * 保存修改后的地址
   */
  saveEditAddress(): void;
  /**
   * 提示
   */
  openMessage(message: string): void;
}

export default Vue.extend<UserAdressViewState, UserAddressViewMethod, UserAdressViewCompute, {}>({
  name: 'userAddressView',
  components: { MySnackbar },
  computed: {
    userInfo(): UserInfo {
      return this.$store.state.userInfo;
    },
    addressAll(): UserAdress[] {
      return this.$store.state.userAddressList;
    },
  },
  methods: {
    openEditAddress(item: UserAdress) {
      // 打开编辑界面
      this.editAddress = item;
      this.dialogEdit = true;
    },
    openDelete(aid: string) {
      this.deleteDialog = true;
      this.deleteAid = aid;
    },
    deleteAddress() {
      deleteUserAddress(this.deleteAid)
        .then((res) => {
          console.log(res);
          // 更新地址列表
          this.$store.commit('updateUserAddress', {
            method: -3,
            aid: this.deleteAid,
          });
          this.deleteDialog = false;
          this.openMessage('删除成功！');
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
    saveEditAddress() {
      // 保存编辑后的地址
      console.log(this.editAddress);
      modifyUserAddress(this.editAddress).then(() => {
        this.dialogEdit = false;
        this.openMessage('地址修改成功！');
        this.$store.commit('updateUserAddress', {
          method: -4,
          aid: this.editAddress.aid,
          address: [this.editAddress],
        });
      });
    },
  },
  data(): UserAdressViewState {
    return {
      editAddress: {
        province: '',
        city: '',
        district: '',
        town: '',
        address: '',
        phone: '',
        name: '',
      },
      deleteDialog: false,
      deleteAid: '',
      message: { message: '', open: false },
      dialogEdit: false,
    };
  },
});
</script>

<style scoped lang="scss">
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
