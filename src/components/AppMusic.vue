<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useAppMusic, useReference} from "@/elements";
import CFlipCard from "@/components/CFlipCard.vue";
import {type MusicMetaData} from "@/util/MP3MetaReader.ts";

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

const current = computed(()=>{
  return appMusic.source.playlist[0] as MusicMetaData | null;
})

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

onMounted(()=>{
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('nexttrack', action.next);
    navigator.mediaSession.setActionHandler('previoustrack', action.previous);
  }

  const card = appMusicCard.value?.$el as HTMLElement | null;
  const instance = card?.parentElement;
  instance?.appendChild(appMusic.element)
  card?.addEventListener('mouseleave', ()=>card.removeAttribute('flip'))

  LoadMusicMetaData().catch(err=> console.warn('Failed load metadata:', err));
});

</script>

<template>
  <div style="margin: 32px;">
    <CFlipCard ref="appMusicCard"  style="width: 192px; height: 192px;" :vertical="true" :hover-flip="false">
        <template #default>
          <div class="app-music-face">
            <img v-if="(current && current.cover !== '')" class="app-music-cover" :src="current?.cover" alt="music cover">
            <button @click="action.previous()" > ◀ </button>
            <button @click="action.play()" style="transform: rotate(90deg);">〓</button>
            <button @click="action.next()" > ▶ </button>
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

.app-music-face>img.app-music-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

</style>
