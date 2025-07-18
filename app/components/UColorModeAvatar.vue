<script setup lang="ts">
interface Props {
  light?: string
  dark?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  ui: () => ({})
})

defineSlots<{
  default?: any
}>()

const colorMode = useColorMode()

const sizeClasses = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
  '2xl': 'size-20',
  '3xl': 'size-24'
}

const rootClasses = computed(() => {
  const base = 'rounded-full object-cover flex-shrink-0'
  const sizeClass = sizeClasses[props.size]
  
  return [
    base,
    sizeClass,
    props.ui?.root,
    props.class
  ].filter(Boolean).join(' ')
})

const currentSrc = computed(() => {
  if (colorMode.value === 'dark' && props.dark) {
    return props.dark
  }
  return props.light || props.dark
})
</script>

<template>
  <div :class="rootClasses">
    <slot>
      <img
        v-if="currentSrc"
        :src="currentSrc"
        :alt="alt"
        :class="rootClasses"
      />
      <div
        v-else
        :class="[rootClasses, 'bg-gray-200 dark:bg-gray-700 flex items-center justify-center']"
      >
        <UIcon name="i-lucide-user" class="size-1/2 text-gray-400" />
      </div>
    </slot>
  </div>
</template>
