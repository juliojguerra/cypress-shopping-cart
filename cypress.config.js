const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/tests/*.js",
    chromeWebSecurity: false,
  },

  env: {
    url: "https://magento.softwaretestingboard.com",
  },

  viewportWidth: 1240,
  viewportHeight: 860,
});
