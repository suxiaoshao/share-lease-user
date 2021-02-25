<template>
  <v-tab-item value="Register" class="main">
    <v-card-text class="item">
      <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
      <h4 class="text-center mt-4">Ensure your email for registration</h4>
      <v-form>
        <v-text-field
          label="Name"
          name="Name"
          prepend-icon="mdi-account"
          v-model="name"
          type="text"
          color="teal accent-3"
        />
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
        <v-text-field
          id="resetCode"
          label="Code"
          name="resetCode"
          v-model="code"
          prepend-icon="mdi-counter"
          type="text"
          color="teal accent-3"
        />
        <v-text-field
          id="password"
          label="Password"
          v-model="password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          color="teal accent-3"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" large @click="registerAccount">注册</v-btn>
    </v-card-actions>
    <my-snackbar v-model="message"></my-snackbar>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { sendMailCode } from '@/utils/http/sendMailCode';
import { register } from '@/utils/http/register';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface RegisterState {
  /**
   * 用户名
   * */
  name: string;
  /**
   * 密码
   * */
  password: string;
  /**
   * 邮箱
   * */
  email: string;
  /**
   * 验证码
   * */
  code: string;
  /**
   * 消息条
   * */
  message: Message;
}

interface RegisterMethod {
  /**
   * 获取验证码
   * */
  sendCode(): void;

  /**
   * 注册
   * */
  registerAccount(): void;

  /**
   * 打开消息条
   * */
  openMessage(message: string): void;
}

export default Vue.extend<RegisterState, RegisterMethod, {}, {}>({
  name: 'register',
  components: { MySnackbar },
  data(): RegisterState {
    return {
      name: '',
      password: '',
      email: '',
      code: '',
      message: {
        message: '',
        open: false,
      },
    };
  },
  methods: {
    sendCode(): void {
      sendMailCode(this.email)
        .then(() => {
          this.openMessage('成功发送验证码');
        })
        .catch((res: Error) => {
          console.log(res);
          this.openMessage(res.message);
        });
    },
    registerAccount(): void {
      register(this.name, this.password, this.email, this.code)
        .then((res) => {
          console.log(res);
          this.openMessage('成功注册');
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
