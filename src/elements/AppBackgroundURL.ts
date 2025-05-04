import { ref } from "vue";

const AppDefaultBackgroundURL = 'https://static.fischldesu.com/files/picture/121757860.jpg';
let url:string | null = localStorage.getItem('bg-url');
if(!url)
    url = AppDefaultBackgroundURL;

export const AppBackgroundURL = ref<string>(url);
export default ()=> {
  return {
    get value() {
      return AppBackgroundURL.value;
    },
    set value(url:string) {
      localStorage.setItem('bg-url', url);
      AppBackgroundURL.value = url;
    },

    get Ref() { return AppBackgroundURL; },
    get DefaultURL() { return AppDefaultBackgroundURL; },
    RestoreDefault() {
      localStorage.setItem('bg-url', AppDefaultBackgroundURL);
      AppBackgroundURL.value = AppDefaultBackgroundURL;
    }

  }
};
