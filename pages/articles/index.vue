<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-16"
      :title="$t('article')"
      :description="description"
    />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
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
    ? "我所有关于编程、AR/VR/MR技术等的长篇想法都是按时间顺序收集的。"
    : "All of my lengthy ideas about programming, AR/VR/MR technology, etc. are collected in chronological order.";
useSeoMeta({
  title: "Articles 文章 | Oliver Chang",
  description,
});

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent(`${lang.value}/articles`).sort({ published: -1 }).find()
);
</script>
