<template>
  <div class="search-result-content">
    <!-- search bar -->
    <v-container fluid justify="center">
      <v-row class="fill-height ma-0 mx-auto search-part" align="center" justify="center">
        <!-- 搜索框 -->
        <v-col>
          <searchBar></searchBar>
        </v-col>
      </v-row>
      <!-- 搜索设置 -->
      <v-row class="fill-height ma-0 mx-auto search-part" align="center" justify="center">
        <v-expansion-panels dark>
          <v-expansion-panel>
            <v-expansion-panel-header> 搜索设置 </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row align="center" clsss="fill-height ma-0 mx-auto" justify="center">
                <!-- 排序方式 -->
                <v-col cols="4">
                  <v-select :items="['ASC', 'DESC']" label="排序方式" v-model="searchProp.oderRule"></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select :items="['price']" label="排序依据" v-model="searchProp.orderBY"></v-select>
                </v-col>
              </v-row>
              <v-row align="center" clsss="fill-height ma-0 mx-auto" justify="center">
                <!-- 价格设置 -->
                <v-col cols="4">
                  <v-text-field v-model="minPrice" label="最低价格"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="maxPrice" label="最高价格"></v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" clsss="fill-height ma-0 mx-auto">
                <v-col cols="2"> </v-col>
                <v-col cols="4">
                  <v-btn @click="advancedSearch" color="orange">高级搜索</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
    <v-container>
      <div class="text-center page-nav">
        <v-btn dark @click="switchPage('before')">&lt;</v-btn>
        <v-btn dark @click="switchPage('after')">&gt;</v-btn>
      </div>
    </v-container>
    <my-snackbar v-model="message"></my-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { search } from '@/utils/http/search';
import { GoodProp } from '@/utils/http/goodList';
import searchBar from '@/components/search/searchBar.vue';
import goodsItem from '@/components/common/goodsItem.vue';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';

interface SearchResultContentState {
  goodList: Array<GoodProp>; // 搜索的商品列表
  searchProp: {
    keyword: string; // 搜索关键字
    pageSize: number; // 一页的商品数
    pageNum: number; // 页码
    oderRule: 'ASC' | 'DESC'; // 降序 / 升序
    orderBY: string; // 通过什么排序 默认price
    min: number; // 价格下限
    max: number; // 价格上限
    [key: string]: number | string;
  };
  minPrice: number; // 用于绑定用户输入的最低价格
  maxPrice: number; // 用于绑定用户输入的最高价格
  message: Message; // 消息条
}

interface SearchResultContentMethod {
  /*
   * 搜索货物
   * */
  searchGoods(): void;

  /*
   * 解析搜索请求参数
   * */
  parseSearchArgs(): void;

  /*
   * 验证价格是否设置正确
   * */
  advancedSearch(): void;

  /**
   * 打开消息条
   * */
  openMessage(message: string): void;

  /**
   * 下一页
   * */
  switchPage(dir: string): boolean;
}

export default Vue.extend<SearchResultContentState, SearchResultContentMethod, {}, {}>({
  name: 'searchResultContent',

  data: () => ({
    goodList: [],
    searchProp: {
      keyword: '',
      pageSize: 10,
      pageNum: 0,
      oderRule: 'ASC',
      orderBY: 'price',
      min: 0,
      max: 1000,
    },
    minPrice: 0,
    maxPrice: 1000,
    message: {
      message: '',
      open: false,
    },
  }),

  components: { searchBar, goodsItem, MySnackbar },

  mounted() {
    this.parseSearchArgs();
    this.searchGoods();
  },

  methods: {
    searchGoods(): void {
      search(
        this.searchProp.keyword,
        this.searchProp.pageSize,
        this.searchProp.pageNum,
        this.searchProp.oderRule,
        this.searchProp.orderBY,
        this.searchProp.min,
        this.searchProp.max,
      )
        .then((res) => {
          this.goodList = res;
          console.log(this.goodList);
        })
        .catch((res: Error) => {
          console.log(res);
        });
    },
    parseSearchArgs() {
      const url = location.search; //获取url中"?"符后的字串
      console.log(url);
      const rst = {};
      if (url.indexOf('?') != -1) {
        const str = url.substr(1);
        const parts = str.split('&');
        for (let i = 0; i < parts.length; i++) {
          const name: string = parts[i].split('=')[0];
          this.searchProp[name] = decodeURI(parts[i].split('=')[1]);
        }
      }
      return rst;
    },
    advancedSearch() {
      if (Number(this.minPrice) === 0) this.minPrice = 0;
      if (Number(this.maxPrice) === 0) this.maxPrice = 10000000000000;
      if (isNaN(Number(this.minPrice)) || isNaN(Number(this.maxPrice))) {
        this.openMessage('价格设置错误');
        return false;
      }
      this.searchProp.min = this.minPrice;
      this.searchProp.max = this.maxPrice;
      this.searchGoods();
    },
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    switchPage(dir): boolean {
      if (dir === 'before') {
        // 前一页
        if (this.searchProp.pageNum === 0) {
          // 已经是第一页
          this.openMessage('当前已经是第一页了！');
          return false;
        } else {
          this.searchProp.pageNum -= 1;
          this.searchGoods();
        }
      } else if (dir === 'after') {
        if (this.goodList.length === 0) {
          // 已经是最后一页了
          this.openMessage('当前已经是最后一页了！');
        } else {
          this.searchProp.pageNum += 1;
          this.searchGoods();
        }
      }
      return true;
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

  .page-nav {
    position: fixed;
    bottom: 3rem;
    left: 48%;
  }
}
</style>
