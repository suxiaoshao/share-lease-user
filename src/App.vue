<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>
<style lang="scss">
html {
  overflow-y: auto;
}
body,
#app {
  overflow: hidden !important;
  height: 100%;
  width: 100%;
}
</style>
