<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  MouseMoveCallback:{
    type: Function,
    default: null
  },
  Sensitivity:{
    type: Number,
    default: 16
  }
});

const card = ref<HTMLElement | null>(null);
const sensitivity = props.Sensitivity;

let rect: DOMRect | null = null

function updateTransform(rotateX: number, rotateY: number) {
  if (card.value)
    card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

function MouseMove(e: MouseEvent) {
  if(rect)
  {
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    requestAnimationFrame(() => {
      updateTransform(-((e.clientY - centerY) / sensitivity), (e.clientX - centerX) / sensitivity)
      if(props.MouseMoveCallback)
        props.MouseMoveCallback(e, rect);
    })
  }
}

function UpdateRect() {
  if (card.value)
    rect = card.value.getBoundingClientRect()
}

function resetTransform() {
  if (card.value)
    card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

onMounted(() => {
  UpdateRect()
  window.addEventListener('resize', UpdateRect);
  window.addEventListener('scroll', UpdateRect);
});

onUnmounted(() => {
  window.removeEventListener('resize', UpdateRect);
  window.removeEventListener('scroll', UpdateRect);
});

</script>

<template>
  <div class="card-3d-container" @mousemove="MouseMove" @mouseleave="resetTransform">
    <div ref="card" class="card-3d" @resize="UpdateRect">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-3d-container {
  display: inline-block;
  padding: 16px;
  transform-style: preserve-3d;
}

.card-3d {
  display: inline-block;
  transform: translateZ(0);
  transition: transform 0.3s ease-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.card-3d-container:hover .card-3d {
  transition: transform 0.1s ease-out;
}
</style>
