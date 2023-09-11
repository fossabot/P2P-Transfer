<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
import PopUp from '@/layouts/PopUp.vue';
import { SenderStatus, useSenderStore } from '@/stores/sender';
import { Ref, ref } from 'vue';
import FileSelector from './FileSelector.vue';
import ProgressBar from './ProgressBar.vue';

/* Injects */
const {
  status,
  file,
  fileName,
  fileSize,
  fileSizeStr,
  fileType,
  fileCanPreview,
  progress,
  init
} = useSenderStore();

/* Reactive */
const showMenu: Ref<boolean> = ref(false);

/* Actions */
function fileChange(ev: Event): void {
  const el: HTMLInputElement = ev.target as HTMLInputElement;
  const files: FileList = el.files as FileList;

  if (files.length === 0) {
    el.value = '';
    return;
  }

  file.value = files[0];
  el.value = '';
  status.value = SenderStatus.Transfering;
}
function beforeShowMenu(): void {
  init();
  showMenu.value = true;
}
</script>

<template>
  <PopUp @close="showMenu = false" :show-menu="showMenu" wrapper-class="z-10">
    <template #default>
      <div
        class="bg-white flex flex-col gap-8 items-center justify-center p-4 rounded-lg z-20 dark:bg-neutral-900 dark:border dark:border-white dark:text-white">
        <h2
          class="font-bold font-smiley text-2xl">
          {{ $t('button.send_file') }}
        </h2>
        <div class="flex gap-4 items-center justify-center">
          <FileSelector
            v-if="status <= SenderStatus.Idle || status === SenderStatus.Finished"
            @select="fileChange"
            class="border-green-500 dark:hover:bg-green-500 hover:bg-green-500"
            id="file-input">
            {{ $t('button.select') }}
          </FileSelector>
          <AppButton
            v-if="fileCanPreview"
            class="border-cyan-500 dark:hover:bg-cyan-500 hover:bg-cyan-500">
            {{ $t('button.preview') }}
          </AppButton>
          <AppButton
            v-if="file !== undefined && status === SenderStatus.Idle"
            class="border-blue-500 dark:hover:bg-blue-500 hover:bg-blue-500">
            {{ $t('button.send') }}
          </AppButton>
          <AppButton
            v-if="status > SenderStatus.Idle && status < SenderStatus.Finished"
            class="border-red-500 dark:hover:bg-red-500 hover:bg-red-500">
            {{ $t('button.abort') }}
          </AppButton>
        </div>
        <div
          v-if="file !== undefined"
          class="flex items-center justify-center">
          <table>
            <tr>
              <th>{{ $t('ui.file_name') }}</th>
              <td class="ellipsis" :title="fileName">{{ fileName }}</td>
            </tr>
            <tr>
              <th>{{ $t('ui.file_size') }}</th>
              <td :title="`${fileSize} Byte(s)`">{{ fileSizeStr }}</td>
            </tr>
            <tr>
              <th>{{ $t('ui.file_type') }}</th>
              <td class="ellipsis" :title="fileType">{{ fileType }}</td>
            </tr>
            <tr>
              <th>{{ $t('status._') }}</th>
              <td
                v-if="status === SenderStatus.Error"
                class="text-red-500">
                {{ $t('status.err') }}
              </td>
              <td 
                v-else-if="status === SenderStatus.Idle"
                class="text-neutral-500">
                {{ $t('status.idle') }}
              </td>
              <td
                v-else-if="status === SenderStatus.Connecting"
                class="text-orange-500">
                {{ $t('status.conn') }}
              </td>
              <td
                v-else-if="status === SenderStatus.WaitingPeer"
                class="text-cyan-500">
                {{ $t('status.wait_p') }}
              </td>
              <td
                v-else-if="status === SenderStatus.WaitingAccept"
                class="text-purple-500">
                {{ $t('status.wait_a') }}
              </td>
              <td
                v-else-if="status === SenderStatus.Negotiating"
                class="text-yellow-500">
                {{ $t('status.negot') }}
              </td>
              <td
                v-else-if="status === SenderStatus.Transfering"
                class="text-blue-500">
                {{ $t('status.trans') }}
              </td>
              <td v-else class="text-green-500">{{ $t('status.finish') }}</td>
            </tr>
            <tr v-if="status === SenderStatus.Transfering">
              <td class="pt-2" colspan="2">
                <ProgressBar :progress="progress * 100"/>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
    <template #button>
      <AppButton
        @click="beforeShowMenu"
        class="border-blue-500 dark:hover:bg-blue-500 hover:bg-blue-500">
        {{ $t('button.send_file') }}
      </AppButton>
    </template>
  </PopUp>
</template>

<style scoped>
td {
  @apply max-w-[10rem] md:max-w-xs
}
td.ellipsis {
  @apply overflow-hidden text-ellipsis whitespace-nowrap
}
th {
  @apply px-2
}
</style>
