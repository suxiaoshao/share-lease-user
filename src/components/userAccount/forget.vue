<template>
  <v-tab-item value="Forget" class="main">
    <v-card-text class="item">
      <h1 class="text-center display-2 teal--text text--accent-3">Forget Password</h1>
      <h4 class="text-center mt-4">find your password with your email</h4>
      <v-form>
        <div style="display: flex">
          <v-text-field
            label="Email"
            name="Email"
            v-model="email"
            prepend-icon="mdi-email"
            type="text"
            color="teal accent-3"
            append-icon="mdi-send"
            @click:append="sendCode"
          />
        </div>
        <v-text-field
          id="resetCode"
          label="Reset Code"
          v-model="code"
          name="resetCode"
          prepend-icon="mdi-counter"
          type="text"
          color="teal accent-3"
        />
        <v-text-field
          id="password"
          label="New Password"
          name="password"
          v-model="password"
          prepend-icon="mdi-lock"
          type="password"
          color="teal accent-3"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" large @click="reset">重设</v-btn>
    </v-card-actions>
    <my-snackbar v-model="message"></my-snackbar>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { resetPwdMail } from '@/utils/http/resetPwdMail';
import { resetPassword } from '@/utils/http/resetPassword';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface ForgetState {
  /**
   * 邮箱
   * */
  email: string;
  /**
   * 验证码
   * */
  code: string;
  /**
   * 新密码
   * */
  password: string;
  /**
   * 消息条消息
   * */
  message: Message;
}

interface ForgetMethod {
  /**
   * 获取验证码
   * */
  sendCode(): void;

  /**
   * 重设密码
   * */
  reset(): void;

  /**
   * 打开消息条
   * */
  openMessage(message: string): void;
}

export default Vue.extend<ForgetState, ForgetMethod, {}, {}>({
  name: 'forget',
  components: { MySnackbar },
  data(): ForgetState {
    return {
      email: '',
      code: '',
      password: '',
      message: { message: '', open: false },
    };
  },
  methods: {
    sendCode() {
      resetPwdMail(this.email)
        .then(() => {
          this.openMessage('成功发送验证码');
        })
        .catch((res) => {
          console.log(res);
          this.openMessage(res.message);
        });
    },
    reset() {
      resetPassword(this.email, this.password, this.code)
        .then((res) => {
          console.log(res);
          this.openMessage('成功重置密码');
          this.$emit('ok');
        })
        .catch((res: Error) => {
          console.log(res);
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

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 104px);

  .item {
    width: 400px;
    max-width: 100%;
  }
}
</style>
