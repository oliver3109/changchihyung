<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Lab 实验室" :description="description" />
    <div class="space-y-24">
      <ContentList path="/lab" v-slot="{ list }">
        <ContentQuery
          v-for="item in list"
          :key="item._path"
          :path="item._path"
          find="one"
          v-slot="{ data }"
        >
          <ContentRenderer>
            <ContentRendererMarkdown :value="data" />
          </ContentRenderer>
        </ContentQuery>
      </ContentList>
    </div>
  </main>
</template>

<script setup>
const description = "我在空闲时间用UI做了一些随机实验。";
useSeoMeta({
  title: "Lab | ZHI YONG ZHANG",
  description,
});
</script>
