<template>
  <button
    type="button"
    @click="$emit('toggle')"
    @keydown.enter.prevent="$emit('toggle')"
    @keydown.space.prevent="$emit('toggle')"
    :aria-label="ariaLabel"
    :aria-sort="ariaSort"
    class="flex items-center justify-center gap-2 hover:text-primary-hover transition-colors w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
  >
    <slot />
    <span class="flex flex-col" aria-hidden="true">
      <Icon
        name="heroicons:chevron-up"
        :class="[
          'h-3 w-3',
          isActive && direction === 'asc'
            ? 'text-primary'
            : 'text-muted-foreground',
        ]"
      />
      <Icon
        name="heroicons:chevron-down"
        :class="[
          'h-3 w-3 -mt-1',
          isActive && direction === 'desc'
            ? 'text-primary'
            : 'text-muted-foreground',
        ]"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
/**
 * TableSortButton Component
 * 
 * Reusable sort button component for table headers
 * Displays sort indicators and handles click and keyboard events
 * Fully accessible with ARIA labels and keyboard navigation
 */

import { computed } from "vue";

interface Props {
  isActive: boolean;
  direction: "asc" | "desc";
  columnName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  columnName: "column",
});

defineEmits<{
  toggle: [];
}>();

/**
 * Computed ARIA label for the sort button
 * Provides descriptive label for screen readers
 */
const ariaLabel = computed(() => {
  if (!props.isActive) {
    return `Sort by ${props.columnName} in ascending order`;
  }
  const nextDirection = props.direction === "asc" ? "descending" : "ascending";
  return `Sorted by ${props.columnName} in ${props.direction === "asc" ? "ascending" : "descending"} order. Click to sort in ${nextDirection} order`;
});

/**
 * Computed ARIA sort attribute
 * Indicates current sort state for screen readers
 */
const ariaSort = computed(() => {
  if (!props.isActive) {
    return "none";
  }
  return props.direction === "asc" ? "ascending" : "descending";
});
</script>

