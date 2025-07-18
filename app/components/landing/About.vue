<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: '!px-0'
    }"
  >
    <h2
      class="text-left text-xl sm:text-xl lg:text-2xl font-medium"
    >
      {{ page.about.title }}
    </h2>
    <p
      class="text-left mt-3 text-sm sm:text-md lg:text-sm text-muted"
    >
      {{ page.about.description }}
    </p>
  </UPageSection>
</template>

<style scoped></style>
