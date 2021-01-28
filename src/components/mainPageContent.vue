<template>
  <div class="main-page">
    <v-container fluid>
      <!-- 轮播图 -->
      <div class="carousel-wrapper">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="four-imgs">
        <v-main class="white lighten-2">
          <v-container>
            <v-row>
              <v-col v-for="n in 4" :key="n" class="flex-wrap child-flex" cols="3">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </div>
      <div class="content-bottom-divider">
        <strong>INSTAGRAM</strong>
        <v-divider></v-divider>
      </div>
      <div class="content-bottom">
        <div class="bottom-left-imgs">
          <v-row>
            <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </div>
        <div class="bottom-right-viwer">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'mainPageContent',
  data: () => ({
    colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
    slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    alignments: ['start', 'center', 'end'],
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),

  watch: {},

  methods: {},
});
</script>

<style>
.main-page {
  margin: 0 auto;
  margin-top: 1vh;
}

.carousel-wrapper {
  margin-top: 2vh;
}

.content-bottom-divider {
  margin: 2vh 0;
}

.content-bottom {
  margin-top: 2vh;
  display: flex;
  /* display: flex; */
}

.content-bottom .bottom-left-imgs {
  width: 48%;
}

.content-bottom .bottom-right-viwer {
  width: 48%;
  padding: 1rem;
  padding-top: 0;
}
</style>
