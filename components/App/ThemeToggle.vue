<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const { locale, setLocale } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },
  set(v) {
    setLocale(v);
  },
});
</script>

<template>
  <UTooltip
    :text="lang == 'zh' ? '切换主题' : 'toggle theme'"
    :ui="{ popper: { strategy: 'absolute' } }"
  >
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="isDark = !isDark"
    >
      <Icon
        aria-hidden="true"
        :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
        class="w-5 h-5"
      />
      <span class="sr-only">{{ $t("toggleTheme") }}</span>
    </button>
  </UTooltip>
</template>
