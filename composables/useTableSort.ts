/**
 * Table Sort Composable
 * 
 * Provides reusable sorting logic for table columns
 * Handles sort state and toggle functionality
 */

export type SortColumn = "moneyRaised" | "valuation" | null;
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  column: SortColumn;
  direction: SortDirection;
}

export const useTableSort = () => {
  /**
   * Sorting configuration state
   * Tracks which column is being sorted and the sort direction
   */
  const sortConfig = ref<SortConfig>({
    column: null,
    direction: "asc",
  });

  /**
   * Toggles sort direction for a column or sets new column to sort
   * @param column - The column to sort by
   */
  const toggleSort = (column: "moneyRaised" | "valuation") => {
    if (sortConfig.value.column === column) {
      // Toggle direction if same column is clicked
      sortConfig.value.direction =
        sortConfig.value.direction === "asc" ? "desc" : "asc";
    } else {
      // Set new column with ascending direction
      sortConfig.value.column = column;
      sortConfig.value.direction = "asc";
    }
  };

  return {
    sortConfig: readonly(sortConfig),
    toggleSort,
  };
};

