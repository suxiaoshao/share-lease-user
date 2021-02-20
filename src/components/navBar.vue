<template>
  <!-- 导航栏 -->
  <div class="nav-bar">
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>SHARE LEASE USER</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-text-field>
              <v-icon slot="append">mdi-magnify</v-icon>
            </v-text-field>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <userAccount></userAccount>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-rename-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import userAccount from './userAccount/userAccount.vue';

interface NavBarState {
  drawer: boolean;
  group: null;
}

export default Vue.extend<NavBarState, {}, {}, {}>({
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {},

  components: {
    userAccount,
  },

  methods: {
    ...mapMutations(['openLeftBar']),
  },
});
</script>

<style>
.nav-bar {
  margin: 3rem auto 0;
}
</style>
