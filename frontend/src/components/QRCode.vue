<script lang="ts" setup>
import { useSenderStore } from '@/stores/sender';
import { notify } from '@kyvg/vue3-notification';
import { useI18n } from 'vue-i18n';
import QRCode from 'qrcode';
import { computedAsync, useClipboard } from '@vueuse/core';
import { Ref } from 'vue';
import AppButton from './AppButton.vue';

/* Inject */
const { t } = useI18n();
const { shareLink } = useSenderStore();
const { copy, copied, isSupported } = useClipboard({ legacy: true });

/* Computed */
const dataUrl: Ref<string | undefined> = computedAsync(
  async (): Promise<string | undefined> => {
    if (shareLink.value === undefined) {
      return undefined;
    }
    try {
      return await QRCode.toDataURL(shareLink.value);
    } catch (err: unknown) {
      notify({
        title: t('notification.qrcode_fail'),
        type: 'error'
      });
      return undefined;
    }
  }
);

/* Functions */
async function copyLink(): Promise<void> {
  if (shareLink.value === undefined || !isSupported.value) {
    notify({
      title: t('notification.copy_fail'),
      type: 'error'
    });
    return;
  }

  await copy(shareLink.value);
  if (copied.value) {
    notify({
      title: t('notification.copy_ok'),
      type: 'success'
    });
  } else {
    notify({
      title: t('notification.copy_fail'),
      type: 'error'
    });
  }
}
</script>

<template>
  <div v-if="dataUrl !== undefined" class="flex flex-col gap-2 items-center">
    <img class="border-4 border-dashed h-[160px] w-[160px]" :src="dataUrl"/>
    <AppButton
      @click="copyLink"
      class="border-yellow-400 dark:hover:bg-yellow-400 hover:bg-yellow-400">
      {{ $t('button.click_to_copy') }}
    </AppButton>
  </div>
</template>
