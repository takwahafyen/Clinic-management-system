describe("Protected route access", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("redirects an unauthenticated user away from /settings/:id", () => {
    cy.visit("/settings/some-id");

    cy.location("pathname").should("eq", "/doctor/login");
    cy.get('input[type="email"]').should("be.visible");
  });
});
