<template>
  <v-tab-item value="Login" class="main">
    <v-card-text class="item">
      <v-form>
        <v-text-field
          label="Email"
          name="Email"
          v-model="email"
          prepend-icon="mdi-email"
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
      <v-btn color="primary" large @click="login">登陆</v-btn>
    </v-card-actions>
    <my-snackbar v-model="message"></my-snackbar>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '@/utils/http/user/login';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface LoginState {
  /**
   * 邮箱
   * */
  email: string;
  /**
   * 密码
   * */
  password: string;
  /**
   * 消息条信息
   * */
  message: Message;
}

interface LoginMethod {
  /**
   * 登陆
   * */
  login(): void;

  /**
   * 打开消息条
   * */
  openMessage(message: string): void;
}

export default Vue.extend<LoginState, LoginMethod, {}, {}>({
  name: 'login',
  components: { MySnackbar },
  data(): LoginState {
    return {
      email: '',
      password: '',
      message: {
        message: '',
        open: false,
      },
    };
  },
  methods: {
    login(): void {
      login(this.email, this.password)
        .then((res) => {
          this.openMessage('登陆成功');
          this.$store.commit('login', res);
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
