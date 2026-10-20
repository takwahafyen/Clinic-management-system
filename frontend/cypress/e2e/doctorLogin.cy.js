describe("Doctor login", () => {
  it("shows an error message on incorrect credentials", () => {
    cy.visit("/doctor/login");

    cy.get('input[type="email"]').type("does-not-exist@example.com");
    cy.get('input[type="password"]').type("wrong-password");
    cy.contains("button", "LOGIN").click();

    cy.contains("Something went wrong! Please try again.").should(
      "be.visible"
    );
  });
});
