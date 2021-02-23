<template>
  <v-navigation-drawer app :value="drawerOpen" fixed temporary @input="close">
    <v-list nav dense>
      <v-list-item>
        <searchBar></searchBar>
        <!-- <v-text-field label="搜索框">
          <v-icon slot="append">mdi-magnify</v-icon>
        </v-text-field> -->
      </v-list-item>
      <userAccount v-if="!$store.getters.isLogin"></userAccount>
      <v-list-item-group :value="path" active-class="deep-purple--text text--accent-4">
        <v-list-item value="/" @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          首页
        </v-list-item>
        <v-list-item v-if="$store.getters.isLogin" value="/userInfo" @click="$router.push('/userInfo')">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          账户信息
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import userAccount from '@/components/common/navBar/drawer/userAccount/userAccount.vue';
import searchBar from '@/components/search/searchBar.vue';

interface DrawerMethod {
  /**
   * 关闭侧栏
   * */
  close(ev: boolean): void;
}

export default Vue.extend<{}, DrawerMethod, {}, {}>({
  name: 'drawer',
  components: {
    userAccount,
    searchBar,
  },
  props: {
    drawerOpen: Boolean as PropType<boolean>,
  },
  model: {
    prop: 'drawerOpen',
    event: 'change',
  },
  methods: {
    close(ev: boolean): void {
      this.$emit('change', ev);
    },
  },
  computed: {
    path: function (): string {
      return this.$route.path;
    },
  },
});
</script>

<style scoped lang="scss"></style>
