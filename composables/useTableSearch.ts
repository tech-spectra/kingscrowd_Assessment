/**
 * Table Search Composable
 * 
 * Provides reusable search/filter logic for table data
 * Handles search state and filtering functionality
 */

/**
 * Composable for managing table search functionality
 * @returns Object containing search state and filter function
 */
export const useTableSearch = () => {
  /**
   * Search query state
   * Stores the current search term entered by the user
   */
  const searchQuery = ref<string>("");

  /**
   * Filters deals based on search query
   * Searches in raise name and platform name (case-insensitive)
   * @param deals - Array of deal objects to filter
   * @returns Filtered array of deals matching the search query
   */
  const filterDeals = (deals: any[]): any[] => {
    if (!searchQuery.value.trim()) {
      return deals;
    }

    const query = searchQuery.value.trim().toLowerCase();

    return deals.filter((deal) => {
      // Search in raise name
      const raiseName = (deal.name || "").toLowerCase();
      const matchesRaiseName = raiseName.includes(query);

      // Search in platform name
      const platformName = (deal.platform_id?.name || "").toLowerCase();
      const matchesPlatform = platformName.includes(query);

      // Return true if either field matches
      return matchesRaiseName || matchesPlatform;
    });
  };

  /**
   * Clears the search query
   */
  const clearSearch = () => {
    searchQuery.value = "";
  };

  /**
   * Sets the search query
   * @param query - The search query string
   */
  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    searchQuery: readonly(searchQuery),
    filterDeals,
    clearSearch,
    setSearchQuery,
  };
};

