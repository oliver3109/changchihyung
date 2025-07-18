<script setup lang="ts">
interface Props {
  name?: string
  description?: string
  avatar?: { src?: string; alt?: string }
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  orientation?: 'horizontal' | 'vertical'
  color?: string
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  orientation: 'horizontal',
  color: 'primary',
  variant: 'solid',
  ui: () => ({})
})

defineSlots<{
  default?: any
  avatar?: any
  name?: any
  description?: any
}>()

const sizeClasses = {
  xs: {
    avatar: 'size-6',
    text: 'text-xs',
    gap: 'gap-2'
  },
  sm: {
    avatar: 'size-8',
    text: 'text-sm',
    gap: 'gap-2'
  },
  md: {
    avatar: 'size-10',
    text: 'text-base',
    gap: 'gap-3'
  },
  lg: {
    avatar: 'size-12',
    text: 'text-lg',
    gap: 'gap-3'
  },
  xl: {
    avatar: 'size-16',
    text: 'text-xl',
    gap: 'gap-4'
  },
  '2xl': {
    avatar: 'size-20',
    text: 'text-2xl',
    gap: 'gap-4'
  },
  '3xl': {
    avatar: 'size-24',
    text: 'text-3xl',
    gap: 'gap-5'
  }
}

const rootClasses = computed(() => {
  const base =
    'relative group/user flex items-center justify-center'
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col text-center'
  }
  const gapClass = sizeClasses[props.size].gap

  return [
    base,
    orientationClasses[props.orientation],
    gapClass,
    props.ui?.root,
    props.class
  ]
    .filter(Boolean)
    .join(' ')
})

const avatarClasses = computed(() => {
  const base = 'rounded-full object-cover flex-shrink-0'
  const sizeClass = sizeClasses[props.size].avatar
  const variantClasses = {
    solid: `bg-${props.color}-500 text-white`,
    outline: `border-2 border-${props.color}-500 text-${props.color}-500`,
    soft: `bg-${props.color}-100 text-${props.color}-600 dark:bg-${props.color}-900 dark:text-${props.color}-400`,
    ghost: `text-${props.color}-500 hover:bg-${props.color}-50 dark:hover:bg-${props.color}-900`,
    link: `text-${props.color}-500 underline-offset-4 hover:underline`
  }

  return [
    base,
    sizeClass,
    variantClasses[props.variant],
    props.ui?.avatar
  ]
    .filter(Boolean)
    .join(' ')
})

const nameClasses = computed(() => {
  const base = 'font-semibold text-gray-900 dark:text-white'
  const sizeClass = sizeClasses[props.size].text

  return [base, sizeClass, props.ui?.name]
    .filter(Boolean)
    .join(' ')
})

const descriptionClasses = computed(() => {
  const base = 'text-gray-500 dark:text-gray-400'
  const sizeClass =
    props.size === 'xs'
      ? 'text-xs'
      : props.size === 'sm'
        ? 'text-xs'
        : 'text-sm'

  return [base, sizeClass, props.ui?.description]
    .filter(Boolean)
    .join(' ')
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<template>
  <div :class="rootClasses">
    <slot name="avatar">
      <div
        v-if="avatar?.src || name"
        :class="avatarClasses"
      >
        <img
          v-if="avatar?.src"
          :src="avatar.src"
          :alt="avatar.alt || name"
          :class="avatarClasses"
        />
        <div
          v-else-if="name"
          :class="[
            avatarClasses,
            'flex items-center justify-center'
          ]"
        >
          {{ getInitials(name) }}
        </div>
      </div>
    </slot>

    <div
      v-if="$slots.default || name || description"
      class=""
    >
      <slot>
        <div
          v-if="$slots.name || name"
          :class="nameClasses"
        >
          <slot name="name">
            {{ name }}
          </slot>
        </div>

        <div
          v-if="$slots.description || description"
          :class="descriptionClasses"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>
