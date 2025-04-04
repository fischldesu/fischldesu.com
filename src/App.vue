<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <audio controls id="backgroundMusic"> </audio>
  <main>
    <RouterView class="view" />
  </main>
</template>

<style scoped>
  #backgroundMusic {
    position: absolute;
    z-index: -1 !important;
  }
</style>
