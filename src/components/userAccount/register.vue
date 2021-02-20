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
  </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { sendMailCode } from '@/utils/http/sendMailCode';
import { register } from '@/utils/http/register';

interface RegisterState {
  name: string;
  password: string;
  email: string;
  code: string;
}

interface RegisterMethod {
  sendCode(): void;

  registerAccount(): void;
}

export default Vue.extend<RegisterState, RegisterMethod, {}, {}>({
  name: 'register',
  data(): RegisterState {
    return {
      name: '',
      password: '',
      email: '',
      code: '',
    };
  },
  methods: {
    sendCode(): void {
      sendMailCode(this.email)
        .then()
        .catch((res) => {
          console.log(res);
        });
    },
    registerAccount(): void {
      register(this.name, this.password, this.email, this.code)
        .then()
        .catch((message) => {
          console.log(message);
        });
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
