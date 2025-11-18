<template>
  <div
    class="flex flex-col items-center justify-center py-16 px-4"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <div class="mb-6" aria-hidden="true">
      <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <Icon name="heroicons:inbox" class="h-12 w-12 text-muted-foreground" />
      </div>
    </div>
    <h3 class="mb-2 text-xl font-semibold text-foreground">
      No Active Deals Found
    </h3>
    <p class="mb-6 max-w-md text-center text-muted-foreground">
      There are currently no active crowdfunding deals available on this page. Try navigating to a different page or check back later.
    </p>
    <Button
      v-if="showBackButton"
      @click="$emit('goToPage', 1)"
      variant="outline"
      aria-label="Navigate to the first page of results"
    >
      <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" aria-hidden="true" />
      Go to First Page
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";

interface Props {
  showBackButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  showBackButton: false,
});

defineEmits<{
  goToPage: [page: number];
}>();
</script>

