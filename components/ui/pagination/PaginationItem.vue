<template>
  <li :class="cn('', $attrs.class as string | undefined)">
    <slot />
  </li>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
</script>
