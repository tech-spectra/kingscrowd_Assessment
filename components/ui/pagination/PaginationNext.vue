<template>
  <button
    :class="
      cn(
        'inline-flex h-9 sm:h-10 items-center justify-center rounded-md border border-input bg-background px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ring-offset-background transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:border-input touch-manipulation',
        $attrs.class
      )
    "
    v-bind="$attrs"
  >
    <slot>Next</slot>
  </button>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
</script>

