<template>
  <nav
    v-if="totalPages > 0"
    class="flex justify-center sm:justify-end items-center mt-4 sm:mt-6 overflow-x-auto"
    aria-label="Pagination navigation"
  >
    <Pagination>
      <PaginationContent class="flex-wrap sm:flex-nowrap">
        <PaginationItem>
          <PaginationPrevious
            @click="$emit('pageChange', currentPage - 1)"
            :disabled="currentPage === 1"
            :aria-label="`Go to page ${currentPage - 1}`"
            :aria-disabled="currentPage === 1"
            class="text-black"
          />
        </PaginationItem>

        <!-- First Page -->
        <PaginationItem v-if="totalPages > 0">
          <PaginationLink
            @click="$emit('pageChange', 1)"
            :is-active="currentPage === 1"
            :aria-label="
              currentPage === 1 ? 'Current page, page 1' : 'Go to page 1'
            "
            :aria-current="currentPage === 1 ? 'page' : undefined"
          >
            1
          </PaginationLink>
        </PaginationItem>

        <!-- Left Ellipsis -->
        <PaginationItem v-if="currentPage > 3">
          <PaginationEllipsis aria-label="More pages before" />
        </PaginationItem>

        <!-- Middle Pages -->
        <template v-for="page in getMiddlePages()" :key="page">
          <PaginationItem v-if="page > 1 && page < totalPages">
            <PaginationLink
              @click="$emit('pageChange', page)"
              :is-active="page === currentPage"
              :aria-label="
                page === currentPage
                  ? `Current page, page ${page}`
                  : `Go to page ${page}`
              "
              :aria-current="page === currentPage ? 'page' : undefined"
            >
              {{ page }}
            </PaginationLink>
          </PaginationItem>
        </template>

        <!-- Right Ellipsis -->
        <PaginationItem v-if="currentPage < totalPages - 2">
          <PaginationEllipsis aria-label="More pages after" />
        </PaginationItem>

        <!-- Last Page -->
        <PaginationItem v-if="totalPages > 1">
          <PaginationLink
            @click="$emit('pageChange', totalPages)"
            :is-active="currentPage === totalPages"
            :aria-label="
              currentPage === totalPages
                ? `Current page, page ${totalPages}`
                : `Go to page ${totalPages}`
            "
            :aria-current="currentPage === totalPages ? 'page' : undefined"
          >
            {{ totalPages }}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            @click="$emit('pageChange', currentPage + 1)"
            :disabled="currentPage === totalPages"
            :aria-label="`Go to page ${currentPage + 1}`"
            :aria-disabled="currentPage === totalPages"
            class="text-black"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    <span class="sr-only"> Page {{ currentPage }} of {{ totalPages }} </span>
  </nav>
</template>

<script setup lang="ts">
/**
 * DealsPagination Component
 *
 * Reusable pagination component for deals table
 * Handles page navigation and displays page numbers with ellipsis
 */

import Pagination from "~/components/ui/pagination/Pagination.vue";
import PaginationContent from "~/components/ui/pagination/PaginationContent.vue";
import PaginationItem from "~/components/ui/pagination/PaginationItem.vue";
import PaginationLink from "~/components/ui/pagination/PaginationLink.vue";
import PaginationPrevious from "~/components/ui/pagination/PaginationPrevious.vue";
import PaginationNext from "~/components/ui/pagination/PaginationNext.vue";
import PaginationEllipsis from "~/components/ui/pagination/PaginationEllipsis.vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();

defineEmits<{
  pageChange: [page: number];
}>();

/**
 * Gets the middle pages to display around the current page
 * @returns Array of page numbers to display
 */
function getMiddlePages(): number[] {
  return [props.currentPage - 1, props.currentPage, props.currentPage + 1];
}
</script>
