<script setup lang="ts">
import { useReference } from '@/elements';
import { ref, onMounted, onUnmounted, watch } from 'vue';

const emit = defineEmits(['ViewScrolling', 'ViewEnter', 'ViewLeave']);

const ob = new IntersectionObserver(()=>{

  const rectTop = marginTop.value?.getBoundingClientRect() as DOMRect;
  const rectBot = marginBot.value?.getBoundingClientRect() as DOMRect;
  const topInside = rectTop.top > 0 && rectTop.top < window.innerHeight;
  const botInside = rectBot.bottom < window.innerHeight && rectBot.bottom > 0;

  if(topInside || botInside) {
    window.addEventListener('resize', onGeometryChanged);
    window.addEventListener('scroll', onGeometryChanged);
    onGeometryChanged();
  }
  else if(topInside && !botInside) emit('ViewEnter');
  else if(!topInside && botInside) emit('ViewLeave');
  else {
    window.removeEventListener('resize', onGeometryChanged);
    window.removeEventListener('scroll', onGeometryChanged);
    onGeometryChanged();
  }

});

const displayingElement = useReference(HTMLDivElement);
const marginTop = useReference(HTMLDivElement);
const marginBot = useReference(HTMLDivElement);

const geometry = ref<DOMRect>(new DOMRect(0, 0, 0, 0));

function onGeometryChanged() {
  geometry.value = displayingElement.value?.getBoundingClientRect() || new DOMRect();
}

watch(geometry, val=>{emit('ViewScrolling', val)});

onMounted(()=>{
  const eleTop = marginTop.value;
  const eleBot = marginBot.value;
  if(eleTop && eleBot) {
    ob.observe(eleTop);
    ob.observe(eleBot);
  }
});
onUnmounted(()=>{
  const eleTop = marginTop.value;
  const eleBot = marginBot.value;
  if(eleTop && eleBot) {
    ob.unobserve(eleTop);
    ob.unobserve(eleBot);
  }
  ob.disconnect();
});

defineExpose({
  ele: displayingElement,
  geometry,
});
</script>

<template>
  <div class="scrolling-view" ref="displayingElement">
    <div ref="marginTop" class="scrolling-view-margin scrolling-view-margin-top"></div>
    <slot/>
    <div ref="marginBot" class="scrolling-view-margin scrolling-view-margin-bottom"></div>
  </div>
</template>

<style scoped>
.scrolling-view {
  padding: 1px 0;
}

.scrolling-view-margin {
  height: 0 !important;
  width: 100%;
  max-height: 0;

}

.scrolling-view>*:not(.scrolling-view-margin) {
  overflow: hidden;
}

</style>
