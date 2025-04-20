<script setup lang="ts">
import { useAppBackgroundURL, useReference } from "@/elements";
import { useLocation } from "@/util/Weather.ts";
import CDialog from "@/components/CDialog.vue";

const appBgURL = useAppBackgroundURL();
const appWeatherLocation = useLocation();
const inputBgURL = useReference(HTMLInputElement);
const inputWeather_sheng = useReference(HTMLInputElement);
const inputWeather_city = useReference(HTMLInputElement);
const this_ = useReference(CDialog);

function GetFile() {

}

function RestoreDefaultBgImg() {
  appBgURL.RestoreDefault();
}

function Submit() {
  const BgImg = inputBgURL.value?.value;
  const weather_sheng = inputWeather_sheng.value?.value || "";
  const weather_city = inputWeather_city.value?.value || "";
  if (BgImg && BgImg.length > 2)
    appBgURL.value = BgImg;
  if(weather_sheng.length > 0 && weather_city.length > 0) {
    appWeatherLocation.value = {
      sheng: weather_sheng,
      city: weather_city
    };
  }
}

</script>

<template>
  <CDialog ref="this_" title="Settings" class="app-settings">
    <div class="app-settings-content">
      <ul>
        <li class="title">背景图片</li>
        <li>
          <span>地址</span>
          <span>
            <input ref="inputBgURL" style="width: calc(100% - 8px); float: right"/>
          </span>
        </li>
        <li>
          <span>其他</span>
          <span>
            <button @click="GetFile">选择文件</button>
            <button @click="RestoreDefaultBgImg">恢复默认</button>
          </span>
        </li>
        <li class="title">天气</li>
        <li>
          <span>位置检测</span>
          <button>获取定位</button>
        </li>
        <li>
          <span>位置设置</span>
          <span>
            <input ref="inputWeather_sheng" placeholder="省级行政区">
            <input ref="inputWeather_city"  placeholder="城市">
          </span>
        </li>
      </ul>
      <button class="submit-btn" @click="Submit">确认</button>
    </div>
  </CDialog>
</template>

<style scoped>
.app-settings-content {
  padding: 48px 16px 16px 16px;
}

.app-settings>.app-settings-content {
  height: 100%;
  width: 100%;

}

.submit-btn{
  position: absolute;
  right: 16px;
  bottom: 16px;
  height: 30px;
}

</style>
