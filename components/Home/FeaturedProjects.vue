<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      {{ $t("featuredProjects") }}
    </h2>
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
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        :label="$t('allProjects') + ' &rarr;'"
        :to="`${locale}/projects`"
        variant="link"
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const { data } = await useAsyncData("projects-home", () => {
  const p1 = queryContent(`en/projects`)
    .sort({ published: -1 })
    .limit(3)
    .find();
  const p2 = queryContent(`zh/projects`)
    .sort({ published: -1 })
    .limit(3)
    .find();
  return Promise.all([p1, p2]);
});
</script>
