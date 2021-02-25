<template>
  <main-page>
    <searchResultContent></searchResultContent>
  </main-page>
</template>

<script lang="ts">
import Vue from 'vue';
import searchResultContent from '@/components/search/searchResultContent.vue';
import MainPage from '@/components/common/mainPage.vue';

export default Vue.extend({
  name: 'UserInfo',
  components: { MainPage, searchResultContent },
});
</script>

<style lang="scss" scoped></style>
