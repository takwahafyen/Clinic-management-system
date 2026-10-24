describe("Doctor Authentication Flow", () => {
  beforeEach(() => {
    cy.logoutSession();
    cy.visit("/doctor/login");
  });

  it("renders the sign-in form with all necessary fields", () => {
    cy.get('input[type="email"]').should("be.visible").and("have.attr", "placeholder", "Email");
    cy.get('input[type="password"]').should("be.visible").and("have.attr", "placeholder", "Password");
    cy.get('button[type="submit"]').should("be.visible").and("contain.text", "LOGIN");
    cy.contains("Are you new here?").should("be.visible");
    cy.contains("Register").should("have.attr", "href", "/doctor/register");
  });

  it("handles failed login and displays error message", () => {
    // Intercept login request and simulate authentication failure
    cy.intercept("POST", "**/doctor/login", {
      statusCode: 400,
      body: {
        success: false,
        message: "Wrong credentials!",
      },
    }).as("loginFailure");

    cy.fillDoctorLoginForm("wrong@example.com", "wrongpassword");

    cy.wait("@loginFailure");
    cy.get(".errorMsg")
      .should("be.visible")
      .and("contain.text", "Something went wrong! Please try again.");
    cy.url().should("include", "/doctor/login");
  });

  it("successfully logs in with valid credentials, updates navbar, and persists session", () => {
    cy.fixture("doctor").then((mockDoctor) => {
      // Intercept login request and return mocked doctor
      cy.intercept("POST", "**/doctor/login", {
        statusCode: 200,
        body: mockDoctor,
      }).as("loginSuccess");

      cy.fillDoctorLoginForm("ada@example.com", "password123");

      cy.wait("@loginSuccess");

      // After successful login, app redirects to home
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);

      // Navbar should reflect authenticated doctor state
      cy.get(".navbar").contains("View all reports").should("be.visible");
      cy.get(".navbar .right button").should("contain.text", "Log out");
    });
  });

  it("allows the doctor to log out and returns to unauthenticated state", () => {
    // Start with logged-in doctor session
    cy.loginAsDoctor();
    cy.visit("/");

    cy.get(".navbar").contains("View all reports").should("be.visible");
    cy.get(".navbar .right button").should("contain.text", "Log out");

    // Intercept logout request
    cy.intercept("POST", "**/doctor/logout", {
      statusCode: 200,
      body: { success: true, message: "Logged out successfully" },
    }).as("logoutRequest");

    cy.get(".navbar .right button").contains("Log out").click();

    cy.wait("@logoutRequest");

    // Session is cleared
    cy.get(".navbar .right button").should("contain.text", "Log in");
    cy.get(".navbar").should("not.contain", "View all reports");
  });
});
