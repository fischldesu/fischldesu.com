<script lang="ts">
  export const Name = "music";
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CButton :Type="ButtonType.Text"></CButton>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
import CButton, { ButtonType } from "@/components/CButton.vue";
</script>
