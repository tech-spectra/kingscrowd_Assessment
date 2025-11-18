/**
 * API Error Handling Composable
 *
 * Provides centralized error handling with toast notifications
 * Handles various HTTP status codes with appropriate user messages
 */

import { useToast } from "vue-toastification";

/**
 * Composable for handling API errors with toast notifications
 * @returns Object containing error handling functions
 */
export const useApiError = () => {
  const toast = useToast();

  /**
   * Handles API errors and displays appropriate toast notifications
   * Normalizes error structure and provides user-friendly messages
   * @param error - The error object from API call
   * @returns Object containing statusCode, title, and description
   */
  const handleApiError = (error: any) => {
    // Normalize error structure for consistent handling
    const statusCode =
      error?.statusCode ||
      error?.status ||
      error?.data?.status ||
      error?.data?.statusCode ||
      error?.response?.status ||
      500;
    const errorMessage =
      error?.message ||
      error?.data?.message ||
      error?.data?.error ||
      error?.statusMessage ||
      "An unexpected error occurred";
    const retryAfter =
      error?.response?.headers?.["retry-after"] ||
      error?.data?.retryAfter ||
      error?.retryAfter;

    let title = "Error";
    let description = errorMessage;
    let duration = 5000;

    switch (statusCode) {
      case 301:
        title = "Resource Moved";
        description = error?.data?.location
          ? `The requested resource has been permanently moved to: ${error.data.location}`
          : "The requested resource has been permanently moved. Please update your request.";
        break;

      case 401:
        title = "Unauthorized";
        description =
          "Your authentication credentials are invalid or missing. Please check your API key.";
        break;

      case 404:
        title = "Not Found";
        description =
          "The requested resource could not be found. Please verify the endpoint URL.";
        break;

      case 429:
        title = "Too Many Requests";
        description = retryAfter
          ? `Rate limit exceeded. Please wait ${retryAfter} seconds before trying again.`
          : "You've made too many requests. Please wait a moment before trying again.";
        duration = retryAfter ? Number(retryAfter) * 1000 : 10000;
        break;

      case 500:
        title = "Server Error";
        description =
          "The server encountered an unexpected error. Please try again later or contact support if the issue persists.";
        duration = 8000;
        break;

      default:
        if (statusCode >= 400 && statusCode < 500) {
          title = "Client Error";
          description =
            errorMessage ||
            "There was an error with your request. Please check your input and try again.";
        } else if (statusCode >= 500) {
          title = "Server Error";
          description =
            errorMessage ||
            "The server encountered an error. Please try again later.";
          duration = 8000;
        }
    }

    toast.error(`${title}: ${description}`, {
      timeout: duration,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      icon: true,
    });

    return {
      statusCode,
      title,
      description,
    };
  };

  /**
   * Shows a success toast notification
   * @param message - The main success message
   * @param description - Optional detailed description
   */
  const showSuccess = (message: string, description?: string) => {
    const content = description ? `${message}: ${description}` : message;
    toast.success(content, {
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      icon: true,
    });
  };

  return {
    handleApiError,
    showSuccess,
  };
};
