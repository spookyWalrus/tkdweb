// Import commands.js using ES2015 syntax:
import "./commands";

import "cypress-iframe";

/**
 * Click hCaptcha checkbox (test keys will auto-pass)
 */
Cypress.Commands.add("clickHCaptcha", () => {
  cy.frameLoaded(".h-captcha iframe", { timeout: 10000 });

  cy.iframe(".h-captcha iframe").within(() => {
    cy.get("#checkbox").should("be.visible").click();
  });

  // Wait a moment for the token to be generated
  // cy.wait(500);
  cy.log("hCaptcha checkbox clicked");
});
