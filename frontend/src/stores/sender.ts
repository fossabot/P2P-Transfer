/// Sender utils
import { createGlobalState } from '@vueuse/core';
import { ComputedRef, Ref, computed, ref } from 'vue';
import { convert } from '@/utils/unit';

/* Types */
export enum SenderStatus {
  Error,
  Idle,
  Connecting,
  WaitingPeer,
  WaitingAccept,
  Negotiating,
  Transfering,
  Finished
}
export interface SenderStore {
  // States
  status: Ref<SenderStatus>;
  file: Ref<File | undefined>;
  shareLink: Ref<string | undefined>;
  hostId: Ref<string | undefined>;
  peerId: Ref<string | undefined>;
  speed: Ref<number>;
  recvBytes: Ref<number>;

  // Getters
  fileName: ComputedRef<string>;
  fileSize: ComputedRef<number>;
  fileSizeStr: ComputedRef<string>;
  fileType: ComputedRef<string>;
  fileCanPreview: ComputedRef<boolean>;
  speedStr: ComputedRef<string>;
  progress: ComputedRef<number>;

  // Actions
  init: () => void;
}

/* Export sender status */
export const useSenderStore = createGlobalState((): SenderStore => {
  // States
  const status: Ref<SenderStatus> = ref(SenderStatus.Idle);
  const file: Ref<File | undefined> = ref();
  const shareLink: Ref<string | undefined> = ref();
  const hostId: Ref<string | undefined> = ref();
  const peerId: Ref<string | undefined> = ref();
  const speed: Ref<number> = ref(0);
  const recvBytes: Ref<number> = ref(0);

  // Getters
  const fileName: ComputedRef<string> = computed((): string =>
    file.value === undefined ? '' : file.value.name
  );
  const fileSize: ComputedRef<number> = computed((): number =>
    file.value === undefined ? 0 : file.value.size
  );
  const fileSizeStr: ComputedRef<string> = computed((): string =>
    convert(fileSize.value, 'B')
  );
  const fileType: ComputedRef<string> = computed((): string =>
    file.value === undefined
      ? ''
      : file.value.type === ''
      ? 'Unknown'
      : file.value.type
  );
  const fileCanPreview: ComputedRef<boolean> = computed((): boolean => {
    if (file.value === undefined || status.value !== SenderStatus.Idle) {
      return false;
    }
    for (const i of ['audio/', 'image/', 'text/', 'video/']) {
      if (file.value.type.startsWith(i)) {
        return true;
      }
    }
    return false;
  });
  const speedStr: ComputedRef<string> = computed((): string =>
    convert(speed.value, 'B/s')
  );
  const progress: ComputedRef<number> = computed((): number =>
    file.value === undefined ? 0 : recvBytes.value / file.value.size
  );

  // Actions
  function init(): void {
    status.value = SenderStatus.Idle;
    file.value = undefined;
    shareLink.value = undefined;
    hostId.value = undefined;
    peerId.value = undefined;
    speed.value = 0;
    recvBytes.value = 0;
  }

  // Return
  return {
    status,
    file,
    shareLink,
    hostId,
    peerId,
    speed,
    recvBytes,
    fileName,
    fileSize,
    fileSizeStr,
    fileType,
    fileCanPreview,
    speedStr,
    progress,
    init
  };
});
