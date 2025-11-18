/**
 * Deals Constants
 *
 * Centralized constants for deals-related functionality
 */

/**
 * CSV export column headers
 */
export const DEALS_CSV_HEADERS = [
  "Raise Name",
  "Raise Status",
  "Platform",
  "Money Raised",
  "Valuation",
] as const;

/**
 * Money raised thresholds for color coding
 */
export const MONEY_RAISED_THRESHOLDS = {
  HIGH: 500000,
  MEDIUM: 100000,
} as const;
