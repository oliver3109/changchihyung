<script setup lang="ts">
interface Props {
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  ui: () => ({})
})

defineSlots<{
  default?: any
}>()

const rootClasses = computed(() => {
  return ['w-full', props.ui?.root, props.class]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div :class="rootClasses">
    <slot />
  </div>
</template>
