<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppMusic from "@/components/AppMusic.vue";
import AppSettings from "@/components/AppSettings.vue";

import { useSettingsDialog } from "./elements";
const SettingsDialog = useSettingsDialog();
onMounted(()=>{
  SettingsDialog.value = document.getElementById('app-settings') as (HTMLDialogElement | null);
});

</script>

<template>
  <div id="header-ob" class="ob"></div>
  <AppHeader id="app-header"/>
  <main id="app-main">
    <AppMusic id="app-music"/>
    <RouterView class="view" />
  </main>
  <AppFooter id="app-footer" />
  <AppSettings id="app-settings" />
</template>

<style scoped>
#app-header {
  z-index: 10;
}

#app-main {
  z-index: 5;
}

</style>
