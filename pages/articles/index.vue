<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Article 文章" :description="description" />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "我所有关于编程、算法生成艺术、元宇宙AR/VR/MR等的长篇想法都是按时间顺序收集的。";
useSeoMeta({
  title: "Articles 文章 | Oliver Chang",
  description,
});

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/articles").sort({ published: -1 }).find()
);
</script>
