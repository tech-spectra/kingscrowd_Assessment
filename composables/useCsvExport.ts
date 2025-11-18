/**
 * CSV Export Composable
 *
 * Provides reusable CSV export functionality
 * Handles data formatting, file generation, and download
 */

import { useToast } from "vue-toastification";
import { convertToCSV, downloadCSV } from "~/utils/csvUtils";

export interface CsvExportOptions {
  filename?: string;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export const useCsvExport = () => {
  const toast = useToast();

  /**
   * Exports data to CSV format and triggers download
   *
   * @param data - Array of data objects to export
   * @param headers - Array of column header names
   * @param getRowData - Function to extract row data from each object
   * @param options - Export options (filename, toast notifications)
   * @returns Promise that resolves when export is complete
   */
  const exportToCSV = async <T>(
    data: T[],
    headers: string[],
    getRowData: (item: T) => any[],
    options: CsvExportOptions = {}
  ): Promise<void> => {
    const {
      filename = `export_${new Date().getTime()}.csv`,
      showSuccessToast = true,
      showErrorToast = true,
    } = options;

    // Validate that there's data to export
    if (!data || !data.length) {
      if (showErrorToast) {
        toast.info(
          "No data to export. There are no items available to export.",
          {
            timeout: 3000,
          }
        );
      }
      return;
    }

    try {
      // Convert data to CSV format
      const csvContent = convertToCSV(data, headers, getRowData);

      // Trigger download
      downloadCSV(csvContent, filename);

      // Show success notification
      if (showSuccessToast) {
        toast.success(
          `Export successful! Downloaded ${data.length} item${
            data.length === 1 ? "" : "s"
          } to CSV file.`,
          {
            timeout: 4000,
          }
        );
      }
    } catch (error) {
      // Handle export errors gracefully
      if (showErrorToast) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while exporting the data. Please try again.";
        toast.error(`Export failed: ${errorMessage}`, {
          timeout: 5000,
        });
      }
      throw error;
    }
  };

  return {
    exportToCSV,
  };
};
