<template>
  <v-navigation-drawer app :value="drawerOpen" fixed temporary @input="close">
    <v-list nav dense>
      <v-list-item>
        <searchBar></searchBar>
      </v-list-item>
      <userAccount v-if="!$store.getters.isLogin"></userAccount>
      <v-list-item-group :value="name" active-class="deep-purple--text text--accent-4">
        <v-list-item value="Home" @click="pushRouter('Home')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          首页
        </v-list-item>
        <v-list-item v-if="$store.getters.isLogin" value="User" @click="pushRouter('User')">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          账户信息
        </v-list-item>
        <v-list-item value="Search" @click="pushRouter('Search')">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          搜索
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import searchBar from '@/components/search/searchBar.vue';
import userAccount from '@/components/common/navbar/drawer/userAccount/userAccount.vue';

interface DrawerMethod {
  /**
   * 关闭侧栏
   * */
  close(ev: boolean): void;

  /**
   * 跳转至指定页面
   * */
  pushRouter(name: string): void;
}

interface DrawerCompute {
  /**
   * 路由的名字
   * */
  name: string;
}

export default Vue.extend<{}, DrawerMethod, DrawerCompute, {}>({
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
    pushRouter(name: string): void {
      if (name !== this.name) {
        this.$router.push({
          name: name,
        });
      }
    },
  },
  computed: {
    name: function (): string {
      return this.$route.name ?? '';
    },
  },
});
</script>

<style scoped lang="scss"></style>
