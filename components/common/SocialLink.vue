<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="text-gray-400 hover:text-gray-300 transition-colors"
    aria-label="Social media link"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

