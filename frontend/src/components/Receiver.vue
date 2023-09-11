<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
import PopUp from '@/layouts/PopUp.vue';
import { Ref, ref } from 'vue';

/* Reactive */
const showMenu: Ref<boolean> = ref(false);
</script>

<template>
  <PopUp @close="showMenu = false" :show-menu="showMenu">
    <template>
      <div>A</div>
    </template>
    <template #button>
      <AppButton
        @click="showMenu = true"
        class="border-green-500 dark:hover:bg-green-500 hover:bg-green-500">
        {{ $t('button.receive_file') }}
      </AppButton>
    </template>
  </PopUp>
</template>
