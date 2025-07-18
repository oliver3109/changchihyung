<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container:
        '!px-0 sm:!px-6 lg:!px-8 !pt-0 pb-24 sm:pb-24 lg:pb-24'
    }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="page.testimonials"
      :autoplay="{ delay: 4000 }"
      loop
      dots
      :ui="{
        viewport:
          '-mx-4 sm:-mx-12 lg:-mx-16 bg-elevated/50 max-w-(--ui-container)'
      }"
    >
      <UPageCTA
        :description="item.quote"
        variant="naked"
        class="rounded-none"
        :ui="{
          container:
            ' flex flex-col lg:grid px-6 py-12 sm:px-18 lg:px-24 gap-8 sm:py-12 lg:py-24 sm:gap-8',
          description:
            '!text-base text-balance before:content-[open-quote] before:text-5xl lg:before:text-7xl before:inline-block before:text-dimmed before:absolute before:-ml-6 lg:before:-ml-10 before:-mt-2 lg:before:-mt-4 after:content-[close-quote] after:text-5xl lg:after:text-7xl after:inline-block after:text-dimmed after:absolute after:mt-1 lg:after:mt-0 after:ml-1 lg:after:ml-2'
        }"
      >
        <UUser
          v-bind="item.author"
          size="lg"
          class="justify-center"
        />
      </UPageCTA>
    </UCarousel>
  </UPageSection>
</template>
