const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
