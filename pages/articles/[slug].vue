<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>{{ doc.title }}</h1>
          <p>{{ getReadableDate(doc.published) }}</p>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;
useSeoMeta({
  ogImage: `https://chihyungchang.com/articles/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: "ZHI YONG ZHANG",
});

const getReadableDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
