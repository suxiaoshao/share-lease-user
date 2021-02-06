<template>
  <!-- 登录 注册 忘记密码 -->
  <v-row justify="center">
    <v-dialog v-model="openDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title color="primary" dark v-bind="attrs" v-on="on"> Account</v-list-item-title>
      </template>
      <v-card>
        <v-toolbar dark flat>
          <v-btn icon dark @click="openDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Account</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-slot:extension>
            <v-tabs v-model="tabNum" centered slider-color="yellow">
              <v-tab v-for="i in accountProp" :key="i" :href="`#${i}`"> {{ i }} </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tabNum">
          <v-tab-item value="Login">
            <v-row align="center" justify="center">
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">Sign in to SLU</h1>
                  <h4 class="text-center mt-4">Ensure your email for registration</h4>
                  <v-form>
                    <v-text-field
                      label="Email"
                      name="Email"
                      :rules="emailRule"
                      prepend-icon="mdi-email"
                      type="text"
                      color="teal accent-3"
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      color="teal accent-3"
                    />
                  </v-form>
                  <h3 class="text-center mt-4">Forgot your password ?</h3>
                </v-card-text>
                <div class="text-center mt-3">
                  <v-btn rounded color="teal accent-3" dark>SIGN IN</v-btn>
                  <div style="padding: 1vh 0"></div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="Register">
            <!-- rigister -->
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                  <h4 class="text-center mt-4">Ensure your email for registration</h4>
                  <v-form>
                    <v-text-field
                      label="Name"
                      name="Name"
                      prepend-icon="mdi-account"
                      type="text"
                      color="teal accent-3"
                    />
                    <div style="display: flex; align: center">
                      <v-text-field
                        label="Email"
                        name="Email"
                        :rules="emailRule"
                        prepend-icon="mdi-email"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-btn elevation="2" color="yellow" rounded large medium>send code</v-btn>
                    </div>
                    <v-text-field
                      id="resetCode"
                      label="Code"
                      name="resetCode"
                      prepend-icon="mdi-counter"
                      type="text"
                      color="teal accent-3"
                    />
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      color="teal accent-3"
                    />
                  </v-form>
                </v-card-text>
                <div class="text-center mt-n5">
                  <v-btn rounded color="teal accent-3" dark>SIGN UP</v-btn>
                  <div style="padding: 1vh 0"></div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="Forget">
            <!-- rigister -->
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">Forget Password</h1>
                  <h4 class="text-center mt-4">find your password with your email</h4>
                  <v-form>
                    <div style="display: flex; align: center">
                      <v-text-field
                        label="Email"
                        name="Email"
                        :rules="emailRule"
                        prepend-icon="mdi-email"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-btn elevation="2" color="yellow" rounded large medium>send vertify</v-btn>
                    </div>
                    <v-text-field
                      id="resetCode"
                      label="Reset Code"
                      name="resetCode"
                      prepend-icon="mdi-counter"
                      type="text"
                      color="teal accent-3"
                    />
                    <v-text-field
                      id="password"
                      label="New Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      color="teal accent-3"
                    />
                  </v-form>
                </v-card-text>
                <div class="text-center mt-n5">
                  <v-btn rounded color="teal accent-3" dark>Reset</v-btn>
                  <div style="padding: 1vh 0"></div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

interface MainPageContentState {
  openDialog: boolean; // 打开对话框
  accountProp: string[]; // tab的名称
  tabNum: string; // tab的个数
  emailRule: any;
}

export default Vue.extend<MainPageContentState, {}, {}, {}>({
  name: 'mainPageContent',
  data: () => ({
    openDialog: false,
    accountProp: ['Login', 'Register', 'Forget'],
    tabNum: 'tab-3',
    emailRule: [
      (value: any) => !!value || 'Required.',
      (value: any) => (value || '').length <= 20 || 'Max 20 characters',
      (value: any) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    ],
  }),

  watch: {},

  methods: {},
});
</script>
