<script setup lang="ts">
import { ref } from "vue";

const instance = ref<HTMLElement | null>(null)

defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  hoverFlip: {
    type: Boolean,
    default: true
  },
  transition: {
    type: Number,
    default: 0.4
  }
});

defineExpose({
  ToggleFlip: ()=>{
    instance.value?.toggleAttribute('flip');
    return instance.value?.hasAttribute('flip') ?? false;
  }
})

</script>

<template>
  <div ref="instance" class="flip-card" :class="{ 'hover-flip': hoverFlip }">
    <div class="flip-card-holder" :class="{ vertical: vertical }" :style="{ transitionDuration: `${transition}s` }">
      <div class="flip-card-face flip-card-content">
        <slot></slot>
      </div>
      <div class="flip-card-back flip-card-content" :class="{ vertical: vertical }">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1024px;
}

.flip-card>.flip-card-holder {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition-property: transform;
  transition-timing-function: ease-in-out;
}

.flip-card[flip]>.flip-card-holder,
.flip-card.hover-flip:hover>.flip-card-holder {
  transform: rotateY(180deg);
}

.flip-card[flip]>.flip-card-holder.vertical,
.flip-card.hover-flip:hover>.flip-card-holder.vertical {
  transform: rotateX(180deg);
}

.flip-card-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 8px;
}

.flip-card-content>* {
  width: 100%;
  height: 100%;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-card-back.vertical {
  transform: rotateX(180deg);
}

</style>
