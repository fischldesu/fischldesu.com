<script setup lang="ts">
import {useAppBackgroundURL, useReference} from "@/elements";
import ICContactWidget from "@/components/ICContactWidget.vue";
import ICWeatherWidget from "@/components/ICWeatherWidget.vue";
import CScrollingView from "@/components/CScrollingView.vue";
import CCarouselGallery from "@/components/CCarouselGallery.vue";
import {ref} from "vue";

const backgroundImgURL = useAppBackgroundURL().Ref;
const backgroundMinImgURL = useAppBackgroundURL().DefaultMinURL;

const page2_gallery = useReference(CCarouselGallery);
const page2_gallery_images = ref(['']);

function scrolling_p1(geometry: DOMRect) {
  // const windowHeight = window.innerHeight;
  // const percentage = Math.max(0,
  //   Math.min(100,
  //     (windowHeight - geometry.top) / (windowHeight + geometry.height) * 100)) * 2;
  // requestAnimationFrame(()=> page2_gallery.value?.MoveTo(Math.floor(percentage)))
}


function LoadImages() {
  // fetch('https://static.fischldesu.com/img/fischl/list.json').then(
  //   data=>{ return data.json() }
  // ).then(json=>{
  //   page2_gallery_images.value = json.map((img:string) =>
  //     `https://static.fischldesu.com/img/fischl/${img}`);
  // });
}

LoadImages();

</script>

<template>
  <div class="home">
    <section class="page">
      <div class="bar">
        <ICWeatherWidget class="bar-widget"/>
        <ICContactWidget class="bar-widget"/>
      </div>
    </section>
    <section>
      <CScrollingView @ViewScrolling="scrolling_p1" style="height: 100vh">
        <CCarouselGallery ref="page2_gallery" :Images="page2_gallery_images" :Height="50" />
      </CScrollingView>
    </section>
    <div class="background-image-holder" :style="{backgroundImage: `url(${backgroundMinImgURL})`}">
      <div class="background-image" :style="{backgroundImage: `url(${backgroundImgURL})`}"></div>
    </div>
  </div>
</template>

<style scoped>
.home>.background-image-holder {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-position: 40%;
  background-size: cover;
}
.home>.background-image-holder>.background-image {
  width: 100%;
  height: 100%;
    background-position: 40%;
  background-size: cover;
}
.home>section:first-child {
  margin-top: calc(0px - var(--header-height));
  padding-top: var(--header-height);
  min-height: 100vh;
}

.bar {
  position: absolute;
  display: flex;
  bottom: 5vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  color: #2f2f2f;
}

.bar .bar-widget {
  width: 300px;
  height: 96px;
  z-index: 1;
  overflow: hidden;
}

</style>
