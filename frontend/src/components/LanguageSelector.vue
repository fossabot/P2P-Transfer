<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { availableLangs, setLocale } from '@/i18n';
import { useI18n } from 'vue-i18n';
import PopUp from '@/layouts/PopUp.vue';

/* Injects */
const i18n = useI18n();

/* Reactive */
const showMenu: Ref<boolean> = ref(false);

/* Actions */
function changeLocale(code: string): void {
  setLocale(code, i18n);
  showMenu.value = false;
}
</script>

<template>
  <PopUp @close="showMenu = false" :show-menu="showMenu" wrapper-class="z-10">
    <template #default>
      <div
        class="bg-white flex flex-col gap-2 items-center justify-center p-4 rounded-lg z-20 dark:border dark:border-white dark:bg-neutral-900 dark:text-white">
        <button
          v-for="i in availableLangs"
          @click="changeLocale(i.code)"
          class="transition-colors disabled:font-bold disabled:hover:text-black hover:text-blue-500"
          :disabled="i18n.locale.value === i.code">
          {{ i.name }}
        </button>
      </div>
    </template>
    <template #button>
      <button @click="showMenu = true">
        <img
          class="h-6 transition-[filter] w-6 dark:invert"
          draggable="false"
          src="/imgs/language.svg"/>
      </button>
    </template>
  </PopUp>
</template>
