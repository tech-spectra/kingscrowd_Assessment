<template>
  <div class="w-full">
    <TableHeaderSection
      title="Active Public Fundraising Opportunities"
      description="Explore companies currently raising funds from the public. Each listing includes key details: company name, platform, funds raised, and valuation. Compare opportunities to make informed investment decisions."
    >
      <template #actions>
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
        >
          <TableSearchInput
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search by name or platform..."
            aria-label="Search deals by raise name or platform"
            @clear="handleSearchClear"
            class="w-full"
          />
          <Button
            @click="handleExportToCSV"
            aria-label="Export current page data to CSV file"
            class="w-full sm:w-auto whitespace-nowrap"
          >
            Export to CSV
          </Button>
        </div>
      </template>
    </TableHeaderSection>

    <div
      class="rounded-md border border-border shadow-lg overflow-hidden"
      role="region"
      aria-label="Crowdfunding deals table"
    >
      <!-- Mobile: Horizontal scroll wrapper -->
      <div class="overflow-x-auto scroll-smooth -mx-4 sm:mx-0">
        <div class="inline-block min-w-full align-middle px-4 sm:px-0">
          <Table class="min-w-[640px] sm:min-w-0">
            <TableHeader>
              <TableRow class="bg-muted">
                <TableHead class="font-semibold text-primary" scope="col">
                  Raise Name
                </TableHead>
                <TableHead class="font-semibold text-primary" scope="col">
                  Platform
                </TableHead>
                <TableHead class="font-semibold text-primary" scope="col">
                  Raise Status
                </TableHead>
                <TableHead class="font-semibold text-primary" scope="col">
                  <TableSortButton
                    :is-active="sortConfig.column === 'moneyRaised'"
                    :direction="sortConfig.direction"
                    column-name="Money Raised"
                    @toggle="toggleSort('moneyRaised')"
                  >
                    Money Raised
                  </TableSortButton>
                </TableHead>
                <TableHead class="font-semibold text-primary" scope="col">
                  <TableSortButton
                    :is-active="sortConfig.column === 'valuation'"
                    :direction="sortConfig.direction"
                    column-name="Valuation"
                    @toggle="toggleSort('valuation')"
                  >
                    Valuation
                  </TableSortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <DealsTableRow
                v-for="(deal, index) in sortedDeals"
                :key="deal.id || deal.name"
                :deal="deal"
                :row-index="index + 1"
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

    <DealsPagination
      :current-page="deals.current_page"
      :total-pages="deals.total_pages"
      @page-change="$emit('changePage', $event)"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * CrowdfundingTable Component
 *
 * Displays a table of active crowdfunding deals with:
 * - Sortable columns (Money Raised, Valuation)
 * - Pagination controls
 * - CSV export functionality
 * - Professional styling with Shadcn UI components
 */

import { computed, type PropType } from "vue";
import type { Deals } from "~/types/deals";

import { useTableSort } from "~/composables/useTableSort";
import { useCsvExport } from "~/composables/useCsvExport";
import { useTableSearch } from "~/composables/useTableSearch";

// Composables
const { sortConfig, toggleSort } = useTableSort();
const { exportToCSV } = useCsvExport();
const { searchQuery, filterDeals, setSearchQuery, clearSearch } =
  useTableSearch();

// UI Components
import Table from "~/components/ui/table/Table.vue";
import TableHeader from "~/components/ui/table/TableHeader.vue";
import TableBody from "~/components/ui/table/TableBody.vue";
import TableRow from "~/components/ui/table/TableRow.vue";
import TableHead from "~/components/ui/table/TableHead.vue";
import Button from "~/components/ui/button/Button.vue";
import TableSortButton from "~/components/kingscrowd/TableSortButton.vue";
import DealsTableRow from "~/components/kingscrowd/DealsTableRow.vue";
import DealsPagination from "~/components/kingscrowd/DealsPagination.vue";
import TableHeaderSection from "~/components/kingscrowd/TableHeaderSection.vue";
import TableSearchInput from "~/components/kingscrowd/TableSearchInput.vue";

// Constants
import { DEALS_CSV_HEADERS } from "~/constants/deals";

// Props
const props = defineProps({
  deals: {
    type: Object as PropType<Deals>,
    required: true,
  },
});

// Emits
defineEmits<{
  changePage: [page: number];
}>();

/**
 * Computed property that returns filtered and sorted deals
 * First filters deals based on search query, then sorts them
 * @returns Array of deals filtered and sorted based on current configuration
 */
const sortedDeals = computed(() => {
  // Start with all deals from props
  let deals = [...(props.deals.result || [])];

  // Apply search filter first
  deals = filterDeals(deals);

  // Return filtered deals if no sort column is selected
  if (!sortConfig.value.column) {
    return deals;
  }

  // Sort deals based on selected column and direction
  return deals.sort((a, b) => {
    let aValue: number = 0;
    let bValue: number = 0;

    // Extract numeric values based on sort column
    if (sortConfig.value.column === "moneyRaised") {
      aValue = Number(a.funding_gather_money_raised_to_date?.raw || 0);
      bValue = Number(b.funding_gather_money_raised_to_date?.raw || 0);
    } else if (sortConfig.value.column === "valuation") {
      aValue = Number(a.valuation?.raw || 0);
      bValue = Number(b.valuation?.raw || 0);
    }

    // Sort based on direction
    if (sortConfig.value.direction === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
});

/**
 * Handles search clear action
 */
const handleSearchClear = () => {
  clearSearch();
};

/**
 * Handles CSV export of current table data
 * Exports filtered and sorted deals
 * Uses the reusable CSV export composable
 */
const handleExportToCSV = () => {
  const rows = sortedDeals.value;

  // Extract row data function for CSV export
  const getRowData = (deal: any) => [
    deal.name ?? "Unknown",
    deal.raise_status?.name ?? "Unknown",
    deal.platform_id?.name ?? "N/A",
    deal.funding_gather_money_raised_to_date?.formatted ?? "$0",
    deal.valuation?.formatted ?? "N/A",
  ];

  // Export using composable
  exportToCSV(rows, [...DEALS_CSV_HEADERS], getRowData, {
    filename: `crowdfunding_deals_page_${props.deals.current_page}.csv`,
    showSuccessToast: true,
    showErrorToast: true,
  });
};
</script>
