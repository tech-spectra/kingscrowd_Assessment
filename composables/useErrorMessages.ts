/**
 * Error Messages Composable
 * 
 * Provides user-friendly error messages based on error status codes
 */

/**
 * Gets user-friendly error message based on error status code
 * @param error - The error object
 * @returns Human-readable error message
 */
export const useErrorMessages = () => {
  const getErrorMessage = (error: any): string => {
    const statusCode = error?.statusCode || error?.status || 500;
    const errorData = error?.data || error?.data?.error || error?.message;

    switch (statusCode) {
      case 301:
        return "The requested resource has been permanently moved.";
      case 401:
        return "Authentication failed. Please check your API configuration.";
      case 404:
        return "The requested resource was not found.";
      case 429:
        const retryAfter = error?.data?.retryAfter || error?.retryAfter;
        return retryAfter
          ? `Rate limit exceeded. Please wait ${retryAfter} seconds before trying again.`
          : "You've made too many requests. Please wait a moment.";
      case 500:
        return "Server error. Please try again later or contact support.";
      default:
        return errorData || "An unexpected error occurred. Please try again.";
    }
  };

  return {
    getErrorMessage,
  };
};

