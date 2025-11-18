/**
 * Deals API Endpoint
 *
 * Fetches active crowdfunding deals from the KingsCrowd API
 * Handles pagination, authentication, and error responses
 *
 * @route GET /api/deals
 * @query page - Page number for pagination (default: 1)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Extract query parameters
  const queryParams = getQuery(event);
  const page = queryParams.page || 1; // Default to page 1 if not provided

  // Define API filters for active RegCF and RegA+ deals
  const filters = [
    { key: "raise_status", symbol: "=", value: ["Active"] },
    { key: "crowdfunding_type_1", symbol: "=", value: ["RegCF", "RegA+"] },
  ];

  // Build query string with filters and pagination
  const query = new URLSearchParams({
    filters: JSON.stringify(filters),
    page: page.toString(),
  }).toString();

  try {
    // Fetch deals from KingsCrowd API
    const res = await $fetch(
      `https://api.kingscrowd.dev/api/v1/deals?${query}`,
      {
        headers: {
          Authorization: `Bearer ${config.KC_API_KEY}`,
          Accept: "application/json", // Explicitly request JSON response
        },
        redirect: "follow", // Follow redirects
        onResponseError({ response }) {
          // Errors will be caught in the catch block below
        },
      }
    );

    // Validate response and detect HTML responses (authentication failures)
    validateApiResponse(res, event);

    return res;
  } catch (error: any) {
    // Re-throw if it's already a properly formatted Nuxt error
    if (error?.statusCode && error?.data) {
      setResponseStatus(event, error.statusCode);
      throw error;
    }

    // Extract error information
    const statusCode =
      error?.statusCode || error?.status || error?.response?.status || 500;
    const errorMessage =
      error?.message ||
      error?.data?.message ||
      error?.statusMessage ||
      "An unexpected error occurred";
    const retryAfter =
      error?.response?.headers?.["retry-after"] ||
      error?.data?.retryAfter ||
      error?.retryAfter;
    const location =
      error?.response?.headers?.location ||
      error?.data?.location ||
      error?.location;

    // Check if error response body is HTML (indicates authentication failure)
    const responseBody =
      error?.response?._data || error?.data || error?.response?.body;
    if (
      typeof responseBody === "string" &&
      (responseBody.trim().startsWith("<!DOCTYPE html>") ||
        responseBody.trim().startsWith("<html"))
    ) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication failed",
        data: {
          statusCode: 401,
          message: "Authentication failed. Please check your API key.",
          error:
            "Invalid API key or authentication credentials. The server returned an HTML login page.",
        },
      });
    }

    // Set response status code
    setResponseStatus(event, statusCode);

    // Handle redirects
    if (statusCode === 301 && location) {
      setHeader(event, "Location", location);
    }

    // Throw formatted error response
    throw createError({
      statusCode,
      statusMessage: errorMessage,
      data: {
        statusCode,
        message: errorMessage,
        retryAfter,
        location,
        error: getErrorMessage(statusCode, errorMessage),
      },
    });
  }
});

/**
 * Validates API response and detects HTML responses (authentication failures)
 * @param res - The API response to validate
 * @param event - The H3 event object
 * @throws Creates and throws a 401 error if HTML response is detected
 */
function validateApiResponse(res: any, event: any): void {
  // Check if response is HTML string (indicates authentication failure)
  // This happens when API key is invalid and server redirects to login page
  if (typeof res === "string") {
    const trimmed = res.trim();
    if (trimmed.startsWith("<!DOCTYPE html>") || trimmed.startsWith("<html")) {
      setResponseStatus(event, 401);
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication failed",
        data: {
          statusCode: 401,
          message: "Authentication failed. Please check your API key.",
          error:
            "Invalid API key or authentication credentials. The server returned an HTML login page.",
        },
      });
    }
  }

  // Check if response is an object but doesn't have expected API structure
  if (typeof res === "object" && res !== null) {
    const resObj = res as any;
    // If response doesn't have expected API structure, it might be HTML parsed as object
    if (!resObj.data && !resObj.status && !resObj.result) {
      // Check for HTML-like properties
      if (resObj.html || resObj.body || resObj.document) {
        setResponseStatus(event, 401);
        throw createError({
          statusCode: 401,
          statusMessage: "Authentication failed",
          data: {
            statusCode: 401,
            message: "Authentication failed. Please check your API key.",
            error: "Invalid API key or authentication credentials.",
          },
        });
      }
    }
  }
}

/**
 * Gets user-friendly error message based on HTTP status code
 * @param statusCode - The HTTP status code
 * @param defaultMessage - Default message if status code is not recognized
 * @returns Human-readable error message
 */
function getErrorMessage(statusCode: number, defaultMessage: string): string {
  switch (statusCode) {
    case 301:
      return "The requested resource has been permanently moved to a new location.";
    case 401:
      return "Authentication failed. Please check your API key.";
    case 404:
      return "The requested resource was not found.";
    case 429:
      return "Rate limit exceeded. Please wait before making another request.";
    case 500:
      return "Internal server error. Please try again later or contact support.";
    default:
      return defaultMessage;
  }
}
