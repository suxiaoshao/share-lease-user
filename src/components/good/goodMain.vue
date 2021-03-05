<template>
  <div class="good-main">
    <v-container>
      <v-card class="mx-auto">
        <v-img contain class="white--text align-end" height="300px" :src="goodInfo.picUrl">
          <v-card-title>{{ goodInfo.name }}</v-card-title>
        </v-img>
        <v-card-subtitle class="pb-0">
          {{ goodInfo.info }}
        </v-card-subtitle>
        <v-card-text class="text--primary">
          <v-row align="center">
            <v-col cols="13" class="title">
              <div>
                售价： <strong>￥{{ goodInfo.price }}</strong>
              </div>
              <div>类型： {{ goodInfo.type }}</div>

              <div>
                租金：<strong>￥{{ goodInfo.rent }}</strong>
              </div>
            </v-col>
            <v-col cols="1">
              <v-btn color="orange" class="white--text" fab right top>
                <v-icon @click="addToCart">mdi-cart</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions></v-card-actions>
      </v-card>
      <!-- 如果以后有其他接口再写在这下面 -->
    </v-container>
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
  background-color: #a12a;
}
</style>
