const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    electronWebSecurity: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Handle uncaught exceptions from Supabase
      on("uncaught:exception", (err, runnable) => {
        if (
          err.message.includes("NEXT_PUBLIC_SUPABASE_URL") ||
          err.message.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
          err.message.includes("supabaseUrl and supabaseKey are required") ||
          err.message.includes("Critical dependency")
        ) {
          console.warn(
            "Ignoring Supabase-related error in test environment:",
            err.message
          );
          return false; // Don't fail the test
        }
        return true;
      });

      return config;
    },
    baseUrl: process.env.CI
      ? "http://127.0.0.1:3000"
      : "http://test.tkdweb.com:3000",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // Increased timeouts for CI - these will be the authoritative values
    pageLoadTimeout: 180000, // 3 minutes
    defaultCommandTimeout: 15000, // 15 seconds
    requestTimeout: 10000,
    responseTimeout: 30000,

    // Retry configuration for CI stability
    retries: {
      runMode: 2, // Retry failed tests 2 times in CI
      openMode: 0, // No retries in local development
    },

    video: process.env.CI ? true : false, // Keep videos in CI for debugging
    screenshotOnRunFailure: true,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
