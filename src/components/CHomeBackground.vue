<script setup lang="ts">
  defineProps({
    VerticalPosition: {
      type: Number,
      default: 75
    }
  });
</script>

<template>
  <div id="HomeBackground" :style="`background-position: ${VerticalPosition}%;`"></div>
</template>

<style scoped>
  #HomeBackground {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/img/bg.png");
    background-position: 75%;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
