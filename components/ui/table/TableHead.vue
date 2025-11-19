<template>
  <th
    :class="
      cn(
        'h-10 sm:h-12 px-2 sm:px-4 text-center align-middle font-medium text-muted-foreground border-r border-border last:border-r-0 text-xs sm:text-sm [&:has([role=checkbox])]:pr-0',
        $attrs.class as string | undefined
      )
    "
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
</script>
