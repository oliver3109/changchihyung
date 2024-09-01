<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      {{ $t("recentArticles") }}
    </h2>
    <ul class="space-y-16" v-if="lang === 'en'">
      <li v-for="(article, id) in articlesEn" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
    <ul class="space-y-16" v-if="lang === 'zh'">
      <li v-for="(article, id) in articlesZh" :key="id">
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

let lang = ref<string>(locale.value);
let articlesEn = ref<any>([]);
let articlesZh = ref<any>([]);

const { data: dataEn } = await useAsyncData("articles-home", () =>
  queryContent(`en/articles`).sort({ published: -1 }).limit(3).find()
);
articlesEn.value = dataEn.value;

const { data: dataZh } = await useAsyncData("articles-home", () =>
  queryContent(`zh/articles`).sort({ published: -1 }).limit(3).find()
);
articlesZh.value = dataZh.value;

const nuxtApp = useNuxtApp();
nuxtApp.$i18n.onBeforeLanguageSwitch = (
  oldLocale: any,
  newLocale: any,
  isInitialSetup: any,
  nuxtApp: any
) => {
  lang.value = newLocale;
};
</script>
