<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';

/* Injects */
const isDark = useDark({ disableTransition: false });
const toggle = useToggle(isDark);
</script>

<template>
  <button @click="toggle()">
    <img
      class="h-6 w-6"
      draggable="false"
      :src="isDark ? '/imgs/moon.svg' : '/imgs/sun.svg'"/>
  </button>
</template>
