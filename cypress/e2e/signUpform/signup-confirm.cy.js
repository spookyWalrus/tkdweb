describe("Signup confirmation with mock email URL", () => {
  it("confirmation link redirects to welcome page, then user account page", () => {
    cy.mockConfirmationLink("dude@mail.com");

    cy.url().should("include", "/auth-pages/auth-confirm");
    cy.url({ timeout: 50000 }).should("include", "/member/account");
    cy.get("h3").should("contain", "Member Account");
  });
});

Cypress.Commands.add("mockConfirmationLink", (email) => {
  const emailType = "mock_email";
  const mockTokenHash = `mock_${Buffer.from(email).toString("base64")}_${Date.now()}`;
  cy.visit(`/api/auth/confirm?token_hash=${mockTokenHash}&type=${emailType}`);
});
