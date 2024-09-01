<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" :title="$t('art')" :description="description" />
    <div class="space-y-24">
      <AppGenerativeArtCard v-for="(art, id) in arts" :key="id" :art="art" />
    </div>
  </main>
</template>

<script setup>
const { locale } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },
});

const description =
  lang.value == "zh"
    ? "我在空闲时间用 p5.js 做了一些算法生成式艺术。"
    : "I have created some algorithmic generative art using p5.js in my free time.";

useSeoMeta({
  title: "Art 艺术 | Oliver Chang",
  description,
});

const { data: arts } = await useAsyncData("arts", () =>
  queryContent(`${lang.value}/arts`).find()
);
</script>
