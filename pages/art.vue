<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      :title="$t('art')"
      :description="$t('allArtDescription')"
    />
    <div class="space-y-24">
      <AppGenerativeArtCard
        v-if="data && locale == 'en'"
        v-for="(art, id) in data[0]"
        :key="id"
        :art="art"
      />
      <AppGenerativeArtCard
        v-if="data && locale == 'zh'"
        v-for="(art, id) in data[1]"
        :key="id"
        :art="art"
      />
    </div>
  </main>
</template>

<script setup>
const { locale, t } = useI18n();

useSeoMeta({
  title: "Art 艺术 | Oliver Chang",
  description: t("allArtDescription"),
});

const { data } = await useAsyncData("arts", () => {
  const p1 = queryContent(`en/arts`).find();
  const p2 = queryContent(`zh/arts`).find();
  return Promise.all([p1, p2]);
});
</script>
