<script setup lang="ts">
import {ref, type PropType} from 'vue'

const props = defineProps({
  'callback:MouseMove':{
    type: Function as PropType<(e: MouseEvent, rect: DOMRect)=>void>,
    default: null
  },
  sensitivity:{
    type: Number,
    default: 16
  }
});

const card = ref<HTMLElement | null>(null);
const sensitivity = props.sensitivity;
const Callbacks = {
  MouseMove: props["callback:MouseMove"],
}

let rect = new DOMRect();

function AnimateTransform(rotateX: number, rotateY: number) {
  if (card.value)
    card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function OnMouseMove(e: MouseEvent) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  requestAnimationFrame(() => {
    AnimateTransform(Math.floor(-((e.clientY - centerY) / sensitivity)), Math.floor((e.clientX - centerX) / sensitivity))
    Callbacks.MouseMove(e, rect);
  });
}

function UpdateRect() {
  if (card.value)
    rect = card.value.getBoundingClientRect()
}

function ResetTransform() {
  if (card.value)
    card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

</script>

<template>
  <div class="card-3d-container" @mousemove="OnMouseMove" @mouseenter="UpdateRect" @mouseleave="ResetTransform">
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
