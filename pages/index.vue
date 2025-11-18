<template>
  <div class="p-2 sm:p-4">
    <!-- Loading State -->
    <CrowdfundingTableSkeleton
      v-if="pending"
      role="status"
      aria-live="polite"
      aria-label="Loading crowdfunding deals"
    />

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-center p-8"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10"
        aria-hidden="true"
      >
        <Icon
          name="heroicons:exclamation-triangle"
          class="h-10 w-10 text-destructive"
        />
      </div>
      <h3 class="mb-2 text-xl font-semibold text-foreground">
        Unable to Load Data
      </h3>
      <p class="mb-4 text-muted-foreground">
        {{ getErrorMessage(error) }}
      </p>
      <Button
        @click="retryFetch"
        variant="secondary"
        aria-label="Retry loading crowdfunding deals"
        class="hover:bg-primary/90 hover:text-white"
      >
        <Icon
          name="heroicons:arrow-path"
          class="mr-2 h-4 w-4"
          aria-hidden="true"
        />
        Try Again
      </Button>
    </div>

    <!-- Empty State -->
    <EmptyState
      v-else-if="!deals || !deals.result || !deals.result.length"
      :show-back-button="deals && deals.current_page > 1"
      @go-to-page="(page: number) => handlePageChange(page, deals?.total_pages)"
    />

    <!-- Table with Data -->
    <CrowdfundingTable
      v-else
      :deals="deals"
      @changePage="(page: number) => handlePageChange(page, deals?.total_pages)"
    />

    <!-- Screen reader announcement for page changes -->
    <div
      v-if="deals && deals.result && deals.result.length"
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      Page {{ deals.current_page }} of {{ deals.total_pages }}. Showing
      {{ deals.result.length }} deals.
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Index Page - Main page displaying active crowdfunding deals
 *
 * This page handles:
 * - Fetching deals data from the API with pagination
 * - Managing loading, error, and empty states
 * - URL synchronization for pagination
 * - Error handling with toast notifications
 */

import { watch, onMounted } from "vue";
import CrowdfundingTable from "~/components/kingscrowd/CrowdfundingTable.vue";
import CrowdfundingTableSkeleton from "~/components/kingscrowd/CrowdfundingTableSkeleton.vue";
import EmptyState from "~/components/kingscrowd/EmptyState.vue";
import Button from "~/components/ui/button/Button.vue";

// Composables - Explicit imports for better reliability
import { useDealsPagination } from "~/composables/useDealsPagination";
import { useDealsData } from "~/composables/useDealsData";
import { useErrorMessages } from "~/composables/useErrorMessages";

// Composables
const { currentPage, handlePageChange, autoCorrectPage, resetToFirstPage } =
  useDealsPagination();
const { deals, pending, error, refreshData } = useDealsData(currentPage);
const { getErrorMessage } = useErrorMessages();

// Watch deals to auto-correct if current page exceeds total pages
watch(
  () => deals.value,
  (newDeals) => {
    if (newDeals?.total_pages) {
      autoCorrectPage(newDeals.total_pages);
    }
  },
  { immediate: false }
);

/**
 * Retries fetching data from the API
 */
const retryFetch = async () => {
  await refreshData();
};

/**
 * Initializes page state on component mount
 * Resets to page 1 if no query parameter is present
 */
onMounted(() => {
  resetToFirstPage();
});
</script>
