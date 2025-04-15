<script setup lang="ts">
import { ref } from 'vue';
import CCard3D from "@/components/CCard3D.vue";

defineProps({
  sensitivity: {
    type: Number,
    default: 16
  }
})

const acrylic =  ref<HTMLElement | null>(null);

function MouseMoveF(e:MouseEvent, rect: DOMRect) {
    if(acrylic.value)
    {
      const angle = getAngle(e.x - rect.x, e.y - rect.y, rect.width, rect.height);
      acrylic.value.style.backgroundImage=`linear-gradient(${Math.floor(angle)}deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.2))`
    }
}

function getAngle(
  mouseX: number,
  mouseY: number,
  elementWidth: number,
  elementHeight: number
): number {
  const centerX = elementWidth / 2;
  const centerY = elementHeight / 2;
  const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
  let degrees = radians * (180 / Math.PI) - 90;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}

</script>

<template>
  <CCard3D :callback:MouseMove="MouseMoveF" :sensitivity="sensitivity">
    <div ref="acrylic" class="acrylic">
      <slot/>
    </div>
  </CCard3D>
</template>

<style scoped>
.acrylic {
  backdrop-filter: blur(8px);
  box-shadow: 4px 4px 16px rgba(32, 32, 32, 0.4);
  border: 1px solid aliceblue;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, rgba(240, 247, 255, 0.6), rgba(0, 0, 0, 0.2));
}
</style>
