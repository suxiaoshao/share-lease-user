<template>
  <div class="goodsItem">
    <v-hover v-slot="{ hover }">
      <v-card class="mx-auto" color="grey lighten-4" max-width="600" @click="toGoodDetail">
        <v-img :aspect-ratio="16 / 9" :src="goodInfo.picUrl">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
              style="height: 100%"
            >
              ￥{{ goodInfo.price }}
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-text class="pt-6" style="position: relative">
          <v-btn @click.stop="addToCart" absolute color="orange" class="white--text" fab large right top>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <h3 class="display-1 font-weight-light orange--text mb-2">{{ goodInfo.name }}</h3>
          <div class="font-weight-light title mb-2">
            {{ goodInfo.info }}
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { GoodProp } from '@/utils/http/good/goodList';

interface GoodItemMethod {
  /**
   * 添加物品到购物车
   */
  addToCart(): void;

  /**
   * 查看物品详情
   */
  toGoodDetail(): void;
}

interface GoodItemProp {
  goodInfo: GoodProp;
}

export default Vue.extend<{}, GoodItemMethod, {}, GoodItemProp>({
  name: 'goodItem',
  props: {
    goodInfo: Object as PropType<GoodProp>,
  },

  methods: {
    addToCart() {
      console.log('add to cart');
    },
    toGoodDetail() {
      console.log('good detail');
      this.$router.push({
        path: `/good/${this.goodInfo.gid}`,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.goodsItem {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
