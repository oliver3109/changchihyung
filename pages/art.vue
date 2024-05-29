<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Art 艺术" :description="description" />
    <div class="space-y-24">
      <AppGenerativeArtCard v-for="(art, id) in arts" :key="id" :art="art" />
    </div>
  </main>
</template>

<script setup>
const description = "我在空闲时间用 p5.js 做了一些算法生成艺术。";
useSeoMeta({
  title: "Art 艺术 | Oliver Chang",
  description,
});

const { data: arts } = await useAsyncData("arts", () =>
  queryContent("/arts").find()
);
</script>
