/**
 * Deals Data Composable
 *
 * Handles fetching and managing deals data from the API
 * Includes validation, error handling, and data normalization
 */

import type { Deals } from "~/types/deals";
import { normalizeError, isHtmlResponse } from "~/utils/errorUtils";

export const useDealsData = (currentPage: Ref<number>) => {
  const { handleApiError } = useApiError();

  // Track which errors have already shown toasts to prevent duplicates
  const shownErrorIds = new Set<string>();

  /**
   * Fetches deals data from the API with pagination support
   * Uses page-specific cache keys to ensure proper data refresh on page changes
   */
  const {
    data: rawDeals,
    pending,
    error,
    refresh: refreshData,
  } = useAsyncData<Deals>(
    () => `deals-page-${currentPage.value}`,
    async () => {
      try {
        // Fetch deals data from API endpoint
        const response: any = await $fetch("/api/deals", {
          params: {
            page: currentPage.value,
          },
        });

        // Validate response and handle HTML responses (authentication failures)
        if (!validateApiResponse(response)) {
          throw new Error("Invalid API response");
        }

        // Return validated data or empty structure
        return (
          response?.data ?? {
            count: 0,
            total_count: 0,
            total_pages: 0,
            current_page: currentPage.value,
            result: [],
          }
        );
      } catch (err: any) {
        // Normalize and handle API errors with toast notifications
        const normalizedError = normalizeError(err);
        handleApiError(normalizedError);
        throw normalizedError;
      }
    },
    {
      default: () => null,
      watch: [currentPage],
      immediate: true,
      server: true,
      lazy: false,
    }
  );

  /**
   * Validates API response and detects HTML responses (authentication failures)
   * @param response - The API response to validate
   * @returns true if response is valid, false if HTML/authentication error detected
   */
  function validateApiResponse(response: any): boolean {
    // Check if response is HTML (indicates authentication failure)
    if (isHtmlResponse(response)) {
      const authError = {
        statusCode: 401,
        statusMessage: "Authentication failed",
        message: "Authentication failed. Please check your API key.",
        data: {
          statusCode: 401,
          message: "Authentication failed. Please check your API key.",
          error:
            "Invalid API key or authentication credentials. The server returned an HTML login page.",
        },
      };
      handleApiError(authError);
      return false;
    }

    return true;
  }

  /**
   * Computed property that validates and normalizes deals data
   * Handles edge cases like missing total_pages calculation and empty page results
   * @returns Validated deals data or null if still loading
   */
  const deals = computed<Deals | null>(() => {
    const data = rawDeals.value;

    // Return null if still loading to show skeleton loader
    if (pending.value || data === null) {
      return null;
    }

    // Validate data structure - return empty structure if invalid
    if (!data || typeof data !== "object") {
      return {
        count: 0,
        total_count: 0,
        total_pages: 0,
        current_page: currentPage.value,
        result: [],
      };
    }

    // Ensure result is always an array
    if (!Array.isArray(data.result)) {
      data.result = [];
    }

    // Calculate total_pages if API returns 0 but we have total_count
    // Uses actual count from response to determine accurate page size
    if (data.total_pages === 0 && data.total_count > 0 && data.count > 0) {
      data.total_pages = Math.ceil(data.total_count / data.count);
    }

    // Adjust total_pages if we get empty results on a page that should have data
    // This handles cases where API returns inconsistent pagination data
    if (
      data.result.length === 0 &&
      data.current_page > 1 &&
      data.total_pages >= data.current_page
    ) {
      data.total_pages = Math.max(1, data.current_page - 1);
    }

    return data;
  });

  /**
   * Watches for errors and displays toast notifications
   * Prevents duplicate toasts for the same error
   */
  watch(
    () => error.value,
    (newError, oldError) => {
      if (newError && newError !== oldError) {
        const normalizedError = normalizeError(newError);

        // Create a unique ID for this error based on status code and message
        const errorId = `${normalizedError.statusCode || 0}-${
          normalizedError.message || ""
        }-${Date.now()}`;

        // Only show toast if it hasn't been shown for this error
        if (!shownErrorIds.has(errorId)) {
          handleApiError(normalizedError);
          shownErrorIds.add(errorId);

          // Clean up old error IDs after 5 seconds to prevent memory leaks
          setTimeout(() => {
            shownErrorIds.delete(errorId);
          }, 5000);
        }
      }
    },
    { immediate: true, deep: true }
  );

  return {
    deals,
    pending,
    error,
    refreshData,
  };
};
