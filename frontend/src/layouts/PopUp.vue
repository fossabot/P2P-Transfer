<script lang="ts" setup>
/* Properties */
defineProps<{
  showMenu: boolean;
  wrapperClass?: string;
}>();

/* Emits */
defineEmits<{
  close: []
}>();
</script>

<template>
  <Transition>
    <div
      v-if="showMenu"
      class="backdrop-brightness-50 fixed flex inset-0 items-center justify-center"
      :class="wrapperClass">
      <div @click="$emit('close')" class="fixed inset-0"></div>
      <slot></slot>
    </div>
  </Transition>
  <slot name="button"></slot>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
