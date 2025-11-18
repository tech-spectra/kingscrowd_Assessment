/**
 * Deals Pagination Composable
 * 
 * Handles pagination logic including:
 * - Page state management
 * - URL synchronization
 * - Page validation
 * - Auto-correction of invalid pages
 */

export const useDealsPagination = () => {
  const route = useRoute();
  const router = useRouter();

  // Initialize current page from URL query parameter
  const currentPage = ref<number>(Number(route.query.page) || 1);

  /**
   * Handles page changes with validation and URL synchronization
   * @param page - The page number to navigate to
   * @param totalPages - Total number of pages available
   */
  const handlePageChange = async (page: number, totalPages?: number) => {
    // Prevent navigation to invalid pages
    if (page < 1) {
      return;
    }

    // Validate page number against total pages if provided
    if (totalPages && totalPages > 0 && page > totalPages) {
      page = totalPages;
    }

    // Update current page state
    currentPage.value = page;

    // Synchronize URL query parameter with page change
    await router.push({
      query: { ...route.query, page: page.toString() },
    });
  };

  /**
   * Watches route query changes (e.g., browser back/forward navigation)
   * Synchronizes currentPage state with URL
   */
  watch(
    () => route.query.page,
    (newPage) => {
      const page = Number(newPage) || 1;
      if (page !== currentPage.value) {
        currentPage.value = page;
      }
    },
    { immediate: true }
  );

  /**
   * Auto-corrects current page if it exceeds total pages
   * @param totalPages - Total number of pages available
   */
  const autoCorrectPage = (totalPages: number) => {
    if (totalPages > 0 && currentPage.value > totalPages) {
      handlePageChange(totalPages, totalPages);
    }
  };

  /**
   * Resets to page 1 if no query parameter is present
   */
  const resetToFirstPage = () => {
    if (!route.query.page && currentPage.value !== 1) {
      currentPage.value = 1;
    }
  };

  return {
    currentPage: readonly(currentPage),
    handlePageChange,
    autoCorrectPage,
    resetToFirstPage,
  };
};

