<template>
  <div
    class="mb-4 sm:mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
  >
    <div class="text-foreground text-left flex-1 max-w-3xl">
      <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-3">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="$slots.actions"
      class="w-full md:w-auto flex items-stretch md:items-center gap-2 flex-shrink-0"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TableHeaderSection Component
 *
 * Reusable header section component for tables
 * Displays title, optional description, and action buttons
 */

interface Props {
  /**
   * The main title of the table section
   */
  title: string;
  /**
   * Optional description text below the title
   */
  description?: string;
}

defineProps<Props>();
</script>
