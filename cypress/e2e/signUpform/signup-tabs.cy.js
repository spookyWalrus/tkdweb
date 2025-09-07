describe("keyboard interactivity", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/signup", (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          req.continue((res) => {
            resolve(res);
          });
        }, 50000);
      });
    }).as("signupDelay");

    cy.visit("/en/signup");
    cy.frameLoaded(".h-captcha iframe");
  });

  it("uses tab to move from field to field, uses enter key to submit form", () => {
    cy.get("input[name='name']").type(
      "Guy Dude"
      //  {
      //   force: true,
      //   delay: 100,
      // }
    );
    cy.get("input[name='name']").trigger("keydown", { key: "Tab" });

    cy.get("input[name='email']").type("guy@maill.com");
    cy.get("input[name='email']").trigger("keydown", { key: "Tab" });

    cy.get("input[name='password']").type("passW0RD!");
    cy.get("input[name='password']").trigger("keydown", { key: "Tab" });

    cy.iframe(".h-captcha iframe")
      .find("#checkbox")
      .should("be.visible")
      .click();

    cy.iframe(".h-captcha iframe")
      .find("#checkbox")
      .trigger("keydown", { key: "tab" });

    cy.get("button.button").focus();
    cy.focused().type("{enter}");

    cy.get('button[data-action= "signup"]').should("contain", "Signing Up");

    cy.get("p.sentMessage", { timeout: 15000 }).should(
      "contain",
      "Check your email to confirm sign up"
    );
  });
});
