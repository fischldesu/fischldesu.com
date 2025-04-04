<script setup lang="ts">
import FlipCard from "@/lib/FlipCard.vue";
import TriggerButton from "@/components/TriggerButton.vue";
import { onMounted, ref, computed } from "vue";

import DefaultBgImage from '@/assets/img/defaultcover.png'
import PlayerPlayButton from "@/components/PlayerPlayButton.vue";

const props = defineProps({
  card_width: {
    type: Number,
    default: 200
  },
  coverImg: {
    type: String,
    default: ''
  },
  music_title: {
    type: String,
    default: 'Unknown'
  },
  music_source: { //artist or album
    type: String,
    default: 'Unknown'
  },
  music_playing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['play', 'pause', 'next']);
const card = ref<InstanceType<typeof FlipCard> | null>(null);
const trigger_btn = ref<InstanceType<typeof TriggerButton> | null>(null);

const backgroundStyle = computed(() => {
  const bgImgProperty = {
    backgroundImage: `url('${DefaultBgImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `${props.card_width}px`,
    height: `${props.card_width}px`
  };
  if (!props.coverImg || props.coverImg.length <= 1)
    return bgImgProperty;
  bgImgProperty.backgroundImage = `url('${props.coverImg}')`;
  return bgImgProperty;
});

function TogglePlay() {
  if (props.music_playing) {
    emit('pause');
  } else {
    emit('play');
  }
}

function Flip() {
  if(trigger_btn.value?.$el.classList.contains('uninitialized')) {
      trigger_btn.value.$el.classList.remove('uninitialized');
      trigger_btn.value.$el.innerHTML = '●●●';
      emit("play");
  } else {
    (card.value?.$el as HTMLElement).classList.add("hoverFlip");
  }
}

onMounted(() => {
  if(card.value) {
    const ele = card.value.$el as HTMLElement;
    setTimeout(()=>{
      if(
        trigger_btn.value &&
        !(document.getElementById('backgroundMusic') as HTMLVideoElement)?.paused) {
        trigger_btn.value.$el.classList.remove('uninitialized');
        trigger_btn.value.$el.innerHTML = '●●●';
      }}, 1000);
    ele.addEventListener('mouseleave', () => {
      ele.classList.remove("hoverFlip");
    });
  }
})
</script>

<template>
  <FlipCard ref="card" class="music-card" :style="`width:${card_width}px; height:${card_width}px;`">
    <template #default>
      <div class="face" :style="backgroundStyle">
        <div class="unFade detail">
          <span>
            <p>{{ music_title || '\u2002'}}</p>
            <p>{{ music_source }}</p>
          </span>
          <TriggerButton
            ref="trigger_btn"
            class="uninitialized"
            style="padding: 0px 16px; margin-top: 8px; height: 28px;"
            @click="Flip">▶</TriggerButton>
        </div>
      </div>
    </template>
    <template #back>
      <div class="face">
        <div class="headArea">
          <div class="titleArea overflow-hidden">
            <img :src="coverImg">
            <p class="pl-1 font-bold pt-1">{{ music_title}}</p>
            <p class="pl-1 truncate">{{ music_source }}</p>
          </div>
          <div class="subControlArea">

          </div>
        </div>
        <div class="controlArea">

        </div>
      </div>
    </template>
  </FlipCard>
</template>

<style scoped>
.music-card .unFade {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.3s ease;
}

.music-card:hover .unFade {
  opacity: 1;
  transform: none;
}

.face {
  position: relative;
  width: 100%;
  height: 100%;
}

.detail {
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 8px 16px;
  justify-content: space-between;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
}

.detail > span > p:first-child {
  font-weight: bold;
}

.headArea {
  display: flex;
  justify-content: space-between;
  height: 80%;
}

.titleArea {
  max-width: 65%;
}

.subControlArea {
  width: 35%;
}

.titleArea>img{
  border-radius: 8px;
  height: 62%;
}

.controlArea {
  height: 20%;
  background-color: #23c483;
}

</style>
