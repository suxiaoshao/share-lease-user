<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">修改密码</v-btn>
    </template>
    <v-card>
      <v-card-title> 修改密码</v-card-title>
      <v-card-text>
        <v-text-field
          :append-icon="showOldPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showOldPwd ? 'text' : 'password'"
          v-model="oldPassword"
          label="旧密码"
          @click:append="showOldPwd = !showOldPwd"
        />
        <v-text-field
          :append-icon="showNewPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNewPwd ? 'text' : 'password'"
          v-model="newPassword"
          label="新密码"
          @click:append="showNewPwd = !showNewPwd"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" text @click="dialog = false">取消</v-btn>
        <v-btn color="blue darken-1" text @click="changePassword">保存</v-btn>
      </v-card-actions>
      <my-snackbar></my-snackbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { modifyPassword } from '@/utils/http/user/modifyPassword';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface ResetPasswordState {
  /**
   * 旧密码
   * */
  oldPassword: string;
  /**
   * 新密码
   * */
  newPassword: string;
  /**
   * 是否打开对话框
   * */
  dialog: boolean;
  /**
   * 消息条消息
   * */
  message: Message;
  /**
   * 是否展示新密码
   * */
  showNewPwd: boolean;
  /**
   * 是否展示旧密码
   * */
  showOldPwd: boolean;
}

interface ResetPasswordMethod {
  /**
   * 修改密码
   * */
  changePassword(): void;

  /**
   * 提示
   */
  openMessage(message: string): void;
}

export default Vue.extend<ResetPasswordState, ResetPasswordMethod, {}, {}>({
  name: 'reset-password',
  components: { MySnackbar },
  data(): ResetPasswordState {
    return {
      oldPassword: '',
      newPassword: '',
      dialog: false,
      message: { message: '', open: false },
      showNewPwd: false,
      showOldPwd: false,
    };
  },
  methods: {
    changePassword(): void {
      modifyPassword(this.newPassword, this.oldPassword)
        .then(() => {
          this.openMessage('修改成功');
          this.dialog = false;
        })
        .catch((res) => {
          console.log(res.message);
          this.openMessage(res.message);
        });
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

<style scoped lang="scss"></style>
