<script setup lang="ts">
interface AccordionItem {
  label: string
  content?: string
  value?: string
  disabled?: boolean
  ui?: Record<string, any>
  class?: any
  [key: string]: any
}

interface Props {
  items?: AccordionItem[]
  trailingIcon?: string
  labelKey?: string
  ui?: Record<string, any>
  class?: any
  collapsible?: boolean
  defaultValue?: string | string[]
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  labelKey: 'label',
  ui: () => ({}),
  collapsible: true,
  type: 'multiple',
  disabled: false,
  trailingIcon: 'i-lucide-chevron-down'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

defineSlots<{
  default?: any
  leading?: (props: {
    item: AccordionItem
    index: number
    open: boolean
  }) => any
  body?: (props: {
    item: AccordionItem
    index: number
    open: boolean
  }) => any
  trailing?: (props: {
    item: AccordionItem
    index: number
    open: boolean
  }) => any
}>()

const openItems = ref<Set<string>>(new Set())

const isOpen = (value: string) => openItems.value.has(value)

const toggle = (value: string) => {
  if (props.type === 'single') {
    if (openItems.value.has(value)) {
      openItems.value.clear()
    } else {
      openItems.value.clear()
      openItems.value.add(value)
    }
  } else {
    if (openItems.value.has(value)) {
      openItems.value.delete(value)
    } else {
      openItems.value.add(value)
    }
  }

  const newValue =
    props.type === 'single'
      ? Array.from(openItems.value)[0] || ''
      : Array.from(openItems.value)

  emit('update:modelValue', newValue)
}

// Initialize with default value
onMounted(() => {
  if (props.defaultValue) {
    if (Array.isArray(props.defaultValue)) {
      props.defaultValue.forEach(value =>
        openItems.value.add(value)
      )
    } else {
      openItems.value.add(props.defaultValue)
    }
  }
})

// Watch for external model value changes
watch(
  () => props.modelValue,
  newValue => {
    openItems.value.clear()
    if (newValue) {
      if (Array.isArray(newValue)) {
        newValue.forEach(value =>
          openItems.value.add(value)
        )
      } else {
        openItems.value.add(newValue)
      }
    }
  },
  { immediate: true }
)

const rootClasses = computed(() => {
  return [props.ui?.root, props.class]
    .filter(Boolean)
    .join(' ')
})

const getItemClasses = (item: AccordionItem) => {
  return [
    'border border-gray-200 dark:border-gray-700 rounded-lg',
    props.ui?.item,
    item.ui?.item,
    item.class
  ]
    .filter(Boolean)
    .join(' ')
}

const getTriggerClasses = (item: AccordionItem) => {
  return [
    'w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
    'text-base font-medium',
    props.ui?.trigger,
    item.ui?.trigger
  ]
    .filter(Boolean)
    .join(' ')
}

const getBodyClasses = (item: AccordionItem) => {
  return [
    'px-4 pb-4 text-base text-muted',
    props.ui?.body,
    item.ui?.body
  ]
    .filter(Boolean)
    .join(' ')
}

const getTrailingIconClasses = (
  item: AccordionItem,
  open: boolean
) => {
  return [
    'size-5 transition-transform duration-200',
    open ? 'rotate-180' : 'rotate-0',
    props.ui?.trailingIcon,
    item.ui?.trailingIcon
  ]
    .filter(Boolean)
    .join(' ')
}
</script>

<template>
  <div :class="rootClasses">
    <div
      v-for="(item, index) in items"
      :key="item.value || String(index)"
      :class="getItemClasses(item)"
    >
      <button
        :class="getTriggerClasses(item)"
        :disabled="item.disabled || disabled"
        @click="toggle(item.value || String(index))"
      >
        <div
          class="flex items-center gap-3 flex-1 text-warp"
        >
          <slot
            name="leading"
            :item="item"
            :index="index"
            :open="isOpen(item.value || String(index))"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="size-5 shrink-0"
            />
          </slot>

          <span class="text-start break-words">
            {{ item[labelKey] }}
          </span>
        </div>

        <slot
          name="trailing"
          :item="item"
          :index="index"
          :open="isOpen(item.value || String(index))"
        >
          <UIcon
            :name="trailingIcon"
            :class="
              getTrailingIconClasses(
                item,
                isOpen(item.value || String(index))
              )
            "
          />
        </slot>
      </button>

      <div
        :class="[
          getBodyClasses(item),
          'accordion-content',
          {
            'accordion-open': isOpen(
              item.value || String(index)
            ),
            'accordion-closed': !isOpen(
              item.value || String(index)
            )
          }
        ]"
      >
        <div class="accordion-inner">
          <slot
            name="body"
            :item="item"
            :index="index"
            :open="isOpen(item.content || String(index))"
          >
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  overflow: hidden;
  transform: translateZ(0); /* GPU acceleration */
  backface-visibility: hidden; /* Prevent flickering */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 0;
  opacity: 0;
}

.accordion-content.accordion-open {
  max-height: 1000px; /* Large enough to accommodate content */
  opacity: 1;
}

.accordion-content.accordion-closed {
  max-height: 0;
  opacity: 0;
}

.accordion-inner {
  padding: 0;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content.accordion-open .accordion-inner {
  transform: translateY(0);
}

.accordion-content.accordion-closed .accordion-inner {
  transform: translateY(-10px);
}

/* For mobile devices - faster animation */
@media (max-width: 768px) {
  .accordion-content {
    transition-duration: 0.25s;
  }

  .accordion-inner {
    transition-duration: 0.25s;
  }

  .accordion-content.accordion-open {
    max-height: 600px; /* Smaller for mobile */
  }
}

/* Optimize performance */
.accordion-content,
.accordion-inner {
  will-change: max-height, opacity, transform;
}

/* Reset will-change after animation */
.accordion-content:not(.accordion-open):not(
    .accordion-closed
  ) {
  will-change: auto;
}
</style>
