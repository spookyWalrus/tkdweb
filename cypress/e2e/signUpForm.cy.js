describe("Sign up for tkd", () => {
  it("fills out form and submits succesfully", () => {
    cy.intercept("POST", "https://api.hcaptcha.com/checksiteconfig*").as(
      "hcaptchaConfig"
    );
    cy.visit("localhost:3000/en/signup");
    cy.wait("@hcaptchaConfig", { timeout: 9000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get(".h-captcha", { timeout: 1000 }).should("be.visible");
    cy.get('[data-testid="hcaptcha-widget"], iframe', { timeout: 5000 }).should(
      "be.visible"
    );

    cy.get("input[name='name']").type("Guy Dude");
    cy.get("input[name='email']").type("guy@maill.com");
    cy.get("input[name='password']").type("passW0RD!");
    cy.get("button.button").click();
    cy.get("p.sentMessage").should(
      "contain",
      "Check your email to confirm sign up"
    );
  });

  //   it("fills out name incorrectly", () => {
  //     cy.intercept("POST", "https://api.hcaptcha.com/checksiteconfig*").as(
  //       "hcaptchaConfig"
  //     );
  //     cy.visit("localhost:3000/en/signup");
  //     cy.wait("@hcaptchaConfig", { timeout: 9000 }).then((interception) => {
  //       expect(interception.response.statusCode).to.eq(200);
  //     });
  //     cy.get(".h-captcha", { timeout: 1000 }).should("be.visible");
  //     cy.get('[data-testid="hcaptcha-widget"], iframe', { timeout: 5000 }).should(
  //       "be.visible"
  //     );
  //     cy.get("input[name='name']").type("G");
  //     cy.get("input[name='email']").type("G");
  //     cy.get("input[name='password']").type("G");

  //     cy.get("button.button").click();

  //     cy.get("p.nameError").should(
  //       "contain",
  //       "Name must be at least 2 characters long"
  //     );
  //     cy.get("p.emailError").should("contain", "Email must be valid");
  //     cy.get("p.PWError").should("contain", "Check password");
  //   });
});
