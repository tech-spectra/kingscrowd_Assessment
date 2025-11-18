<template>
  <a
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="text-sm font-medium text-gray-400 hover:text-white whitespace-nowrap transition-colors"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  target?: string;
}>();
</script>

