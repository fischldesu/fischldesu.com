<script setup lang="ts">
import { ref} from "vue";

import CHomeText from "@/components/CHomeText.vue";
import CHomeBackground from "@/components/CHomeBackground.vue";

import CNavPanel from "@/components/CNavPanel.vue";
import CMusicCard from "@/components/CMusicCard.vue";


const currentMusic = ref({
  title: '',
  source: '点击播放音乐',
  cover: ''
});

const player = document.getElementById("backgroundMusic") as HTMLVideoElement;

function Play(index: number = 0) {
  if(player) {
    const current = localStorage.getItem("music")
    let play = false;
    if(current != index.toString()) {
      localStorage.setItem("music", index.toString());
      play = true;
    } else {
      if (musicList[index].url === player.src)
        player.play();
      else play = true;
    }
    if(play) {
      const data = musicList[index];
      PlayURL(data.url);
      currentMusic.value.title = data.title;
      currentMusic.value.source = data.source;
      currentMusic.value.cover = data.cover;
    }
  }
}

function Pause() {
  if(player)
    player.pause();
}

function PlayURL(url: string) {
  if (player && player.paused) {
    let playOK = false;
    player.setAttribute("src", url);
    player.play().then(()=>{
      playOK = true;
    });
    setTimeout(()=>{
      if(!playOK)
        console.error("Music play failed");
    }, 2800);
  }
}

</script>

<script lang="ts">
  import MusicView, { Name as Music_name } from "@/views/MusicView.vue";

  const musicList = [
    {
      title: 'Da Capo',
      source: 'HOYO-MiX',
      cover: 'https://static.fischldesu.com/music/Da%20Capo%20-%20HOYO-MiX.jpg',
      url: 'https://static.fischldesu.com/music/Da%20Capo%20-%20HOYO-MiX.mp3'
    }
  ];
  export const SubRoutes = [
    {
      path: '/' + Music_name,
      name: Music_name,
      component: MusicView,
    }
  ];
</script>

<template>
  <div>
    <CHomeBackground style="z-index: -1" />
    <CHomeText />
    <div style="height: 100vh">
      ABC
    </div>
    <CNavPanel >
      <div class="grid place-content-center p-10 mt-40">
        <CMusicCard
          class="drop-shadow-lg"
          @play="Play"
          @pause="Pause"
          :cover-img="currentMusic.cover"
          :music_title="currentMusic.title"
          :music_source="currentMusic.source" />
      </div>
    </CNavPanel>
    <div style="height: 100vh">
      XYZ
    </div>
  </div>
</template>

<style scoped>

</style>
