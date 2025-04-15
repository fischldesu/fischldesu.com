<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppMusic from "@/components/AppMusic.vue";

</script>

<template>
  <div id="header-ob" class="ob"></div>
  <AppHeader id="app-header"/>
  <main id="app-main">
    <AppMusic id="app-music"/>
    <RouterView class="view" />
  </main>
  <AppFooter id="app-footer" />
</template>

<style scoped>
#app-header {
  z-index: 10;
}

#app-main {
  z-index: 5;
}

</style>
