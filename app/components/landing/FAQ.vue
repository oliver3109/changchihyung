<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

// import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const items = computed(() => {
  return props.page.faq?.categories.map(faq => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions
    }
  })
})

const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator:
    'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger:
    'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'truncate'
}
</script>

<template>
  <UPageSection
    :title="page.faq.title"
    :description="page.faq.description"
    :ui="{
      container:
        'pb-8 sm:pb-16 lg:pb-24 flex flex-col gap-4',
      title:
        'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <UTabs :items orientation="horizontal" :ui>
      <template #content="{ item }">
        <UPageAccordion
          trailing-icon="i-lucide-plus"
          :items="item.questions"
          :ui="{
            item: 'border-none',
            trigger:
              'border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50',
            trailingIcon:
              'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-45'
          }"
        >
          <template #body="{ item: _item }">
            {{ _item.content }}
          </template>
        </UPageAccordion>
      </template>
    </UTabs>
  </UPageSection>
</template>
