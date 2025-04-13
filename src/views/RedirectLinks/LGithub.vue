<script setup lang="ts">
import CNavLink from "@/components/CNavLink.vue";
</script>

<script lang="ts">
export const meta = {
  redirect: 'https://github.com/fischldesu',
  name: 'github@fischldesu'
}
</script>

<template>
  <CNavLink :href="meta.redirect">{{meta.name}}</CNavLink>
</template>
