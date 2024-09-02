<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      :title="$t('project')"
      :description="$t('allProjectsDescription')"
    />
    <div class="space-y-4">
      <AppProjectCard
        v-if="data && locale == 'en'"
        v-for="(project, id) in data[0]"
        :key="id"
        :project="project"
      />
      <AppProjectCard
        v-if="data && locale == 'zh'"
        v-for="(project, id) in data[1]"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
const { locale, t } = useI18n();
useSeoMeta({
  title: "Projects 项目 | Oliver Chang",
  description: t("allProjectsDescription"),
});

const { data } = await useAsyncData("projects-all", () => {
  const p1 = queryContent(`en/projects`).find();
  const p2 = queryContent(`zh/projects`).find();
  return Promise.all([p1, p2]);
});
</script>
