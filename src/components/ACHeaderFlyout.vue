<script setup lang="ts">

</script>

<template>
  <section class="flyout">
    <ul>
      站点导航
      <li>
        <router-link class="link-item" to="/blog">Blog 博客</router-link>blog.fischldesu.com
      </li>
      <li>
        <router-link class="link-item" to="/github">Github</router-link>github@fischldesu
      </li>
      <li>
        <router-link class="link-item" to="/bili">Bilibili 哔哩哔哩</router-link>bilibili@fischldesu.com
      </li>
      <li>
        <router-link class="link-item" to="/repo">Collections</router-link>repo.fischldesu.com
      </li>
      <li>
        <router-link class="link-item" to="/about">About 关于</router-link>About this website
      </li>
    </ul>
  </section>
</template>

<style scoped>
.flyout>ul {
  color: gray;
  margin-left: 16px;
}

.flyout>ul>li:first-child{
  margin-top: 8px;
}

.flyout>ul>li>.link-item {
  display: inline-block;
  color: aliceblue;
  margin-right: 16px;
  line-height: 38px;
  font-size: 22px;
  width: 174px;
  font-weight: bold;
  transition: filter 0.3s;
}

.flyout>ul>li>.link-item:hover {
  color: white;
  filter: drop-shadow(2px 2px 8px rgba(255, 255, 255, 0.3));
}

</style>
