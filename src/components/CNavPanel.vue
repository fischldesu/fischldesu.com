<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
  bg_color:{
    type: String,
    default: '#fff'
  },
  intersect_margin:{
    type: Number,
    default: 100
  }
})

const ob = new IntersectionObserver((entries) => {
  const content = document.getElementById('intersect_panel');
  if(content){
    if (entries[0].isIntersecting) {
      content.style.transform = `translateY(calc(-100vh + ${props.intersect_margin}px))`
    } else {
      content.style.transform = '';
    }
  }
});

onMounted(()=>{
  const trigger = document.getElementById("intersect_trigger");
  if(trigger){
    ob.observe(trigger);
  }
});

onUnmounted(()=>{
  const trigger = document.getElementById("intersect_trigger");
  if(trigger){
    ob.unobserve(trigger);
  }
  ob.disconnect();
})

</script>



<template>
  <div class="panel-container">
    <div id="intersect_margin" :style="`height: ${intersect_margin}px`"></div>
    <div id="intersect_trigger"></div>
    <div class="content" id="intersect_panel" :style="`background-color:${bg_color}`">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .panel-container{
    position: relative;
  }

  #intersect_trigger {
    height: 8px;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    transition: transform 0.3s ease;
  }

</style>
