/**
 * CSV Utility Functions
 *
 * Provides utilities for formatting and exporting data to CSV format
 * Handles proper escaping and Excel compatibility
 */

/**
 * Escapes a field value for CSV format
 * Handles null/undefined values and properly escapes quotes per CSV standard
 *
 * @param value - The value to escape
 * @returns Escaped CSV field value wrapped in double quotes
 */
export function escapeCsvField(value: any): string {
  if (value === null || value === undefined) {
    return '""';
  }

  // Convert objects to JSON strings if needed
  let str = typeof value === "object" ? JSON.stringify(value) : String(value);

  // Escape double quotes by doubling them (RFC 4180 CSV standard)
  str = str.replace(/"/g, '""');

  // Wrap in double quotes
  return `"${str}"`;
}

/**
 * Converts an array of objects to CSV format
 *
 * @param data - Array of data objects
 * @param headers - Array of header names
 * @param getRowData - Function to extract row data from each object
 * @returns CSV formatted string with BOM for Excel compatibility
 */
export function convertToCSV<T>(
  data: T[],
  headers: string[],
  getRowData: (item: T) => any[]
): string {
  // Escape headers
  const escapedHeaders = headers.map(escapeCsvField).join(",");

  // Convert data rows
  const dataRows = data.map((item) => {
    const rowData = getRowData(item);
    return rowData.map(escapeCsvField).join(",");
  });

  // Combine with Windows line endings for Excel compatibility
  const EOL = "\r\n";
  const csvArray = [escapedHeaders, ...dataRows];
  const csvContent = csvArray.join(EOL);

  // Add BOM (Byte Order Mark) for Excel UTF-8 support
  return "\uFEFF" + csvContent;
}

/**
 * Triggers a CSV file download in the browser
 *
 * @param csvContent - The CSV content string
 * @param filename - The filename for the downloaded file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up object URL
}
