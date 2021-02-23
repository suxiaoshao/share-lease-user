<template>
  <div class="search-result-content">
    <!-- search bar -->
    <v-container fluid align="center" justify="center">
      <v-row class="fill-height ma-0 mx-auto search-part" align="center" justify="center">
        <!-- 搜索框 -->
        <v-col>
          <searchBar></searchBar>
        </v-col>
      </v-row>
      <v-row class="search-settings">
        <!-- 搜索设置 -->
        <!-- 等待完善........... -->
        <v-col> </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="flex-child good-list">
        <v-col class="d-flex" cols="16">
          <v-row class="ma-n3">
            <v-col cols="3" v-for="item in goodList" :key="item.gid">
              <v-sheet rounded class="d-flex" elevation="3" height="250">
                <goodsItem :goodInfo="item"></goodsItem>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { search } from '@/utils/http/search';
import { GoodProp } from '@/utils/http/goodList';
import searchBar from '@/components/search/searchBar.vue';
import goodsItem from '@/components/common/goodsItem.vue';

interface SearchResultContentState {
  goodList: Array<GoodProp>; // 搜索的商品列表
}

interface SearchResultContentMethod {
  /*
   * 搜索货物
   * */
  searchGoods(): void;
}

export default Vue.extend<SearchResultContentState, SearchResultContentMethod, {}, {}>({
  name: 'searchResultContent',

  data: () => ({
    goodList: [],
  }),

  components: { searchBar, goodsItem },

  mounted() {
    this.searchGoods();
  },

  methods: {
    searchGoods(): void {
      const url: string[] = window.location.href.split('/');
      console.log(url);
      const keyword = url[url.length - 1];
      search(keyword)
        .then((res) => {
          this.goodList = res;
          console.log(this.goodList);
        })
        .catch((res: Error) => {
          console.log(res);
        });
    },
  },

  watch: {
    $route() {
      // keyword改变会触发
      // 若是跳转到其他页面则不会触发
      this.searchGoods();
    },
  },
});
</script>

<style lang="scss" scoped>
.search-result-content {
  .search-part {
    width: 70%;
    margin: 0 auto;

    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }

  .good-list {
    margin: 0 auto;
  }
}
</style>
