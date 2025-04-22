<script setup lang="ts">
import {useReference} from "@/elements";

defineProps({
  TabAble: {
    type: Boolean
  }
});

const UL = useReference(HTMLUListElement);
const displayAnimationCancellationTokens:Array<number> = [];

function DisplayAnimation(ele: HTMLElement) {
  requestAnimationFrame(()=>{
    //暂时不解决
    ele.style.opacity = '1';
  })
}

function f(ele:HTMLElement, delay:number) {
  displayAnimationCancellationTokens.push(
    setTimeout(()=>DisplayAnimation(ele), delay));
}

function Show(delay:number = 64) {
  CancelDisplayAnimation();
  const arrLI = UL.value?.children;
  if(arrLI && arrLI.length > 0) {
    for (let i = 0; i < arrLI.length; i++) {
      const ele = arrLI[i] as HTMLElement;
      ele.style.opacity = '0';
      displayAnimationCancellationTokens.push(
        setTimeout(()=>f(ele, i * delay), delay * 3));
    }
  }
}

function CancelDisplayAnimation() {
  displayAnimationCancellationTokens.forEach(token=> clearTimeout(token));
  displayAnimationCancellationTokens.length = 0;
}

defineExpose({
  Show
});

</script>

<template>
  <section class="flyout">
    <ul ref="UL">
      站点导航
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/">Home 主页</router-link>
      </li>
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/blog">Blog 博客</router-link>blog.fischldesu.com
      </li>
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/github">Github</router-link>github@fischldesu
      </li>
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/bili">Bilibili 哔哩哔哩</router-link>bilibili@fischldesu.com
      </li>
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/repo">Collections</router-link>repo.fischldesu.com
      </li>
      <li>
        <router-link :tabindex="TabAble?1:-1" class="link-item" to="/about">About 关于</router-link>About this website
      </li>
    </ul>
  </section>
</template>

<style scoped>
.flyout>ul {
  color: gray;
  margin-left: 16px;
}

.flyout>ul>li:first-child{
  margin-top: 8px;
}

.flyout>ul>li>.link-item {
  display: inline-block;
  color: aliceblue;
  margin-right: 16px;
  line-height: 38px;
  font-size: 22px;
  width: 174px;
  font-weight: bold;
  transition: filter 0.3s;
}

.flyout>ul>li>.link-item:hover {
  color: white;
  filter: drop-shadow(2px 2px 8px rgba(255, 255, 255, 0.3));
}

</style>
