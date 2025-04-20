import { ref } from "vue";
export interface WeatherInfo {
  precipitation: number;
  temperature: number;
  pressure: number;
  humidity: number;
  windDirection: string;
  windSpeed: number;
  windScale: string;
  place: string;
  weatherToday: string;
  weatherTomorrow: string;
}

export class Weather {
  lastRequest: WeatherInfo | null = null;

  public static readonly DefaultAPI = 'https://api.apihz.cn/api/tianqi/tqyb.php';
  public static API:string = 'https://cn.apihz.cn/api/tianqi/tqyb.php';

  public constructor() {

  }

  public async GET_Default(sheng:string, city: string) {
    return this.GET(`id=88888888&key=88888888&sheng=${sheng}&place=${city}`);
  }

  public async GET(args: string):Promise<WeatherInfo | null> {
    const response = await fetch(`${Weather.API}?${args}`);
    try {
      const json = await response.json();
      if (json.code != 200 || response.status != 200) {
        this.lastRequest = null;
        return null;
      }
      const data = {
        precipitation: json.precipitation,
        temperature: json.temperature,
        pressure: json.pressure,
        humidity: json.humidity,
        windDirection: json.windDirection,
        windSpeed: json.windSpeed,
        windScale: json.windScale,
        place: json.place,
        weatherToday: json.weather1,
        weatherTomorrow: json.weather2
      }
      this.lastRequest = data;
      return data;
    } catch {
      console.error("Weather GET Error");
      this.lastRequest = null;
      return null;
    }
  }
}

const weather = new Weather();
const location = ref({
  sheng : localStorage.getItem('weather-sheng') || "",
  city : localStorage.getItem('weather-city') || "",
})
export const useWeather = () => {
  return weather;
}

export const useLocation = () => {
  return {
    get Ref() { return location; },
    get value() { return location.value; },
    get sheng() { return location.value.sheng; },
    get city() { return location.value.city; },

    set value(value:{sheng:string, city:string}) {
      localStorage.setItem('weather-sheng', value.sheng);
      localStorage.setItem('weather-city', value.city);
      location.value = value;
    },
  }
}
