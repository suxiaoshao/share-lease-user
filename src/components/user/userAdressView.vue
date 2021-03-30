<template>
  <v-timeline align-top dense>
    <!-- 用户的几个地址展示 -->
    <v-timeline-item small color="red" v-for="item in addressAll" :key="item.aid">
      <div>
        <div class="font-weight-normal">
          <strong>收件人：</strong>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.town
          }}{{ item.address }}
        </div>
        <div class="font-weight-normal"><strong>手机号：</strong>{{ item.phone }}</div>
        <div class="font-weight-normal"><strong>收件人：</strong>{{ item.name }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/user/getInfo';
import { getUserAddress } from '@/utils/http/user/getAddress';
import { UserAdress } from '@/utils/http/user/addNewAddress';

interface UserAdressViewCompute {
  userInfo: UserInfo;
}

interface UserAdressViewState {
  /**
   * 地址列表
   */
  addressAll: UserAdress[];
}

export default Vue.extend<UserAdressViewState, {}, UserAdressViewCompute, {}>({
  name: 'userInfoView',
  computed: {
    userInfo(): UserInfo {
      return this.$store.state.userInfo;
    },
  },
  data(): UserAdressViewState {
    return {
      addressAll: [],
    };
  },
  mounted() {
    // 获取用户所有地址
    getUserAddress()
      .then((res) => {
        console.log('user adress');
        console.log(res);
        this.addressAll = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<style scoped lang="scss"></style>
