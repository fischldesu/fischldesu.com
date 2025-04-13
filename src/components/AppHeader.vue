<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from "vue-router";
import IconHome from "@/components/icons/IconHome.vue";
import ACHeaderFlyout from "@/components/ACHeaderFlyout.vue";

const headerFlyout = ref<HTMLElement | null>(null);
const displayFlyout = ref(false);
const hoverCancellationToken = ref(false);
const route = useRoute();

const intersectionObserver = new IntersectionObserver((entries) => {
  const header = document.querySelector('header');
  if(header)
    if(entries[0].isIntersecting) {
      header.classList.remove('display');
      displayFlyout.value = false;
    } else {
      header.classList.add('display');
    }
});

onMounted(()=>{
  const obe = document.getElementById('header-ob');
  if(obe)
    intersectionObserver.observe(obe);
});

onUnmounted(()=>{
  const obe = document.getElementById('header-ob');
  if(obe)
    intersectionObserver.unobserve(obe);
  intersectionObserver.disconnect();
})

function Refresh() {
  window.location.reload();
}

function ClickDisplayFlyout() {
  hoverCancellationToken.value = true;
  if(route.path === '/')
  {
    displayFlyout.value = true;
  }

}

function HoverDisplayFlyout(display_:boolean) {
  if(display_) {
    hoverCancellationToken.value = false;
    setTimeout(()=>{
      if(!hoverCancellationToken.value) {
        document.querySelector('header')?.classList.add('display');
        displayFlyout.value = true;
      }
    }, 600);
  } else {
    hoverCancellationToken.value = true;
    displayFlyout.value = false;
  }
}

function CancelHoverDisplay() {
  hoverCancellationToken.value = true;
}

</script>

<template>
  <header @mouseleave="HoverDisplayFlyout(false)">
    <nav>
      <div class="links">
        <router-link
          class="nav-item"
          to="/"
          @dblclick="Refresh"
          @click="ClickDisplayFlyout"
          @mouseenter="HoverDisplayFlyout(true)"
          @mouseleave="CancelHoverDisplay"
        ><!-- i/b:未处理:键盘Tab -->
          <IconHome class="icon" />fischldesu.com
        </router-link>
        <router-link class="nav-item" to="/about">
          About
        </router-link>
      </div>
      <div class="info" :class="{'display': displayFlyout}">
        <div class="flyout-container">
          <ACHeaderFlyout ref="headerFlyout" class="flyout"/>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header {
    --header-expandHeight: 0;
    --header-itemHeight: calc(var(--header-height) * 0.65);
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
  }

  header:hover>nav,
  header.display>nav {
    background-color: rgba(22, 22, 23, .8);
  }

  header>nav>.links {
    position: relative;
    display: flex;
    color: #323232;
    height: var(--header-height);
    width: 100%;
    line-height: var(--header-height);
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
    -webkit-user-select: none;
    user-select: none;
    z-index: 5;
  }

  header>nav>.links>.nav-item {
    display: flex;
    padding: 0 6px;
    color: #323232;
    transition: all 0.3s ease;
    line-height: var(--header-itemHeight);
    height: var(--header-itemHeight);
    border-radius: 6px;
    background-color: rgba(239, 239, 239, 0.4);
    backdrop-filter: blur(16px);
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", sans-serif;
  }

  header.display>nav>.links>.nav-item,
  header:hover>nav>.links>.nav-item {
    background-color: unset;
    backdrop-filter: unset;
    color: rgba(255, 255, 255, .8);
  }

  header>nav>.links>.nav-item>.icon {
    height: var(--header-itemHeight);
    width: calc(var(--header-itemHeight) * 0.6);
    margin-right: 8px;
  }

  header>nav>.links>.nav-item:hover {
    color: white;
  }
  header>nav>.links>.nav-item:first-child {
    margin-left: 20%;
  }
  header>nav>.links>.nav-item:last-child {
    margin-right: 20%;
  }

  header>nav>.info {
    position: absolute;
    width: 100%;
    display: grid;
    overflow: hidden;
    background-color: inherit;
    backdrop-filter: blur(10px);
    grid-template-rows: 0fr;
    transition: 0.25s ease-in-out;
    z-index: 0;
  }

  header>nav>.info.display {
    grid-template-rows: 1fr;
  }

  header>nav>.info>.flyout-container{
    min-height: 0;
  }
  header>nav>.info>.flyout-container>.flyout{
    color: aliceblue;
    padding: 32px 32px 64px;
  }

</style>
