<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

interface Props {
  surround?: ContentNavigationItem[] | undefined
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  surround: () => [],
  ui: () => ({})
})

const [prev, next] = props.surround || [null, null]
</script>

<template>
  <div
    v-if="prev || next"
    class="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
  >
    <!-- Previous Article -->
    <div class="flex-1">
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <UIcon name="lucide:chevron-left" class="size-4" />
        <div class="text-left">
          <div
            class="text-xs uppercase tracking-wide font-medium text-gray-500 dark:text-gray-500"
          >
            Previous
          </div>
          <div
            class="font-medium group-hover:text-primary transition-colors"
          >
            {{ prev.title }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Next Article -->
    <div class="flex-1 text-right">
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group flex items-center justify-end gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <div class="text-right">
          <div
            class="text-xs uppercase tracking-wide font-medium text-gray-500 dark:text-gray-500"
          >
            Next
          </div>
          <div
            class="font-medium group-hover:text-primary transition-colors"
          >
            {{ next.title }}
          </div>
        </div>
        <UIcon name="lucide:chevron-right" class="size-4" />
      </NuxtLink>
    </div>
  </div>
</template>
