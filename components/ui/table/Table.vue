<template>
  <div class="relative w-full">
    <table :class="cn('w-full caption-bottom text-sm', $attrs.class as string | undefined)">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
</script>
