describe("hCaptcha testing", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://api.hcaptcha.com/checksiteconfig*").as(
      "hcaptchaConfig"
    );
    cy.visit("test.tkdweb.com:3000/en/signup");
    cy.wait("@hcaptchaConfig", { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.frameLoaded(".h-captcha iframe");
    cy.get("input[name='name']").type("Guy Dude", { force: true, delay: 100 });
    cy.get("input[name='email']").type("guy@maill.com");
    cy.get("input[name='password']").type("passW0RD!");
  });

  it("doesn't click hcaptcha", () => {
    cy.get("p.hcapError").should(
      "contain",
      "Please complete captcha verification"
    );
  });
});
