<template>
  <div class="goodsItem">
    <v-hover v-slot="{ hover }">
      <v-card class="mx-auto" color="grey lighten-4" max-width="600">
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
          <v-btn absolute color="orange" class="white--text" fab large right top>
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
import { GoodProp } from '@/utils/http/goodList';

export default Vue.extend<{}, {}, {}, {}>({
  name: 'goodItem',
  props: {
    goodInfo: Object as PropType<GoodProp>,
  },
});
</script>

<style lang="scss" scoped>
.goodsItem {
  width: 100%;
  height: 100%;
}
</style>
