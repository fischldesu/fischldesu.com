<script setup lang="ts">
import CNavLink from "@/components/CNavLink.vue";
</script>

<script lang="ts">
export const meta = {
  redirect: 'https://blog.fischldesu.com',
  name: 'Blog 我的博客'
}
</script>

<template>
  <CNavLink :href="meta.redirect">{{meta.name}}</CNavLink>
</template>
