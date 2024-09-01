<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      {{ $t("recentArticles") }}
    </h2>
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
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

let articles = ref<any>([]);

const loadData = async (lang: string = "en") => {
  const { data } = await useAsyncData("articles-home", () =>
    queryContent(`/${lang}/articles`).sort({ published: -1 }).limit(3).find()
  );
  articles.value = data.value;
};
loadData(locale.value);

watch(
  () => locale,
  async (newLocale) => {
    loadData(newLocale.value);
  }
);
</script>
