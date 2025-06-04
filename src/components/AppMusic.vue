<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useAppMusic, useReference, type MusicMetaData } from "@/elements";

import CFlipCard from "@/components/CFlipCard.vue";
import IconPause from "@/components/icons/IconPause.vue";
import IconNext from "@/components/icons/IconNext.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import IconPlay from "@/components/icons/IconPlay.vue";
import IconAnchor from "@/components/icons/IconAnchor.vue";

const appMusic = useAppMusic();
const appMusicCard = useReference(CFlipCard);
const backfaceReturnButton = useReference(HTMLButtonElement);

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
    if (appMusicCard.value?.ToggleFlip() ?? false)
      backfaceReturnButton.value?.focus();

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
  <div class="app-music" style="padding: 32px;">
    <CFlipCard class="app-music-card" ref="appMusicCard"  style="width: 192px; height: 192px;" :vertical="true" :hover-flip="false">
        <template #default>
          <div class="app-music-face music-cover">
            <img v-if="(current && current.cover !== '')" class="app-music-cover-img" :src="current?.cover" alt="music cover">
            <div>
              <p class="title">{{ current?.title }}</p>
              <div class="controls face-controls">
                <button class="action-button" @click="action.play()" >
                  <IconPlay v-if="appMusic.reactive.playStatus.paused" />
                  <IconPause v-else/>
                </button>
                <button class="action-button" @click="action.next()" >
                  <IconNext />
                </button>
                <button class="action-button" @click="action.flip()">
                  <IconMenu/>
                </button>
                <button class="action-button">
                  <IconAnchor/>
                </button>
              </div>
            </div>
          </div>
        </template>
        <template #back>
          <div style="background-color: #111725">
            <div class="top">
              <div class="music-cover cover-container">
                <img v-if="(current && current.cover !== '')" class="app-music-cover-img" :src="current?.cover" alt="music cover">
              </div>
            </div>
            <div class="bottom">

            </div>
<!--            <button ref="backfaceReturnButton">-->
<!--              <IconNext />-->
<!--            </button>-->
          </div>
        </template>
    </CFlipCard>
  </div>
</template>

<style scoped>
.app-music {
  position: fixed;
  right: -192px;
  transition: right 0.3s ease-in-out;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
}

.app-music:hover {
  right: 0;
}

.music-cover {
  position: relative;
  background-image: url("https://static.fischldesu.com/files/img/.music-defaultcover.jpg");
  background-size: cover;
  background-position: center;
}

.music-cover>img.app-music-cover-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}

.app-music-face>div {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0;
  transform: translateY(16px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.app-music-card:focus-within .app-music-face>div,
.app-music-card:hover .app-music-face>div{
  opacity: 1;
  transform: none;
}

.app-music-face>div>* {
  margin: 0 12px;
  height: 50%;
  color: aliceblue;
}

p.title {
  text-align: center;
  font-weight: 600;
}

div.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

button.action-button {
  border-radius: 4px;
}



button.action-button:hover {
  background-color: rgba(128, 128, 128, 0.3);
}

.face-controls button.action-button {
  height: 80%;
  width: 18px;
  padding: 0 4px;
}



</style>
