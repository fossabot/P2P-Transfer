/// I18n module
import { I18n, createI18n, useI18n } from 'vue-i18n';
import { createGlobalState, useLocalStorage } from '@vueuse/core';
import { Ref } from 'vue';

/* Default messages */
import en from '@/assets/locales/en.json'

/* Export available language */
export const availableLangs: { code: string; name: string }[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'zh',
    name: '中文'
  }
];

/* Export local locale */
export const useLocalLocale = createGlobalState(
  (): Ref<string> => useLocalStorage('language', 'en')
);

/* Set locale */
export async function setLocale(code: string, instance: ReturnType<typeof useI18n>): Promise<void> {
  const usableLocales: string[] = Object.keys(instance.messages.value);
  if (!usableLocales.includes(code)) {
    try {
      const message: any = (await import(`@/assets/locales/${code}.json`)).default;
      instance.messages.value[code] = message;
    } catch (err: unknown) {
      console.error(`Locale code not available: ${code}`);
    }
  }

  instance.locale.value = code;
  useLocalLocale().value = code;
}

/* Export i18n */
export const i18n: I18n = createI18n({
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: {
    en
  }
});
