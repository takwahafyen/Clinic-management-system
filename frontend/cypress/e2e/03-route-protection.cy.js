describe("Role-Based Route Protection & Guards", () => {
  beforeEach(() => {
    cy.logoutSession();
  });

  describe("Unauthenticated Access Restrictions", () => {
    it("redirects unauthenticated users trying to access /patient/register to /doctor/login", () => {
      cy.visit("/patient/register");
      cy.url().should("include", "/doctor/login");
    });

    it("redirects unauthenticated users trying to access /allReports to /doctor/login", () => {
      cy.visit("/allReports");
      cy.url().should("include", "/doctor/login");
    });

    it("redirects unauthenticated users trying to access /allVS to /nurse/login", () => {
      cy.visit("/allVS");
      cy.url().should("include", "/nurse/login");
    });

    it("redirects unauthenticated users trying to access /patient/registerN to /nurse/login", () => {
      cy.visit("/patient/registerN");
      cy.url().should("include", "/nurse/login");
    });

    it("redirects unauthenticated users trying to access /allFC to /pharmacist/login", () => {
      cy.visit("/allFC");
      cy.url().should("include", "/pharmacist/login");
    });

    it("redirects unauthenticated users trying to access /client/register to /pharmacist/login", () => {
      cy.visit("/client/register");
      cy.url().should("include", "/pharmacist/login");
    });
  });

  describe("Authenticated Doctor Access", () => {
    beforeEach(() => {
      cy.loginAsDoctor();
    });

    it("allows authenticated doctor to access /patient/register", () => {
      cy.visit("/patient/register");
      cy.url().should("include", "/patient/register");
      cy.get(".patient-register-form").should("be.visible");
    });

    it("allows authenticated doctor to access /allReports", () => {
      // Mock the reports list endpoint
      cy.intercept("GET", "**/patients/allReports*", {
        statusCode: 200,
        body: [],
      }).as("getReports");

      cy.visit("/allReports");
      cy.url().should("include", "/allReports");
    });

    it("redirects logged-in doctor away from /doctor/login to homepage", () => {
      cy.visit("/doctor/login");
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });
  });
});
