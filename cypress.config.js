const cucumber = require("cypress-cucumber-preprocessor").default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber())
    },
    specPattern:  "cypress/e2e/**/*.feature"
  },
    env: {
     apiUrl: 'https://restful-booker.herokuapp.com'
    },  
    viewportWidth: 1920,
    viewportHeight: 1080,
});
