<template>
  <div class="searchBar">
    <v-text-field label="搜索框" v-model.trim="searchContent" @keyup.enter.native="toSearchGoods">
      <v-icon class="search-icon" slot="append" @click="toSearchGoods">mdi-magnify</v-icon>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface SearchBarState {
  searchContent: string; // 搜索框输入的内容
  pageSize: number; //  一页多少个商品
  pageNum: number; // 第几页
}

interface SearchBarMethod {
  /**
   * 跳转搜索页面
   * */
  toSearchGoods(): void;
}

export default Vue.extend<SearchBarState, SearchBarMethod, {}, {}>({
  name: 'SearchBar',
  data: () => ({
    searchContent: '',
    pageSize: 10,
    pageNum: 0,
  }),

  mounted() {
    this.searchContent = this.$store.getters.searchWhat;
  },

  methods: {
    toSearchGoods(): void {
      // 如果不在搜索页
      const url: string[] = window.location.href.split('/');
      for (let i = 0; i < url.length; i += 1) {
        // if (url[i])
      }
      if (this.searchContent !== '') {
        this.$router.push({
          path: `/search/${this.searchContent}/`,
        });
        this.$store.commit('searchGood', this.searchContent);
      }
    },
  },
});
</script>

<style scoped>
.search-icon {
  cursor: pointer;
}
</style>
