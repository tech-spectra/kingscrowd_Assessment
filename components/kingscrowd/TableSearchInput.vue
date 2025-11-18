<template>
  <div class="relative w-full max-w-full sm:max-w-md">
    <div class="relative">
      <Icon
        name="heroicons:magnifying-glass"
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="text"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @keydown.escape="handleEscape"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        class="w-full rounded-md border border-input bg-background px-10 pr-10 py-2.5 sm:py-2 text-sm sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation"
      />
      <button
        v-if="modelValue"
        type="button"
        @click="handleClear"
        :aria-label="clearAriaLabel"
        class="absolute right-3 top-1/2 -translate-y-[40%] text-muted-foreground hover:text-foreground active:text-foreground transition-colors touch-manipulation p-1 -mr-1"
      >
        <Icon
          name="heroicons:x-mark"
          class="h-4 w-4 sm:h-4 sm:w-4"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TableSearchInput Component
 *
 * Reusable search input component for table filtering
 * Includes search icon, clear button, and keyboard navigation
 * Fully accessible with ARIA labels
 */

interface Props {
  /**
   * The current search query value
   */
  modelValue: string;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * ARIA label for the input
   */
  ariaLabel?: string;
  /**
   * ARIA label for the clear button
   */
  clearAriaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Search by name or platform...",
  ariaLabel: "Search deals by raise name or platform",
  clearAriaLabel: "Clear search",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  clear: [];
}>();

/**
 * Handles clear button click
 */
const handleClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

/**
 * Handles Escape key to clear search
 */
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    handleClear();
  }
};
</script>
