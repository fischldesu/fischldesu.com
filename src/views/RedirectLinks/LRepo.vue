<script setup lang="ts">
import CNavLink from "@/components/CNavLink.vue";
</script>

<script lang="ts">
export const meta = {
  redirect: 'https://repo.fischldesu.com',
  name: 'Collections & Repo 仓库'
}
</script>

<template>
  <CNavLink :href="meta.redirect">{{meta.name}}</CNavLink>
</template>

<style scoped>

</style>
