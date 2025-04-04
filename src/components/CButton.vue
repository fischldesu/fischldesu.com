<script setup lang="ts">
  import type { PropType } from 'vue';
  const emit = defineEmits(['click', 'double_click']);
  defineProps({
    Type: {
      required: true,
      type: String as PropType<ButtonType>,
    }
  });

  function OnSingleClicked() {
    emit('click');
  }
  function OnDoubleClicked() {
    emit('double_click');
  }

</script>

<script lang="ts">
export enum ButtonType {
  Text = 'Text',
  Icon = 'Icon',
  TextIcon = 'TextIcon',
}
</script>

<template>
  <a class="button {{Type}}}" @click="OnSingleClicked" @dblclick="OnDoubleClicked">
    <slot></slot>
  </a>
</template>

<style scoped>

.button.Text
{

}


</style>
