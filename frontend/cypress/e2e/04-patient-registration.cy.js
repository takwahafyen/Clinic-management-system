describe("Doctor - Patient Registration Flow", () => {
  beforeEach(() => {
    cy.loginAsDoctor();
    cy.visit("/patient/register");
  });

  it("displays the registration form correctly", () => {
    cy.get(".patient-register-form").should("be.visible");
    cy.get('input[placeholder="First name"]').should("be.visible");
    cy.get('input[placeholder="Last name"]').should("be.visible");
    cy.get('input[placeholder="Phone number"]').should("be.visible");
    cy.get('button[type="submit"]').should("contain.text", "REGISTER");
  });

  it("submits the form successfully and redirects to patient info page", () => {
    cy.fixture("patient").then((mockPatient) => {
      // Intercept the registration API
      cy.intercept("POST", "**/patientauth/register", {
        statusCode: 201,
        body: mockPatient,
      }).as("registerPatient");

      // Fill in patient details
      cy.get('input[placeholder="First name"]').type("John");
      cy.get('input[placeholder="Last name"]').type("Doe");
      cy.get('input[placeholder="Phone number"]').type("0612345678");

      cy.get('button[type="submit"]').click();

      // Assert the intercepted request payload
      cy.wait("@registerPatient").then((interception) => {
        expect(interception.request.body).to.deep.include({
          firstName: "John",
          lastName: "Doe",
          phoneNo: "0612345678",
        });
      });

      // App should navigate to the new patient's info page
      cy.url().should("include", `/patients/patientInfo/${mockPatient._id}`);
    });
  });

  it("handles registration errors gracefully by showing an error alert", () => {
    cy.intercept("POST", "**/patientauth/register", {
      statusCode: 500,
      body: { message: "Internal server error" },
    }).as("registerError");

    cy.get('input[placeholder="First name"]').type("Jane");
    cy.get('input[placeholder="Last name"]').type("Smith");
    cy.get('input[placeholder="Phone number"]').type("0699999999");

    cy.get('button[type="submit"]').click();

    cy.wait("@registerError");
    cy.get(".errorMsg")
      .should("be.visible")
      .and("contain.text", "Something went wrong! Please try again.");
  });
});
