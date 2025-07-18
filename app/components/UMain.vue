<script setup lang="ts">
interface Props {
  ui?: Record<string, any>
  class?: any
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  ui: () => ({}),
  as: 'main'
})

defineSlots<{
  default?: any
}>()

const rootClasses = computed(() => {
  return [
    'min-h-[calc(100vh-var(--ui-header-height))] relative',
    props.ui?.root,
    props.class
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <component :is="as" :class="rootClasses">
    <slot />
  </component>
</template>
