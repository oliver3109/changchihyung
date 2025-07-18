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
  left?: any
  center?: any
  right?: any
}>()

const rootClasses = computed(() => {
  return [
    'border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900',
    props.ui?.root,
    props.class
  ]
    .filter(Boolean)
    .join(' ')
})

const containerClasses = computed(() => {
  return ['mx-auto max-w-7xl', props.ui?.container]
    .filter(Boolean)
    .join(' ')
})

const innerClasses = computed(() => {
  return [
    'flex items-center justify-between py-4',
    props.ui?.inner
  ]
    .filter(Boolean)
    .join(' ')
})

const leftClasses = computed(() => {
  return ['flex items-center gap-3', props.ui?.left]
    .filter(Boolean)
    .join(' ')
})

const centerClasses = computed(() => {
  return ['flex items-center gap-3', props.ui?.center]
    .filter(Boolean)
    .join(' ')
})

const rightClasses = computed(() => {
  return ['flex items-center gap-3', props.ui?.right]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <footer :class="rootClasses">
    <div :class="containerClasses">
      <div :class="innerClasses">
        <div v-if="$slots.left" :class="leftClasses">
          <slot name="left" />
        </div>

        <div v-if="$slots.center" :class="centerClasses">
          <slot name="center" />
        </div>

        <div v-if="$slots.right" :class="rightClasses">
          <slot name="right" />
        </div>

        <div
          v-if="
            $slots.default &&
            !$slots.left &&
            !$slots.center &&
            !$slots.right
          "
          class="w-full"
        >
          <slot />
        </div>
      </div>
    </div>
  </footer>
</template>
