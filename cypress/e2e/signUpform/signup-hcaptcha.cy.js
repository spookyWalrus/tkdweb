describe("hCaptcha testing", () => {
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

  it("doesn't click hcaptcha", () => {
    cy.get("input[name='name']").type("Guy Dude", { delay: 100 });
    cy.get("input[name='email']").type("guy@maill.com");
    cy.get("input[name='password']").type("passW0RD!");

    cy.get("button.button").click();

    cy.get("p.hcapError").should(
      "contain",
      "Please complete Captcha verification"
    );
  });
});
