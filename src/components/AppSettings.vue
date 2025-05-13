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
            <input ref="inputBgURL"/>
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
          <span><button>获取定位</button></span>
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
  padding: 38px 16px 16px 16px;
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

li.title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

li {
  margin-top: 3px;
  font-size: 14px;
  height: 26px;
  display: flex;
}

li>span {
  height: 100%;
  line-height: 26px;
}

li>span:first-child {
  width: 100px;
}

li>span:last-child {
  flex: 1;
  display: flex;
  gap: 8px;
}

li>span>* {
  height: 100%;
  flex: 1;
}

li>span>*:only-child {
  width: 100%;
}

input {
  border-radius: 4px;
  border: 2px inset rgb(64, 64, 64);
  min-width: 0;
  width: 100%;
  padding: 0 6px;
}

button {
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  will-change: box-shadow,transform;
  background: radial-gradient( 100% 100% at 100% 0%, #89E5FF 0%, #5468FF 100% );
  box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
  padding: 0 14px;
  border-radius: 0.3em;
  color: #fff;
  text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

button:hover {
  box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #3c4fe0;
  transform: translateY(-0.1em);
}

button:active {
  box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
  transform: translateY(0em);
}

</style>
