<template>
  <!-- 导航栏 -->
  <div class="nav-bar">
    <v-app-bar color="white" light flat>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <h2>SHARE LEASE USER</h2>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
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
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

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
