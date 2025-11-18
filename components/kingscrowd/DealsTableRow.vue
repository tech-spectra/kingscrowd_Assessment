<template>
  <TableRow
    class="hover:bg-muted/30 transition-colors"
    :aria-rowindex="rowIndex"
  >
    <!-- Raise Name -->
    <TableCell class="font-semibold text-foreground" scope="row">
      <span class="whitespace-nowrap">{{ deal.name ?? "Unknown" }}</span>
    </TableCell>

    <!-- Platform -->
    <TableCell class="text-foreground">
      <span class="whitespace-nowrap">{{
        deal.platform_id?.name ?? "N/A"
      }}</span>
    </TableCell>

    <!-- Raise Status -->
    <TableCell>
      <span
        class="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
        :class="{
          'bg-green-100 text-green-800': deal.raise_status?.name === 'Active',
          'bg-muted text-muted-foreground':
            deal.raise_status?.name !== 'Active',
        }"
        :aria-label="`Status: ${deal.raise_status?.name ?? 'Unknown'}`"
      >
        {{ deal.raise_status?.name ?? "Unknown" }}
      </span>
    </TableCell>
    <!-- Money Raised -->
    <TableCell
      class="font-medium"
      :class="
        getMoneyRaisedColorClass(deal.funding_gather_money_raised_to_date?.raw)
      "
      :aria-label="`Money raised: ${
        deal.funding_gather_money_raised_to_date?.formatted ?? '$0'
      }`"
    >
      <span class="whitespace-nowrap">{{
        deal.funding_gather_money_raised_to_date?.formatted ?? "$0"
      }}</span>
    </TableCell>

    <!-- Valuation -->
    <TableCell
      class="text-foreground font-medium"
      :aria-label="`Valuation: ${deal.valuation?.formatted ?? 'N/A'}`"
    >
      <span class="whitespace-nowrap">{{
        deal.valuation?.formatted ?? "N/A"
      }}</span>
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
/**
 * DealsTableRow Component
 *
 * Displays a single row of deal data in the table
 * Handles formatting and conditional styling
 * Includes ARIA labels for accessibility
 */

import TableRow from "~/components/ui/table/TableRow.vue";
import TableCell from "~/components/ui/table/TableCell.vue";
import { MONEY_RAISED_THRESHOLDS } from "~/constants/deals";

interface Props {
  deal: any;
  rowIndex?: number;
}

withDefaults(defineProps<Props>(), {
  rowIndex: undefined,
});

/**
 * Gets color class based on money raised amount
 * @param rawAmount - The raw numeric amount
 * @returns Tailwind CSS class string for color
 */
function getMoneyRaisedColorClass(rawAmount?: number | string): string {
  const amount = Number(rawAmount || 0);

  if (amount > MONEY_RAISED_THRESHOLDS.HIGH) {
    return "text-green-700";
  } else if (amount > MONEY_RAISED_THRESHOLDS.MEDIUM) {
    return "text-yellow-600";
  } else {
    return "text-red-600";
  }
}
</script>
