<template>
  <!-- 导航栏 -->
  <div>
    <v-app-bar app dark height="64">
      <v-app-bar-nav-icon @click="drawerOpen = true"></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor: pointer" @click="toMainPage">在线租赁</v-toolbar-title>
    </v-app-bar>

    <drawer v-model="drawerOpen"></drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Drawer from '@/components/common/navbar/drawer/drawer.vue';

interface NavBarState {
  /**
   * 是否打开侧栏
   * */
  drawerOpen: boolean;
}

interface NavBarMethod {
  /**
   * 回到主页
   */
  toMainPage(): void;
}

export default Vue.extend<NavBarState, NavBarMethod, {}, {}>({
  name: 'navbar',
  data(): NavBarState {
    return {
      drawerOpen: false,
    };
  },

  watch: {},

  components: {
    Drawer,
  },
  methods: {
    toMainPage(): void {
      this.$router.push({
        name: 'Home',
      });
    },
  },
});
</script>

<style></style>
