<script setup lang="ts">
import CAcrylicCard3D from "@/components/CAcrylicCard3D.vue";
</script>

<template>
  <div class="home">
    <section class="page">
      <div class="bar">
        <CAcrylicCard3D class="bar-item-container" :sensitivity="32">
          <div id="card1" class="bar-item">

          </div>
        </CAcrylicCard3D>
      </div>
    </section>
    <section style="height:100vh">
    </section>
    <div class="background-image"></div>
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
  background-image: url("https://static.fischldesu.com/img/121757860.jpg");
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
}

.bar .bar-item {
  width: 300px;
  height: 96px;
  z-index: 1;
}

</style>
