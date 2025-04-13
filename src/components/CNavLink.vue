<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  href: {
    type: String,
    default: null
  },
});

const router = useRouter();
const backHomeToken = ref(-1);

function BackHome(){
  backHomeToken.value = 6;
  const timerID = setInterval(()=>{
    backHomeToken.value--;
    if (backHomeToken.value === 0) {
      router.push('/');
    } else if (backHomeToken.value < 0)
      clearInterval(timerID);
    }, 1000);
}


onMounted(()=>{
  if(!props.href || props.href.length <= 1) {
    BackHome();
  }
});

</script>

<template>
  <div class="nav-link">
    <div class="nav-link-item ok" v-if="(href && href.length > 1)">
      正在尝试导航前往 <slot/><br><a :title="href" :href="href"> {{ href }}</a>
    </div>
    <div class="nav-link-item err" v-else>
      <router-link to="/"><span><slot/>Page Not Found</span><span>back to home in {{backHomeToken}}s</span></router-link>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  height: 100vh;
  margin-top: calc(0px - var(--header-height));
  padding-top: var(--header-height);
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url("https://static.fischldesu.com/img/121757860.jpg");
  background-size: cover;
  background-position: 40%;
}

.nav-link>.nav-link-item{
  text-align: center;
  width: 40vw;
  max-width: 420px;
  min-width: 256px;
  height: fit-content;
  margin-top: 50px;
  background-color: aliceblue;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.nav-link>.nav-link-item:hover{
  transform: scale(1.05);
}

.nav-link>.nav-link-item.ok{
  border: 4px solid #00ce22;
}

.nav-link>.nav-link-item.err {
  border: 4px solid #de0000;
}

.nav-link-item>a{

  text-underline-offset: 4px;
}

.nav-link-item:hover>a{
  color: blue;
}

.nav-link-item>a:hover {
    text-decoration: underline;
}

</style>
