<template>
  <div :class="cn('flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center', $attrs.class)">
    <span class="text-muted-foreground text-xs sm:text-sm">...</span>
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
</script>

