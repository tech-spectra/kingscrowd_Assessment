<template>
  <button
    :class="
      cn(
        'inline-flex h-9 text-black sm:h-10 items-center justify-center rounded-md border border-input bg-background px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ring-offset-background transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-w-[2rem]',
        isActive &&
          'bg-primary text-primary-foreground hover:bg-primary-hover border-primary shadow-sm font-semibold',
        $attrs.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";

interface Props {
  isActive?: boolean;
}

withDefaults(defineProps<Props>(), {
  isActive: false,
});
</script>
