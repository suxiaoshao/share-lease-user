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
          <!-- 登录 -->
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
                      v-model="loginEmail"
                      :rules="emailRule"
                      prepend-icon="mdi-email"
                      type="text"
                      color="teal accent-3"
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      :rules="pwdRule"
                      v-model="loginPwd"
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
                      :rules="nameRule"
                      v-model="registerName"
                      type="text"
                      color="teal accent-3"
                    />
                    <div style="display: flex; align: center">
                      <v-text-field
                        label="Email"
                        name="Email"
                        v-model="registerEmail"
                        :rules="emailRule"
                        prepend-icon="mdi-email"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-btn elevation="2" color="yellow" @click="getCode(this.registerEmail)" rounded large medium
                        >send code</v-btn
                      >
                    </div>
                    <v-text-field
                      id="resetCode"
                      label="Code"
                      name="resetCode"
                      v-model="registerCode"
                      prepend-icon="mdi-counter"
                      type="text"
                      color="teal accent-3"
                    />
                    <v-text-field
                      id="password"
                      label="Password"
                      :rules="pwdRule"
                      v-model="registerPwd"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      color="teal accent-3"
                    />
                  </v-form>
                </v-card-text>
                <div class="text-center mt-n5">
                  <v-btn rounded color="teal accent-3" @click="registerAccount" dark>SIGN UP</v-btn>
                  <div style="padding: 1vh 0"></div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="Forget">
            <!-- Forget -->
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
                        v-model="resetEmail"
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
                      v-model="resetCode"
                      name="resetCode"
                      prepend-icon="mdi-counter"
                      type="text"
                      color="teal accent-3"
                    />
                    <v-text-field
                      id="password"
                      label="New Password"
                      name="password"
                      v-model="resetPwd"
                      :rules="pwdRule"
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
import { mail } from '../utils/http/mail';
import { register } from '../utils/http/register';
import { login } from '../utils/http/login';
import { resetPwdMail } from '../utils/http/resetPwdMail';
import { resetPassword } from '../utils/http/resetPassword';

interface MainPageContentState {
  openDialog: boolean; // 打开对话框
  accountProp: string[]; // tab的名称
  tabNum: string; // tab的个数
  emailRule: any; // 邮箱规则
  pwdRule: any; // 密码规则
  nameRule: any; // 用户名规则
  // 登录 ///////
  loginEmail: string;
  loginPwd: string;
  //////////////
  // 注册 //////
  registerEmail: string;
  registerPwd: string;
  registerCode: string;
  registerName: string;
  /////////////
  // 找回密码 //
  resetEmail: string;
  resetPwd: string;
  resetCode: string;
  /////////////
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
    pwdRule: [
      (value: any) => !!value || 'Required.',
      (value: any) => (value || '').length <= 20 || 'Max 20 characters',
      (value: any) => (value || '').length >= 6 || 'Min 6 characters',
      (value: any) => {
        const pattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![-=+@.!#$%^&;:'"*_.,]+$)[\da-zA-Z-=+_.@.!#$%^&;:'"*,]{6,20}$/;
        return pattern.test(value) || 'Invalid Password';
      },
    ],
    nameRule: [
      (value: any) => !!value || 'Required.',
      (value: any) => (value || '').length <= 16 || 'Max 16 characters',
      (value: any) => (value || '').length >= 4 || 'Min 4 characters',
      (value: any) => {
        const pattern = /^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/;
        return pattern.test(value) || 'Invalid Username';
      },
    ],
    loginEmail: '',
    loginPwd: '',
    registerEmail: '',
    registerPwd: '',
    registerCode: '',
    registerName: '',
    resetEmail: '',
    resetPwd: '',
    resetCode: '',
  }),

  watch: {},

  methods: {
    async getCode(email: string, methods: number): Promise<void> {
      // 获取邮箱验证码
      if (this.emailRule[2](email) === true) {
        // 邮箱格式正确
        let res: any;
        if (methods === 1) {
          // 注册
          res = await mail(email);
        } else if (methods === 2) {
          // 重置
          res = await resetPwdMail(email);
        }
        console.log(res);
        switch (res.status) {
          case 1002:
            // 邮箱已注册
            break;
          case 0:
            // 验证码发送成功
            break;
        }
      } else {
        // 提示邮箱错误
      }
    },
    async registerAccount(): Promise<void> {
      // 注册账户
      if (
        this.emailRule[2](this.registerEmail) === true &&
        this.nameRule[3](this.registerName) === true &&
        this.pwdRule[3](this.registerPwd) === true
      ) {
        const res = await register(this.registerName, this.registerPwd, this.registerEmail, this.registerCode);
        console.log(res);
        switch (res.status) {
          case 1001:
            // 找不到邮箱验证码
            break;
          case 0:
            // 成功
            break;
        }
      }
    },
    async loginAccount(): Promise<void> {
      // 登录
      if (this.emailRule[2](this.loginEmail) === true && this.pwdRule[3](this.loginPwd) === true) {
        const res = await login(this.loginEmail, this.loginPwd);
        switch (res.status) {
          case 0:
            // 登录成功
            break;
          case 1001:
            // 密码错误
            break;
        }
      } else {
        // 表单不完整
      }
    },
    async resetPassword(): Promise<void> {
      // 找回账户
      if (
        this.emailRule[2](this.resetEmail) === true &&
        this.pwdRule[3](this.resetPwd) === true &&
        this.resetCode !== ''
      ) {
        // 发送重置请求
        const res = await resetPassword(this.resetEmail, this.resetPwd, this.resetCode);
        console.log(res);
        switch (res.status) {
          case 1001:
            // 邮箱验证码错误
            break;
          default:
            // success
            break;
        }
      }
    },
  },
});
</script>
