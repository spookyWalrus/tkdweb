const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    electronWebSecurity: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    // baseUrl: "http://localhost:3000",
    baseUrl: process.env.CI
      ? "http://127.0.0.1:3000"
      : "http://test.tkdweb.com:3000",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 50000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: process.env.CI ? false : true,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  // pageLoadTimeout: 120000,
  // defaultCommandTimeout: 15000,
  // requestTimeout: 10000,
  // responseTimeout: 30000,
  // video: process.env.CI ? false : true,
});
