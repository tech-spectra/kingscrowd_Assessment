/**
 * Vue Toastification Plugin
 *
 * Client-side only plugin for toast notifications
 * The .client.ts extension ensures this only runs on the client side
 */

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin({
  name: "toastification",
  parallel: true,
  setup(nuxtApp) {
    // Ensure we're on the client side (though .client.ts already ensures this)
    if (typeof window === "undefined") {
      return;
    }

    // Register toast plugin (this file only runs on client due to .client.ts extension)
    nuxtApp.vueApp.use(Toast, {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
      transition: "Vue-Toastification__bounce",
      maxToasts: 5,
      newestOnTop: true,
      filterBeforeCreate: (toast: any, toasts: any) => {
        // Prevent duplicate toasts with same type and content
        if (
          toasts.filter(
            (t: any) => t.type === toast.type && t.content === toast.content
          ).length !== 0
        ) {
          return false;
        }
        return toast;
      },
    });
  },
});
