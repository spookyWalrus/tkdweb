describe("Sign up for tkd", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/signup", (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          req.continue((res) => {
            resolve(res);
          });
        }, 3000);
      });
    }).as("signupDelay");

    cy.visit("test.tkdweb.com:3000/en/signup");
    cy.frameLoaded(".h-captcha iframe");
  });

  it("fills out form and submits succesfully", () => {
    cy.get("input[name='name']").type("Guy Dude", { force: true, delay: 100 });
    cy.get("input[name='email']").type("guy@maill.com");
    cy.get("input[name='password']").type("passW0RD!");
    cy.iframe(".h-captcha iframe")
      .find("#checkbox")
      .should("be.visible")
      .click();
    cy.iframe(".h-captcha iframe").find(".check").should("be.visible");

    cy.get("button.button").click();
    cy.get('button[data-action= "signup"]').should("contain", "Signing Up");

    cy.get("p.sentMessage", { timeout: 7000 }).should(
      "contain",
      "Check your email to confirm sign up"
    );
  });

  // check user flow: tab moves to next field, hitting enter moves to next input field, disabled state of
  // button works as it should (also test if disabled state becomes enabled when submit fails)

  // cy.get("button.button").should("contain", "Successful sign up");
});
