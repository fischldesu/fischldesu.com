<script setup lang="ts">
import { useReference } from '@/elements';
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  Callback: {
    type: Function,
    default: null,
  }
})

const ob = new IntersectionObserver(entries=>{
  let top = false;
  let bot = false;
  
  entries.forEach(entry=>{
    if(entry.target === marginTop.value) {
      top = entry.isIntersecting;
    } else if(entry.target === marginBot.value) {
      bot = entry.isIntersecting;
    }
  });

  if(top || bot) {
    window.addEventListener('resize', onGeometryChanged);
    window.addEventListener('scroll', onGeometryChanged);
    onGeometryChanged();
  } else {
    window.removeEventListener('resize', onGeometryChanged);
    window.removeEventListener('scroll', onGeometryChanged);
    onGeometryChanged();
  }
});

const ele = useReference(HTMLDivElement);
const marginTop = useReference(HTMLDivElement);
const marginBot = useReference(HTMLDivElement);

const geometry = ref(new DOMRect(0, 0, 0, 0));

function onGeometryChanged() {
  geometry.value = ele.value?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);
}

watch(geometry, val=>{if(props.Callback) props.Callback(val)});

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
  ele,
  geometry,
});
</script>

<template>
  <div class="scrolling-view">
    <div ref="marginTop" class="scrolling-view-margin scrolling-view-margin-top"></div>
    <slot ref="ele" class="content"></slot>
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
}

</style>