<template>
  <div :class="cn('[perspective:1000px]', props.class)" class="card">
    <div class="card-inner">
      <div class="card-front">
        <slot />
      </div>
      <div class="card-back">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface FlipCardProps {
  rotate?: "x" | "y";
  class?: string;
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: "y",
});
</script>

<style scoped>
.card {
  min-width: 100px;
  min-height: 100px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  backface-visibility: hidden;
}

.card-back {
  background-color: rgba(0, 0, 0, 0.8);
  color: #e2e8f0;
  padding: 1rem;
  transform: v-bind("props.rotate === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)'");
}

.hoverFlip:hover .card-inner {
  transform: v-bind("props.rotate === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)'");
}
</style>
