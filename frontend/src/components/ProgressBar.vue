<script lang="ts" setup>
/* Properties */
defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="border-2 border-green-600 h-5 overflow-hidden relative rounded-xl select-none">
    <div
      class="absolute flex inset-0 items-center justify-center text-sm">
      {{ progress.toFixed(1) }}%
    </div>
    <div
      class="absolute bg-green-500 h-full text-base"
      :style="{ width: `${progress}%` }">
    </div>
    <div
      class="absolute flex inset-0 items-center justify-center text-sm text-white"
      :style="{ clipPath: `inset(0 ${100 - progress}% 0 0)` }">
      {{ progress.toFixed(1) }}%
    </div>
  </div>
</template>
