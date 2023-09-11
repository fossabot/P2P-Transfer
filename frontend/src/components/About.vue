<script lang="ts" setup>
import PopUp from '@/layouts/PopUp.vue';
import { Ref, ref } from 'vue';

/* Reactive */
const showMenu: Ref<boolean> = ref(false);
</script>

<template>
  <PopUp @close="showMenu = false" :show-menu="showMenu" wrapper-class="z-10">
    <template #default>
      <div
        class="bg-white flex flex-col font-bold font-smiley gap-2 items-center justify-center p-4 rounded-lg text-xl z-20 dark:bg-neutral-900 dark:border dark:border-white dark:text-white">
        <p>
          <span>{{ $t('about.0') }}</span>
          <a
            href="https://transfer.zip/"
            rel="external"
            target="_blank">
            Transfer.zip
          </a>
        </p>
        <p>
          <span>{{ $t('about.1') }}</span>
          <a
            href="https://github.com/SamuNatsu"
            rel="external"
            target="_blank">
            Rainiar
          </a>
        </p>
        <p class="mt-4">{{ $t('about.2') }}</p>
      </div>
    </template>
    <template #button>
      <button @click="showMenu = true">
        <img class="h-6 transition-[filter] w-6 dark:invert" src="/imgs/info.svg"/>
      </button>
    </template>
  </PopUp>
</template>

<style scoped>
a {
  @apply text-blue-500 transition-colors hover:text-red-500
}
</style>
