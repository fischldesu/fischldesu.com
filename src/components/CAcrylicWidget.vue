<script setup lang="ts">

</script>

<template>
  <div class="acrylic widget acrylic-widget">
    <slot />
  </div>
</template>

<style scoped>
.acrylic-widget {
  transition: all 0.3s ease;
}
.acrylic-widget:hover{
  transform: scale(1.03);
}
</style>
