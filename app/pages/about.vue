<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description:
    page.value?.seo?.description || page.value?.description,
  ogDescription:
    page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <div v-if="page">
    <!-- Hero Section -->
    <UPageSection
      :ui="{
        container: 'pt-24 pb-12 sm:pb-12 lg:pb-12'
      }"
    >
      <div
        class="flex flex-col lg:flex lg:flex-row items-center gap-8 justify-center"
      >
        <div class="flex-1">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-left mb-4"
          >
            {{ page.title }}
          </h1>
          <p class="text-md text-muted text-left">
            {{ page.description }}
          </p>
        </div>

        <div class="flex md:block justify-center">
          <UColorModeAvatar
            class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
            :light="global.picture?.light!"
            :dark="global.picture?.dark!"
            :alt="global.picture?.alt!"
          />
        </div>
      </div>
    </UPageSection>

    <!-- Content Section -->
    <UPageSection
      :ui="{
        container: 'py-2 sm:py-4 lg:py-8 overflow-hidden'
      }"
    >
      <MDC :value="page.content" unwrap="p" />

      <!-- <div
        class="flex flex-row justify-center items-center py-10 space-x-[-2rem]"
      >
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div> -->
    </UPageSection>
  </div>
</template>
