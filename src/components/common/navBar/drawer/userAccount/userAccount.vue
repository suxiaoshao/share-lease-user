<template>
  <!-- 登录 注册 忘记密码 -->
  <v-dialog v-model="openDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title color="primary" dark v-bind="attrs">账户登陆</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-toolbar dark flat>
        <v-btn icon dark @click="openDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>账户</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs v-model="tabNum" centered slider-color="yellow">
            <v-tab href="#Login">登陆</v-tab>
            <v-tab href="#Register">注册</v-tab>
            <v-tab href="#Forget">忘记密码</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tabNum">
        <!-- 登录  -->
        <login @ok="openDialog = false" />
        <!-- 注册  -->
        <register @ok="tabNum = 'Login'" />
        <forget @ok="tabNum = 'Login'" />
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from '@/components/common/navbar/drawer/userAccount/login.vue';
import Register from '@/components/common/navbar/drawer/userAccount/register.vue';
import Forget from '@/components/common/navbar/drawer/userAccount/forget.vue';

interface UserAccountState {
  /**
   * @description 打开对话框
   * @author sushao
   * */
  openDialog: boolean;
  /**
   * @description tab的名称
   * @author sushao
   * */
  accountProp: string[];
  /**
   * @description tag个数
   * @author sushao
   * */
  tabNum: string; // tab的个数
}

export default Vue.extend<UserAccountState, {}, {}, {}>({
  name: 'userAccount',
  components: { Forget, Register, Login },
  data(): UserAccountState {
    return {
      openDialog: false,
      accountProp: ['Login', 'Register', 'Forget'],
      tabNum: 'Login',
    };
  },
  watch: {},
});
</script>
