<template>
  <div class="good-main">
    <v-card class="mx-auto" dark>
      <v-img :src="goodInfo.picUrl" max-height="500px"></v-img>

      <v-card-title> {{ goodInfo.name }} </v-card-title>

      <v-card-subtitle> 店铺：【{{ goodInfo.merchant.name }}】 {{ goodInfo.merchant.info }}</v-card-subtitle>

      <v-card-text>
        <p>商品简介：{{ goodInfo.info }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn text>
          <v-icon>{{ 'mdi-currency-cny' }}</v-icon>
          价格：{{ goodInfo.price }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="orange" @click="addToCart">
          <v-icon @click="addToCart">mdi-cart</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-actions v-for="item in goodInfo.rents" :key="item.rid">
        <v-btn text>
          <v-icon @click="addToCart">mdi-currency-cny</v-icon>
          租金：{{ item.rent }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon @click="addToCart">mdi-currency-cny</v-icon>
          定金：{{ item.pledge }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text>租用时间： {{ item.time / 60 / 60 / 24 }}天</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success">
          <v-icon @click="addToCart">mdi-cart</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div>
          <v-divider></v-divider>

          <v-card-text>
            <p>类型： {{ goodInfo.type }}</p>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { good } from '@/utils/http/good/good';
import { GoodProp } from '@/utils/http/good/goodList';

interface GoodMainMethod {
  /**
   * 解析url参数
   */
  parseGoodArgs(): void;

  /**
   * 添加物品到购物车
   */
  addToCart(): void;
}

interface GoodMainState {
  /**
   * 商品的id
   */
  goodID: string;
  /**
   * 商品信息
   */
  goodInfo: GoodProp | null;
}

export default Vue.extend<GoodMainState, GoodMainMethod, {}, {}>({
  name: 'goodMain',

  mounted() {
    // get good info | if no gid , use gid=1
    this.parseGoodArgs();
    good(Number(this.goodID))
      .then((res) => {
        console.log(res);
        this.goodInfo = res;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  },

  data(): GoodMainState {
    return {
      goodID: '1',
      goodInfo: null,
    };
  },

  methods: {
    parseGoodArgs() {
      const url = location.href; //获取url中"?"符后的字串
      console.log(url);
      const urls = url.split('/');
      console.log(urls);
      for (let i = 0; i < urls.length; i += 1) {
        if (urls[i] === 'good' && i + 1 < urls.length) {
          this.goodID = urls[i + 1];
        }
      }
    },
    addToCart() {
      console.log('addd');
      this.$store.commit('updateCartGoods', {
        good: this.goodInfo,
        method: 1,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.good-main {
  width: 100%;
  height: 100%;
}
</style>
