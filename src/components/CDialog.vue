<script setup lang="ts">
import {onMounted, ref} from "vue";
defineProps({
  title:{
    type: String,
    default: ""
  },
  closeButton: {
    type: Boolean,
    default: true
  }
});

const dialogElement = ref<HTMLDialogElement | null>(null);

function Show(modal: boolean) {
  const dialog = dialogElement.value;
  if (modal) dialog?.showModal();
  else dialog?.show();
}

function Close() {
  dialogElement.value?.close();
}

function PreventEvent(e:WheelEvent) {
  e.preventDefault();
}

function Init(dialog:HTMLDialogElement) {

  const show_ = HTMLDialogElement.prototype.showModal.bind(dialog);
  const close_ = HTMLDialogElement.prototype.close.bind(dialog);
  dialog.showModal = ()=>{
    document.body.addEventListener('wheel', PreventEvent, {passive: false});
    show_();
  }

  dialog.close = ()=>{
    close_();
    document.body.removeEventListener('wheel', PreventEvent);
  }

}

onMounted(()=>{
  const dialog = dialogElement.value;
  if(dialog)
    Init(dialog);
})


defineExpose({
  Close,
  Show,
  Dialog : dialogElement
})

</script>

<template>
  <dialog ref="dialogElement" class="dialog">
    <slot/>
    <p class="title-text">{{ title }}</p>
    <button v-if="closeButton" class="close-btn" @click="Close">⨉</button>
  </dialog>
</template>

<style scoped>
.dialog {
  width: 50vw;
  height: 50vh;
  max-width: 728px;
  min-width: 315px;
  max-height: 512px;
  min-height: 256px;
  border-radius: 8px;
}

.title-text {
  position: absolute;
  top: 12px;
  left: 16px;
  -webkit-user-select: none;
  user-select: none;
}

.close-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
