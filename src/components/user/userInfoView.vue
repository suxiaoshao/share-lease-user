<template>
  <v-timeline align-top dense>
    <v-timeline-item small color="red">
      <div>
        <div class="font-weight-normal"><strong>用户名</strong> {{ userInfo.username }}</div>
      </div>
    </v-timeline-item>
    <v-timeline-item small color="pink">
      <div>
        <div class="font-weight-normal"><strong>邮箱</strong> {{ userInfo.email }}</div>
      </div>
    </v-timeline-item>
    <v-timeline-item small>
      <div>
        <div class="font-weight-normal"><strong>手机号码</strong> {{ userInfo.phone }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/getInfo';

interface UserInfoViewCompute {
  userInfo: UserInfo;
}

export default Vue.extend<{}, {}, UserInfoViewCompute, {}>({
  name: 'userInfoView',
  computed: {
    userInfo(): UserInfo {
      return this.$store.state.userInfo;
    },
  },
});
</script>

<style scoped lang="scss"></style>
