<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <!-- HEADER -->
    <AppHeader />

    <!-- CONTENT -->
    <main
      id="main-content"
      class="flex-1 mx-auto w-full max-w-screen-2xl p-2 sm:p-6"
      role="main"
    >
      <NuxtPage />
    </main>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * Default Layout
 *
 * Main layout component for the application.
 * Includes:
 * - AppHeader component
 * - Main content area with skip link support
 * - AppFooter component
 */

// Explicitly import components to ensure they're available
import AppHeader from "~/components/layout/AppHeader.vue";
import AppFooter from "~/components/layout/AppFooter.vue";
</script>

<style scoped></style>
