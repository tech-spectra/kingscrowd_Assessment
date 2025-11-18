<template>
  <td
    :scope="scope"
    :class="
      cn(
        'p-3 sm:p-4 align-middle text-center border-r border-border last:border-r-0 text-xs sm:text-sm [&:has([role=checkbox])]:pr-0',
        $attrs.class
      )
    "
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";

interface Props {
  scope?: "col" | "row" | "colgroup" | "rowgroup";
}

withDefaults(defineProps<Props>(), {
  scope: undefined,
});
</script>
