<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import DarkModeToggle from './components/DarkModeToggle.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import { setLocale, useLocalLocale } from './i18n';
import { onBeforeMount } from 'vue';
import Sender from './components/Sender.vue';
import Receiver from './components/Receiver.vue';
import About from './components/About.vue';

/* Constants */
const version: string = __APP_VERSION__;

/* Injects */
const i18n = useI18n();
const localLocale = useLocalLocale();

/* Life cycle */
onBeforeMount((): void => {
  setLocale(localLocale.value, i18n);
});
</script>

<template>
  <div
    class="bg-neutral-50 fixed inset-0 transition-colors -z-50 dark:bg-neutral-900">
  </div>
  <div class="fixed flex flex-col gap-16 inset-0 items-center justify-center">
    <header class="flex gap-4 items-center justify-center select-none">
      <img class="h-16 w-16" draggable="false" src="/logo.svg"/>
      <h1
        class="font-bold font-smiley relative transition-colors dark:text-white">
        <span class="text-4xl">P2P Transfer</span>
        <span class="absolute -bottom-5 right-2">
          {{ version }}
        </span>
      </h1>
    </header>
    <main class="flex flex-col gap-4 items-center justify-center">
      <Sender/>
      <Receiver/>
    </main>
    <footer class="bottom-4 fixed flex gap-4 items-center justify-center">
      <About/>
      <a
        draggable="false"
        href="https://github.com/SamuNatsu/P2P-Transfer"
        rel="external"
        target="_blank">
        <img
          class="h-6 transition-[filter] w-6 dark:invert"
          draggable="false"
          src="/imgs/github.svg"/>
      </a>
      <LanguageSelector/>
      <DarkModeToggle/>
    </footer>
  </div>
  <notifications/>
</template>
