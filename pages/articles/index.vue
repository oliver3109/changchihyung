<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-16"
      :title="$t('article')"
      :description="$t('allArticlesDescription')"
    />
    <ul class="space-y-16">
      <li
        v-if="data && locale == 'en'"
        v-for="(article, id) in data[0]"
        :key="id"
      >
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <ul class="space-y-16">
      <li
        v-if="data && locale == 'zh'"
        v-for="(article, id) in data[1]"
        :key="id"
      >
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const { locale, t } = useI18n();

useSeoMeta({
  title: "Projects 项目 | ZHI YONG ZHANG",
  description: t("allArticlesDescription"),
});

const { data } = await useAsyncData("all-articles", () => {
  const p1 = queryContent(`en/articles`).find();
  const p2 = queryContent(`zh/articles`).find();
  return Promise.all([p1, p2]);
});
</script>
