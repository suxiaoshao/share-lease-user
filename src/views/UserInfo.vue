<template>
  <main-page> <userProfileContent></userProfileContent> </main-page>
</template>

<script lang="ts">
import Vue from 'vue';
import MainPage from '@/components/common/mainPage.vue';
import userProfileContent from '@/components/common/navBar/drawer/userProfile/userProfileContent.vue';

export default Vue.extend({
  name: 'UserInfo',
  components: { MainPage, userProfileContent },
});
</script>

<style lang="scss" scoped></style>
