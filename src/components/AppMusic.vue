<script setup lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import { useAppMusic, useReference} from "@/elements";
import CFlipCard from "@/components/CFlipCard.vue";

const appMusic = useAppMusic();
const appMusicCard = useReference(CFlipCard);

async function LoadURL() {
  const response = await fetch('https://static.fischldesu.com/files/music/manifest.json');
  const name:string[] = await response.json();
  for (let i = 0; i < name.length; i++) {
    name[i] = `https://static.fischldesu.com/files/music/${name[i]}`;
  }
  return name;
}

async function LoadMusicMetaData() {
  appMusic.source.playlist = await LoadURL();
}

onMounted(()=>{
  const cardEle = appMusicCard.value?.$el as HTMLElement | null;
  getCurrentInstance()?.proxy?.$el.appendChild(appMusic.element)
  cardEle?.addEventListener('mouseleave', ()=>cardEle.removeAttribute('flip'))
  LoadMusicMetaData().catch(err=> console.warn('Failed load metadata:', err));
});

const action = {
  play:()=>{
    if (appMusic.paused)
      appMusic.play().catch(e=>console.warn('ERR appMusic.play()', e));
    else
      appMusic.pause();
  },
  next:()=>{
    appMusic.next()?.catch(e=>console.warn('ERR appMusic.next()', e));
  },
  previous:()=>{
    appMusic.previous()?.catch(e=>console.warn('ERR appMusic.previous()', e));
  },
  flip: ()=>{
    appMusicCard.value?.ToggleFlip();
  }
}

defineExpose({
  action
})

if ('mediaSession' in navigator) {
  navigator.mediaSession.setActionHandler('nexttrack', action.next);
  navigator.mediaSession.setActionHandler('previoustrack', action.previous);
}

</script>

<template>
  <div style="margin: 32px;">
    <CFlipCard ref="appMusicCard"  style="width: 192px; height: 192px;" :vertical="true" :hover-flip="false">
        <template #default>
          <div class="app-music-face">
            <button @click="appMusic.previous()" > ◀ </button>
            <button @click="action.play()" style="transform: rotate(90deg);">〓</button>
            <button @click="appMusic.next()" > ▶ </button>
            <button @click="action.flip()" > Flip </button>
          </div>
        </template>
        <template #back>
          <div style="background-color: #ff0000">B</div>
        </template>
    </CFlipCard>
  </div>
</template>

<style scoped>
.app-music-face {
  position: relative;
  background-image: url("https://static.fischldesu.com/files/img/.music-defaultcover.jpg");
  background-size: cover;
  background-position: center;
}



</style>
