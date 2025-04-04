<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
function adjustFontSize() {
  const container = document.querySelector('.title-container');
  const title = document.getElementById('title');
  if (container && title) {
    const containerHeight = container.getBoundingClientRect().height - 20;
    let fontSize = parseFloat(window.getComputedStyle(title).fontSize);
    while (title.offsetHeight < containerHeight) {
      fontSize += 1;
      title.style.fontSize = fontSize + 'px';
      title.style.lineHeight = fontSize + (0.08 * fontSize) + 'px';
    }
    while (title.offsetHeight > containerHeight) {
      fontSize -= 1;
      title.style.fontSize = fontSize + 'px';
      title.style.lineHeight = fontSize + (0.08 * fontSize) + 'px';
    }
  }
};
onMounted(() => {
  adjustFontSize();
  window.addEventListener('resize', adjustFontSize);
  setTimeout(()=>{
    adjustFontSize();
  }, 64);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustFontSize);
});
</script>

<template>
  <div class="title-container">
    <h1 id="title">fischldesu</h1>
  </div>
</template>

<style scoped>
  .title-container
  {
    position: absolute;
    height: 100vh;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .Background {
    position: absolute;
    left: 0;
    top: 0;
    width: 50vw;
    height: 100vh;
    filter: blur(10px);
  }
  h1#title
  {
    margin: 500px 0;
    color: aliceblue;
    writing-mode: vertical-lr;
    white-space: nowrap;
    font-family: BMZL, serif;
  }
</style>
