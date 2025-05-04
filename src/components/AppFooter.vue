<script setup lang="ts">

</script>

<template>
  <footer>
    <div class="above">
      <a class="footer-title clickable" href="https://fischldesu.com">fischldesu.com</a>
      <a class="clickable" href="">Blog</a>
      <a class="clickable" href="">Repo</a>
      <a class="clickable" href="">Bilibili</a>
    </div>
    <img title="fischl-portrait" src="https://static.fischldesu.com/files/img/102011714_p0.png" alt="">
    <div class="bottom">
      <div>
        <router-link to="/map" class="clickable">SiteMap</router-link>
        <a href="https://beian.miit.gov.cn" class="clickable">蜀ICP备2025120962号-1</a>
        <router-link to="/about" class="clickable">© fischldesu 2025</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  background-color: rgb(16, 16, 16);
  color: aliceblue;
}

footer>div {
  width: 100%;
}

footer>img {
  position: absolute;
  bottom: 16px;
  width: 128px;
  left: 16px;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}

footer>.above {
  height: fit-content;
  gap: 8px;
  display: flex;
}

footer>.above>* {
  margin-top: 4px;
  padding: 2px 4px;
}

footer>.above>*:first-child {
  margin-left: 16px;
}

footer>.above>.footer-title {
  padding-left: 128px;
}

footer>.bottom {
  height: 40px;
}

footer>.bottom>div {
  width: fit-content;
  padding-right: 16px;
  float: right;
  font-size: 14px;
  line-height: 40px;
}

footer>.bottom>div>* {
  display: inline-block;
  margin-left: 8px;
}

.sep {
  -webkit-user-select: none;
  user-select: none;
  margin: 0 2px;
}

.clickable {
  color: aliceblue;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable:hover {
  text-decoration: underline;
  color: dodgerblue;
  text-underline-offset: 2px;
}

@media screen and (max-width: 500px) {
  footer>.above {
    flex-direction: column;
    gap: 0px;
  }

  footer>.above>* {
    margin-left: 12px;
  }

  footer>.above>.footer-title {
    margin-top: 12px;
    padding-left: unset;
  }

  footer>.above>*:last-child {
    margin-bottom: 12px;
  }

  footer>.bottom {
    height: 96px;
  }

  footer>.bottom>div {
    margin-left: 8px;
    padding-bottom: 4px;
    float: none;
  }

  footer>.bottom>div>* {
    display: block;
    line-height: 28px;
  }

  footer>img {
    bottom: 55%;
    transform: translateY(50%);
    left: unset;
    right: 16px;
  }
}
</style>
