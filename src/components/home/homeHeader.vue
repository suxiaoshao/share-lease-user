<template>
  <!-- 轮播图 -->
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      @click="seeGoodDetail(item.gid)"
      class="home-header"
      v-for="(item, i) in fourImgItems"
      :key="i"
      :src="item.picUrl"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue';
import { getHeader } from '@/utils/http/goodHeader';

interface HomeHeaderState {
  colors: string[]; // 轮播图颜色
  slides: string[]; // 轮播图内容
  fourImgItems: any; // 四张图片
}

interface HomeHeaderMethod {
  /**
   * 获取顶部轮播图信息
   */
  getCrouselInfo(): void;

  /**
   * 查看物品详细信息
   */
  seeGoodDetail(id: number): void;
}

export default Vue.extend<HomeHeaderState, HomeHeaderMethod, {}, {}>({
  name: 'home-main',
  data: () => ({
    colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
    slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    fourImgItems: [
      {
        gid: 2,
        name: '笔记本',
        type: '电子器件',
        rent: 6.2,
        price: 22.19,
        picUrl: 'http://software.remotehost.icu/file/143ddf10-b02c-4997-8b92-95e31470e33e.jpeg',
        info: '无用的东西',
        mid: 1,
      },
      {
        gid: 1,
        name: '笔记本',
        type: '电子器件',
        rent: 12.1,
        price: 44.3,
        picUrl: 'http://software.remotehost.icu/file/cd49300e-cce7-4645-87fd-4404971b21fa.jpeg',
        info: '有用的东西',
        mid: 1,
      },
      {
        gid: 8,
        name: '笔记本_3060',
        type: '电子器件',
        rent: 12.1,
        price: 44.3,
        picUrl: 'http://software.remotehost.icu/file/e0492b26-f22e-4b49-a4e4-12b93dd75588.jpeg',
        info: '3060?不存在的',
        mid: 2,
      },
      {
        gid: 9,
        name: '笔记本_3060',
        type: '电子器',
        rent: 12.1,
        price: 44.3,
        picUrl: 'http://software.remotehost.icu/file/e0492b26-f22e-4b49-a4e4-12b93dd75588.jpeg',
        info: '3060?不存在的',
        mid: 2,
      },
      {
        gid: 3,
        name: '龙虾笔记本',
        type: '电子器件',
        rent: 11.33,
        price: 99.36,
        picUrl: 'http://software.remotehost.icu/file/e0492b26-f22e-4b49-a4e4-12b93dd75588.jpeg',
        info: 'useful',
        mid: 1,
      },
    ],
  }),

  watch: {},

  methods: {
    getCrouselInfo(): void {
      getHeader()
        .then((res) => {
          console.log(res);
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
    this.getCrouselInfo();
  },
});
</script>

<style lang="scss">
.home-header {
  cursor: pointer;
}
</style>
