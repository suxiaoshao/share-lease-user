<template>
  <v-card class="main rounded-0">
    <v-img height="200px" src="https://pic3.zhimg.com/80/v2-71313924e593f601e3a3acb9344feb0b_r.jpg">
      <v-card-title class="white--text mt-8">
        <v-avatar size="100">
          <img alt="user" :src="avatar" />
        </v-avatar>
        <p class="ml-3">{{ userName }}</p>
      </v-card-title>
    </v-img>

    <v-card-text class="card-main">
      <div class="font-weight-bold ml-8 mb-2">
        账户信息
        <user-edit></user-edit>
      </div>

      <user-info-view></user-info-view>
      <reset-password></reset-password>
      <user-adress-view></user-adress-view>
      <user-adress-edit></user-adress-edit>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/user/getInfo';
import UserInfoView from '@/components/user/userInfoView.vue';
import UserEdit from '@/components/user/userEdit.vue';
import UserAdressEdit from '@/components/user/userAdressAdd.vue';
import UserAdressView from '@/components/user/userAdressView.vue';
import ResetPassword from '@/components/user/resetPassword.vue';

interface UserProfileContentCompute {
  /**
   * 用户名
   * */
  userName: string;
  /**
   * 头像
   * */
  avatar: string;
}

export default Vue.extend<{}, {}, UserProfileContentCompute, {}>({
  name: 'user-main',

  components: { ResetPassword, UserEdit, UserInfoView, UserAdressEdit, UserAdressView },
  computed: {
    userName(): string {
      return (this.$store.state.userInfo as UserInfo).username;
    },
    avatar(): string {
      return (
        (this.$store.state.userInfo as UserInfo).avatar ??
        'https://pic2.zhimg.com/v2-f857d3d8e4355df7d83a586ad564fc37_xl.jpg'
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  .card-main {
    padding: 20px 15% 0 15%;
    @media screen and (max-width: 960px) {
      padding: 0;
    }
  }
}
</style>
