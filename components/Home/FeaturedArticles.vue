<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      {{ $t("recentArticles") }}
    </h2>
    <ul class="space-y-16" v-if="data && locale == 'en'">
      <li v-for="(article, id) in data[0]" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <ul class="space-y-16" v-if="data && locale == 'zh'">
      <li v-for="(article, id) in data[1]" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        :label="$t('allArticles') + ' &rarr;'"
        :to="`${locale}/articles`"
        variant="link"
        color="gray"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const { data } = await useAsyncData("articles-home", () => {
  const p1 = queryContent(`en/articles`)
    .sort({ published: -1 })
    .limit(3)
    .find();
  const p2 = queryContent(`zh/articles`)
    .sort({ published: -1 })
    .limit(3)
    .find();
  return Promise.all([p1, p2]);
});
</script>
