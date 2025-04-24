<script setup lang="ts">
import {computed} from "vue";
import { useAppBackgroundURL } from "@/elements";
import ICContactWidget from "@/components/ICContactWidget.vue";
import ICWeatherWidget from "@/components/ICWeatherWidget.vue";
import CScrollingView from "@/components/CScrollingView.vue";

const bgURL = useAppBackgroundURL().Ref;
const bgStyle = computed(()=>{
  return {
    backgroundImage: `url(${bgURL.value})`
  }
});

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
      <CScrollingView>
        
      </CScrollingView>
    </section>
    <div class="background-image" :style="bgStyle"></div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  margin-top: calc(0px - var(--header-height));
  padding-top: var(--header-height);
}

.home>.background-image {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -1;
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
