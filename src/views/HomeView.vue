<script setup lang="ts">
import { useAppBackgroundURL } from "@/elements";

import ICContactWidget from "@/components/ICContactWidget.vue";
import ICWeatherWidget from "@/components/ICWeatherWidget.vue";

const backgroundImgURL = useAppBackgroundURL().Ref;
const backgroundMinImgURL = useAppBackgroundURL().DefaultMinURL;

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
