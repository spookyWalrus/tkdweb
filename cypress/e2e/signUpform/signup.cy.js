describe("Sign up for tkd", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://api.hcaptcha.com/checksiteconfig*").as(
      "hcaptchaConfig"
    );
    cy.visit("localhost:3000/en/signup");
    cy.wait("@hcaptchaConfig", { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

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
    cy.get('button[data-action= "signup"]').should("contain", "Signing up");

    cy.get("p.sentMessage", { timeout: 20000 }).should(
      "contain",
      "Check your email to confirm sign up"
    );
  });
});
