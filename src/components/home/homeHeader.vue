<template>
  <!-- 轮播图 -->
  <v-carousel class="header" cycle hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item @click="seeGoodDetail(item.gid)" v-for="item in headerGoods" :key="item.gid">
      <v-img max-height="400px" :src="item.picUrl"></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue';
import { getHeader } from '@/utils/http/good/goodHeader';
import { GoodProp } from '@/utils/http/good/goodList';

interface HomeHeaderState {
  headerGoods: GoodProp[]; // 四张图片
}

interface HomeHeaderMethod {
  /**
   * 获取顶部轮播图信息
   */
  getHeaderInfo(): void;

  /**
   * 查看物品详细信息
   */
  seeGoodDetail(id: number): void;
}

export default Vue.extend<HomeHeaderState, HomeHeaderMethod, {}, {}>({
  name: 'home-main',
  data(): HomeHeaderState {
    return {
      headerGoods: [],
    };
  },

  watch: {},

  methods: {
    getHeaderInfo(): void {
      getHeader()
        .then((res) => {
          this.headerGoods = res;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
    seeGoodDetail(id: number): void {
      this.$router.push({
        path: `/good/${id}`,
      });
    },
  },
  mounted() {
    this.getHeaderInfo();
  },
});
</script>

<style lang="scss">
.header {
  cursor: pointer;
  height: auto !important;
  .v-carousel__item {
    height: auto !important;
  }
}
</style>
