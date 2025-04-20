<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import { useWeather, useLocation, type WeatherInfo } from "@/util/Weather";
import CInfoWidget from "@/components/CInfoWidget.vue";

interface WeatherData {
  name: string;
  temperature: number;
  weather: string;
}

const weather = useWeather();
const location = useLocation();
const weatherDisplay = ref<WeatherData | null>(null);

async function UpdateWeather() {
  const sheng = location.sheng;
  const city = location.city;
  if(sheng.length > 0 && city.length > 0) {
    const rp = await weather.GET_Default(sheng, city)
    SetWeather(rp);
  }
}

function SetWeather(info:WeatherInfo | null) {
  if(info) {
    weatherDisplay.value = {
      name: info.place,
      temperature: info.temperature,
      weather: info.weatherToday,
    }
  } else weatherDisplay.value = null;
}

onMounted(UpdateWeather);
watch(location.Ref, UpdateWeather);

</script>

<template>
  <CInfoWidget class="">
    <div class="weather-info" v-if="weatherDisplay">
      <p>{{weatherDisplay.name}}</p>
      <p>{{weatherDisplay.temperature}}℃</p>
      <p>{{weatherDisplay.weather}}</p>
    </div>
    <div v-else @click="UpdateWeather">无天气信息<br>点击尝试获取</div>
  </CInfoWidget>
</template>

<style scoped>
.weather-info {
  padding: 14px;
}
</style>
