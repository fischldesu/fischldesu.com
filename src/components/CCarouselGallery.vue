<script setup lang="ts">
import {computed, type PropType, ref} from 'vue';

defineProps({
  Images: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  Height: {
    type: Number,
    default: 100
  },
});

const Transform = ref(0);

function MoveTo(percentage: number) {
  if(percentage < 0) percentage = 0;
  else if(percentage > 100) percentage = 100;

  Transform.value = percentage;
}

const containerX = computed(()=>{
  return `translateX(calc(${Transform.value + 60}vh - ${Transform.value}%))`;
})

defineExpose({
  MoveTo,
});

</script>

<template>
  <div class="carousel-gallery" :style="{ height: Height + '%'}">
    <div class="gallery-container" :style="{ transform: containerX }">
      <div v-for="image in Images" :key="image" :style="{ backgroundImage: `url(${image})`}"></div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  position: relative;
  height: 100%;
  width: fit-content;
  display: flex;
  gap: 1rem;
  justify-content: center;
  transition: all 0.1s ease;
}

.gallery-container > div{
  width: 20vw;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>
