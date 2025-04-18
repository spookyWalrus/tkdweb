describe("Contact Form", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/contact", (req) => {
      cy.wrap(req.body).as("formSubmission");
      req.reply({
        statusCode: 200,
        body: { success: true },
      });
    }).as("contactFormSubmission");

    cy.visit("/conact");
    cy.get("form.contactForm").should("be.visible");
  });
});
