/**
 * Error Utility Functions
 * 
 * Provides utilities for normalizing and handling errors
 */

/**
 * Normalizes error objects to ensure consistent structure
 * Handles various error formats from different sources (API, fetch, etc.)
 * 
 * @param err - The error object to normalize
 * @returns Normalized error object with consistent structure
 */
export function normalizeError(err: any): {
  statusCode: number;
  statusMessage: string;
  message: string;
  data: any;
} {
  return {
    statusCode: err?.statusCode || err?.status || err?.data?.status || 500,
    statusMessage: err?.statusMessage || err?.message || "An error occurred",
    message:
      err?.message ||
      err?.data?.message ||
      err?.statusMessage ||
      "An error occurred",
    data: err?.data || err,
  };
}

/**
 * Checks if a response is HTML (indicates authentication failure)
 * 
 * @param response - The response to check
 * @returns true if response appears to be HTML
 */
export function isHtmlResponse(response: any): boolean {
  if (typeof response === "string") {
    const trimmed = response.trim();
    return (
      trimmed.startsWith("<!DOCTYPE html>") || trimmed.startsWith("<html")
    );
  }

  if (typeof response === "object" && response !== null) {
    const resObj = response as any;
    // Check if response doesn't have expected API structure
    if (!resObj.data && !resObj.status && !resObj.result) {
      // Check for HTML-like properties
      return !!(resObj.html || resObj.body || resObj.document);
    }
  }

  return false;
}

