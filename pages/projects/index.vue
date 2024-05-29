<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Project 项目" :description="description" />
    <div class="space-y-4">
      <AppProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
const description = "这些年来，我做了很多项目，但这些是我最自豪的。";
useSeoMeta({
  title: "Projects 项目 | Oliver Chang",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
