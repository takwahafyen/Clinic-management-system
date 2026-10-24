describe("Nurse & Pharmacist Authentication and Navigation", () => {
  beforeEach(() => {
    cy.logoutSession();
  });

  describe("Nurse Workflow", () => {
    it("completes nurse sign in and lands on Nurse Home dashboard", () => {
      cy.visit("/nurse/login");

      cy.fixture("nurse").then((mockNurse) => {
        cy.intercept("POST", "**/nurse/login", {
          statusCode: 200,
          body: mockNurse,
        }).as("nurseLogin");

        cy.get('input[type="email"]').type("florence@example.com");
        cy.get('input[type="password"]').type("password123");
        cy.get('button[type="submit"]').click();

        cy.wait("@nurseLogin");

        // Redirects to Nurse dashboard
        cy.url().should("include", "/HomeNurse");
        cy.get(".navbarNurse").should("exist");
        cy.get(".navbarNurse").contains("Log out").should("be.visible");
      });
    });

    it("allows authenticated nurse to visit /patient/registerN", () => {
      cy.loginAsNurse();
      cy.visit("/patient/registerN");
      cy.url().should("include", "/patient/registerN");
      cy.get(".patient-register-form").should("be.visible");
    });
  });

  describe("Pharmacist Workflow", () => {
    it("completes pharmacist sign in and lands on Pharmacist Home dashboard", () => {
      cy.visit("/pharmacist/login");

      cy.fixture("pharmacist").then((mockPharmacist) => {
        cy.intercept("POST", "**/pharmacist/login", {
          statusCode: 200,
          body: mockPharmacist,
        }).as("pharmacistLogin");

        cy.get('input[type="email"]').type("marie@example.com");
        cy.get('input[type="password"]').type("password123");
        cy.get('button[type="submit"]').click();

        cy.wait("@pharmacistLogin");

        // Redirects to Pharmacist dashboard
        cy.url().should("include", "/HomePha");
        cy.get(".navbarPha").should("exist");
        cy.get(".navbarPha").contains("Log out").should("be.visible");
      });
    });

    it("allows authenticated pharmacist to visit /client/register", () => {
      cy.loginAsPharmacist();
      cy.visit("/client/register");
      cy.url().should("include", "/client/register");
      cy.get(".client-register-form").should("be.visible");
    });
  });
});
