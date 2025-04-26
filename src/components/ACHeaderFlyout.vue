<script setup lang="ts">
import { useReference } from "@/elements";
import { computed } from "vue";

interface LinkItemData {
  name: string;
  href: string;
  info?: string;
}

const props = defineProps({
  LinkItems: {
    type: Array as () => LinkItemData[],
    required: true,
  },
  TabAble: {
    type: Boolean
  }
});

const UL = useReference(HTMLUListElement);
const displayCancellationTokens:Array<number> = [];
const animateCancellationTokens:Array<number> = [];
const tabAble = computed(()=>{
  return props.TabAble?1:-1;
})

function DisplayAnimation(ele: HTMLElement, totalStep:number = 30) {
  // animateCancellationTokens.forEach(token=> cancelAnimationFrame(token));
  let val:number = 0.1;
  const singleStep = totalStep / 1000;
  const animate = ()=>{
    val += singleStep;
    if(val > 1) {
      val = 1;
      ele.style.opacity = '1';
      return;
    } else {
      ele.style.opacity = `${val}`;
      animateCancellationTokens.push(requestAnimationFrame(animate));
    }
  }
  animate();
}

function DisplayAnimationEntry(ele:HTMLElement, delay:number) {
  displayCancellationTokens.push(
    setTimeout(()=>DisplayAnimation(ele), delay));
}

function Show(delay:number = 64) {
  CancelDisplayAnimation();
  const arrLI = UL.value?.children;
  if(arrLI && arrLI.length > 0) {
    for (let i = 0; i < arrLI.length; i++) {
      const ele = arrLI[i] as HTMLElement;
      ele.style.opacity = '0';
      displayCancellationTokens.push(
        setTimeout(()=>DisplayAnimationEntry(ele, i * delay), delay * 3));
    }
  }
}

function CancelDisplayAnimation() {
  displayCancellationTokens.forEach(token=> clearTimeout(token));
  displayCancellationTokens.length = 0;
}

defineExpose({
  Show
});

</script>

<template>
  <section class="flyout">
    <ul ref="UL">
      站点导航
      <li v-for="linkItem in LinkItems" :key="linkItem.href" class="link-item-container">
        <router-link :tabindex="tabAble" class="link-item" :to="linkItem.href">{{ linkItem.name }}</router-link> {{ linkItem.info }}
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
