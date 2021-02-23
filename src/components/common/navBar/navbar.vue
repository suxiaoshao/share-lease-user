<template>
  <!-- 导航栏 -->
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawerOpen = true"></v-app-bar-nav-icon>

      <v-toolbar-title>在线租赁</v-toolbar-title>
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

export default Vue.extend<NavBarState, {}, {}, {}>({
  data(): NavBarState {
    return {
      drawerOpen: false,
    };
  },

  watch: {},

  components: {
    Drawer,
  },
  name: 'navbar',
});
</script>

<style></style>
