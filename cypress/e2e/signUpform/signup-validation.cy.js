describe("Form validations", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/signup", (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          req.continue((res) => {
            resolve(res);
          });
        }, 30000);
      });
    }).as("signupDelay");

    cy.visit("/en/signup");
    cy.frameLoaded(".h-captcha iframe");
  });

  describe("Name field validations", () => {
    it("Name too short", () => {
      cy.get("input[name='name']").type("G");
      cy.get("input[name='email']").type("guy@maill.com");
      cy.get("input[name='password']").type("passW0RD!");
      cy.get("button.button").click();

      cy.get("p.nameError").should(
        "contain",
        "Name must be at least 2 characters long"
      );
    });

    // it("Name too long", () => {
    //   cy.get("input[name='name']").type(
    //     "Guy Dude Manguydude Coolguy Whoisthatcoolguydude"
    //   );
    //   cy.get("input[name='email']").type("guy@maill.com");
    //   cy.get("input[name='password']").type("passW0RD!");
    //   cy.get("button.button").click();

    //   cy.get("p.nameError").should(
    //     "contain",
    //     "Name must be at least 2 characters long"
    //   );
    // });
  });

  // it("fills out email incorrectly", () => {
  //   cy.get("input[name='name']").type("Guy Dude");
  //   cy.get("input[name='email']").type("guy");
  //   cy.get("input[name='password']").type("passW0RD!");
  //   cy.get("button.button").click();

  //   cy.get("p.emailError").should("contain", "Email must be valid");
  // });

  // it("fills out password incorrectly", () => {
  //   cy.get("input[name='name']").type("Guy Dude");
  //   cy.get("input[name='email']").type("guy@mail.com");
  //   cy.get("input[name='password']").type("123abc");

  //   cy.get("button.button").click();

  //   cy.get("p.PWError").should("contain", "Check password");
  // });

  // it("doesn't click hcaptcha", () => {
  //   cy.get("input[name='name']").type("Guy Dude");
  //   cy.get("input[name='email']").type("guy@mail.com");
  //   cy.get("input[name='password']").type("123abC!@");

  //   cy.get("button.button").click();

  //   cy.get("p.hcapError").should(
  //     "contain",
  //     "Please complete captcha verification"
  //   );
  // });
});
