/**
 * Suppress Warnings Plugin
 *
 * Suppresses specific console warnings in development
 * Only runs on client side
 */

export default defineNuxtPlugin({
  name: "suppress-warnings",
  setup() {
    // Ensure we're on the client side (though .client.ts already ensures this)
    if (typeof window === "undefined") {
      return;
    }

    if (process.dev) {
      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        // Suppress Vue-Toastification SSR warnings
        const message = args[0];
        if (
          message &&
          (typeof message === "string" || message instanceof Error)
        ) {
          const messageStr =
            typeof message === "string" ? message : message.message;
          if (
            messageStr.includes("Vue-Toastification") &&
            (messageStr.includes("SSR") || messageStr.includes("server-side"))
          ) {
            return;
          }
          // Suppress "Component <Anonymous> is missing template or render function" warnings
          if (
            messageStr.includes("Component") &&
            messageStr.includes("missing template or render function")
          ) {
            return;
          }
        }
        // Suppress other specific warnings if needed
        originalWarn.apply(console, args);
      };
    }
  },
});
