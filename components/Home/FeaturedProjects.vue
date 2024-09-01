<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      {{ $t("featuredProjects") }}
    </h2>
    <div class="space-y-4" v-if="lang === 'en'">
      <AppProjectCard
        v-for="(project, id) in projectsEn"
        :key="id"
        :project="project"
      />
    </div>
    <div class="space-y-4" v-if="lang === 'zh'">
      <AppProjectCard
        v-for="(project, id) in projectsZh"
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

let lang = ref<string>(locale.value);
let projectsEn = ref<any>([]);
let projectsZh = ref<any>([]);

const { data: dataEn } = await useAsyncData("projects-home", () =>
  queryContent(`en/projects`).sort({ published: -1 }).limit(3).find()
);
projectsEn.value = dataEn.value;

const { data: dataZh } = await useAsyncData("projects-home", () =>
  queryContent(`zh/projects`).sort({ published: -1 }).limit(3).find()
);
projectsZh.value = dataZh.value;

watch(
  () => locale,
  async (newLocale) => {
    lang.value = newLocale.value;
  }
);
</script>
