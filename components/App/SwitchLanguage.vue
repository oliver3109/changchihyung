<script setup>
const { locale, setLocale, setLocaleCookie } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },
});

const switchLocale = (v) => {
  setLocale(v);
  setLocaleCookie(v);
};
</script>

<template>
  <UTooltip
    :text="lang == 'zh' ? '切换语言' : 'switch language'"
    :ui="{ popper: { strategy: 'absolute' } }"
  >
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="switchLocale(lang == 'zh' ? 'en' : 'zh')"
    >
      <Icon
        aria-hidden="true"
        :name="lang == 'zh' ? 'ri:english-input' : 'uil:letter-chinese-a'"
        class="w-5 h-5"
      />
      <span class="sr-only">{{ $t("switchLanguage") }}</span>
    </button>
  </UTooltip>
</template>
