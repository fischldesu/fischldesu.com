<script setup lang="ts">
import CAcrylicCard3D from "@/components/CAcrylicCard3D.vue";
</script>

<template>
  <div class="home">
    <section class="page">
      <div class="bar">
        <CAcrylicCard3D >
          <div id="card1" class="bar-item">
            A
          </div>
        </CAcrylicCard3D>
        <CAcrylicCard3D>
          <div id="card2"  class="bar-item">
            B
          </div>
        </CAcrylicCard3D>
      </div>
    </section>
    <section style="height:100vh">
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  margin-top: calc(0px - var(--header-height));
  padding-top: var(--header-height);
}

section:first-child {
  margin-top: calc(0px - var(--header-height));
  padding-top: var(--header-height);
  min-height: 100vh;
  background-image: url("https://static.fischldesu.com/img/121757860.jpg");
  background-position: 40%;
  background-size: cover;
}

.bar {
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.bar .bar-item {
  width: 256px;
  height: 128px;
}

</style>
