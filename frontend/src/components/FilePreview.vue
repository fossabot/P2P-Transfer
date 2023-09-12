<script lang="ts" setup>
import PopUp from '@/layouts/PopUp.vue';
import AppButton from '@/components/AppButton.vue';
import { Ref, ref } from 'vue';
import { useSenderStore } from '@/stores/sender';
import { computedAsync } from '@vueuse/core';

/* Injects */
const { file, fileSize, fileCanPreview } = useSenderStore();

/* Reactive */
const showMenu: Ref<boolean> = ref(false);

/* Computed */
const dataUrl: Ref<string> = computedAsync(async (): Promise<string> => {
  if (file.value === undefined || !fileCanPreview.value) {
    return '';
  }
  if (file.value.type.startsWith('text/')) {
    return await new Promise<string>((res: (value: string) => void): void => {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', (): void => {
        res(reader.result as string);
      });
      reader.readAsText((file.value as File).slice(0, 1024));
    });
  }
  return URL.createObjectURL(file.value);
});
</script>

<template>
  <PopUp @close="showMenu = false" :show-menu="showMenu" wrapper-class="z-20">
    <template #default>
      <div class="flex flex-col items-center justify-center z-30">
        <audio
          v-if="file?.type.startsWith('audio/')"
          class="absolute bg-white max-h-[95%] max-w-[95%] p-2 rounded-lg dark:bg-neutral-900 dark:border dark:border-white dark:text-white"
          controls>
          <source :src="dataUrl"/>
        </audio>
        <img
          v-if="file?.type.startsWith('image/')"
          class="absolute bg-white max-h-[95%] max-w-[95%] p-2 rounded-lg dark:bg-neutral-900 dark:border dark:border-white dark:text-white"
          :src="dataUrl"/>
        <div
          v-if="file?.type.startsWith('text/')"
          class="absolute bg-white max-h-[95%] max-w-[95%] overflow-auto p-4 rounded-lg dark:bg-neutral-900 dark:border dark:border-white dark:text-white">
          <pre>{{ dataUrl }}</pre>
          <p
            v-if="fileSize > 1024"
            class="text-red-500">
            ...{{ fileSize - 1024 }} Byte(s) left
          </p>
        </div>
        <video
          v-if="file?.type.startsWith('video/')"
          class="absolute bg-white max-h-[95%] max-w-[95%] p-2 rounded-lg dark:bg-neutral-900 dark:border dark:border-white dark:text-white"
          controls>
          <source :src="dataUrl"/>
        </video>
      </div>
    </template>
    <template #button>
      <AppButton
        @click="showMenu = true"
        v-if="fileCanPreview"
        class="border-cyan-500 dark:hover:bg-cyan-500 hover:bg-cyan-500">
        {{ $t('button.preview') }}
      </AppButton>
    </template>
  </PopUp>
</template>
