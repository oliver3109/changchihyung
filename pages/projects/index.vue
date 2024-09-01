<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      :title="$t('project')"
      :description="description"
    />
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
const { locale } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },
});

const description =
  lang.value == "zh"
    ? "这些年来，我做了很多项目，但这些是我最自豪的。"
    : "Over the years, I have worked on many projects, but these are the ones I am most proud of.";

useSeoMeta({
  title: "Projects 项目 | Oliver Chang",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent(`${lang.value}/projects`).find()
);
</script>
