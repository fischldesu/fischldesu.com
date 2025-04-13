<script setup lang="ts">
import CNavLink from "@/components/CNavLink.vue";
</script>

<script lang="ts">
export const meta = {
  redirect: 'https://space.bilibili.com/508358490',
  name: 'Bilibili 哔哩哔哩'
}
</script>

<template>
  <CNavLink :href="meta.redirect">{{meta.name}}</CNavLink>
</template>
