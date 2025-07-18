<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description:
    page.value?.seo.description || page.value?.description,
  ogDescription:
    page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page" class="w-full">
    <LandingHero :page />
    <Motion
      :initial="{
        opacity: 0,
        transform: 'translateY(20px)'
      }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)'
      }"
      :transition="{ delay: 0.4 + 0.2 }"
      :in-view-options="{ once: true }"
    >
      <UPageSection
        :ui="{
          container: '!pt-0 lg:gap-8 !flex !flex-col'
        }"
      >
        <LandingAbout :page />
        <LandingWorkExperience :page />
      </UPageSection>
    </Motion>
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
