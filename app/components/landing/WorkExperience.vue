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
        'pb-16 sm:pb-16 lg:pb-24 !px-0 pt-8 sm:pt-4 lg:pt-2'
    }"
  >
    <template #leading>
      <span>
        {{ page.experience.title }}
      </span>
    </template>
    <div
      class="flex flex-col gap-2 mt-2 overflow-x-scroll lg:overflow-x-hidden"
    >
      <Motion
        v-for="(experience, index) in page.experience.items"
        :key="index"
        :initial="{
          opacity: 0,
          transform: 'translateY(20px)'
        }"
        :while-in-view="{
          opacity: 1,
          transform: 'translateY(0)'
        }"
        :transition="{ delay: 0.4 + 0.2 * index }"
        :in-view-options="{ once: true }"
        class="text-muted flex items-center text-nowrap gap-2"
      >
        <p class="text-sm">
          {{ experience.date }}
        </p>
        <USeparator />
        <ULink
          class="flex items-center gap-1"
          :to="experience.company.url"
          target="_blank"
        >
          <span class="text-sm">
            {{ experience.position }}
          </span>
          <div
            class="inline-flex items-center gap-1"
            :style="{ color: experience.company.color }"
          >
            <span class="font-medium">{{
              experience.company.name
            }}</span>
            <UIcon :name="experience.company.logo" />
          </div>
        </ULink>
      </Motion>
    </div>
  </UPageSection>
</template>

<style scoped></style>
