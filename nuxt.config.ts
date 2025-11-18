export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/icon",
  ],

  // Suppress Vue warnings in development
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        // Suppress warnings for custom elements
        return false;
      },
    },
    // Suppress runtime warnings
    propsDestructure: true,
  },

  // Suppress console warnings in development
  ssr: true,

  // Suppress build warnings
  vite: {
    logLevel: "warn",
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress specific warnings
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" ||
            warning.code === "CIRCULAR_DEPENDENCY"
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },

  app: {
    head: {
      title: "KingsCrowd",
      meta: [
        {
          name: "description",
          content:
            "Explore active public fundraising opportunities from Reg CF and Reg A+ crowdfunding platforms.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
    },
  },

  colorMode: {
    classSuffix: "",
  },

  runtimeConfig: {
    KC_API_KEY: process.env.KINGS_CROWD_API_KEY,
    public: {},
  },
});
