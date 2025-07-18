<script setup lang="ts">
interface SearchFile {
  id: string;
  title: string;
  titles?: string[];
  level?: number;
  content?: string;
  description?: string;
  path?: string;
  [key: string]: any;
}

interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
  [key: string]: any;
}

interface Props {
  files?: SearchFile[];
  navigation?: NavigationItem[];
  shortcut?: string;
  links?: any[];
  fuse?: {
    resultLimit?: number;
    [key: string]: any;
  };
  ui?: Record<string, any>;
  class?: any;
}

const props = withDefaults(defineProps<Props>(), {
  files: () => [],
  navigation: () => [],
  shortcut: "meta_k",
  links: () => [],
  fuse: () => ({ resultLimit: 10 }),
  ui: () => ({}),
});

defineSlots<{
  default?: any;
}>();

const isOpen = ref(false);
const searchQuery = ref("");
const searchResults = ref<SearchFile[]>([]);

// Handle keyboard shortcut
const handleKeydown = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === "k") {
    event.preventDefault();
    isOpen.value = !isOpen.value;
  }
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

// Simple search implementation
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results = props.files
    .filter(
      (file) =>
        file.title?.toLowerCase().includes(query) ||
        file.description?.toLowerCase().includes(query) ||
        file.path?.toLowerCase().includes(query),
    )
    .slice(0, props.fuse.resultLimit || 10);

  searchResults.value = results;
};

watch(searchQuery, performSearch);

const closeModal = () => {
  isOpen.value = false;
  searchQuery.value = "";
  searchResults.value = [];
};

const navigateToResult = (path: string) => {
  navigateTo(path);
  closeModal();
};
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-search" class="size-5 text-muted" />
          <UInput
            v-model="searchQuery"
            placeholder="Search documentation..."
            variant="none"
            size="lg"
            class="flex-1"
            autofocus
          />
          <UKbd>{{ shortcut.replace("_", "+") }}</UKbd>
        </div>
      </template>

      <div
        v-if="searchQuery && searchResults.length === 0"
        class="p-4 text-center text-muted"
      >
        No results found for "{{ searchQuery }}"
      </div>

      <div
        v-else-if="searchResults.length > 0"
        class="max-h-96 overflow-y-auto"
      >
        <div class="space-y-1 p-2">
          <button
            v-for="result in searchResults"
            :key="result.id"
            class="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="navigateToResult(result.path)"
          >
            <div class="font-medium">{{ result.title }}</div>
            <div v-if="result.description" class="text-sm text-muted mt-1">
              {{ result.description }}
            </div>
            <div class="text-xs text-muted mt-1">{{ result.path }}</div>
          </button>
        </div>
      </div>

      <template v-if="!searchQuery" #footer>
        <div class="text-sm text-muted">
          <div class="mb-2">Quick links:</div>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="link in links.slice(0, 4)"
              :key="link.to"
              :to="link.to"
              variant="ghost"
              size="xs"
              @click="closeModal"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
