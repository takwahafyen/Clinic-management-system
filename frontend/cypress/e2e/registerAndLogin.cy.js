// Requires the backend's real PASSCODE, passed as an env var so it's never
// hardcoded in the repo: run with `CYPRESS_PASSCODE=<value> npx cypress run`
const passcode = Cypress.env("PASSCODE");

describe("Doctor registration and login golden path", () => {
  it("registers, logs in, and lands on an authenticated Home page", () => {
    const unique = Date.now();
    const email = `cypress-${unique}@example.com`;
    const phone = `06${unique}`.slice(0, 10);
    const password = "password123";

    cy.visit("/doctor/register");
    cy.get('input[placeholder="First name"]').type("Cypress");
    cy.get('input[placeholder="Last name"]').type("Tester");
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Specialization"]').type("Testing");
    cy.get('input[placeholder="Phone no."]').type(phone);
    cy.get('input[placeholder="Passcode"]').type(passcode);
    cy.contains("button", "REGISTER").click();

    // successful registration redirects to /doctor/login
    cy.location("pathname").should("eq", "/doctor/login");

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.contains("button", "LOGIN").click();

    // successful login re-renders the same URL as the authenticated Home page
    cy.contains("Log out").should("be.visible");
  });
});
