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
  </v-tab-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '@/utils/http/login';

interface LoginState {
  email: string;
  password: string;
}

interface LoginMethod {
  login(): void;
}

export default Vue.extend<LoginState, LoginMethod, {}, {}>({
  name: 'login',
  data(): LoginState {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login(): void {
      login(this.email, this.password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
