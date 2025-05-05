<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useWeather, useLocation, type WeatherInfo } from "@/util/Weather";
import { useReference } from "@/elements";
import CInfoWidget from "@/components/CInfoWidget.vue";
import CDialog from "@/components/CDialog.vue";

interface WeatherData {
  name: string;
  temperature: number;
  weather: string;
}

const weather = useWeather();
const location = useLocation();
const weatherDisplay = ref<WeatherData | null>(null);
const moreInfoDialog = useReference(CDialog);

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
    <div class="weather-info" v-if="weatherDisplay" @click="moreInfoDialog?.Show(true)">
      <p>{{weatherDisplay.name}}</p>
      <p>{{weatherDisplay.temperature}}℃</p>
      <p>{{weatherDisplay.weather}}</p>
    </div>
    <div class="null-weather-data" v-else @click="UpdateWeather">未设置天气信息<br>点击尝试获取</div>
    <CDialog ref="moreInfoDialog" title="天气">

    </CDialog>
  </CInfoWidget>
</template>

<style scoped>
.weather-info {
  padding: 14px;
}
.null-weather-data {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
