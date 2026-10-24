// ***********************************************
// Cypress Custom Commands for Clinic Management System
// ***********************************************

/**
 * Fast login as Doctor by setting localStorage directly.
 * Useful for tests that require authentication without having to go through the UI login every time.
 */
Cypress.Commands.add("loginAsDoctor", (customUser = null) => {
  cy.fixture("doctor").then((defaultDoctor) => {
    const doctor = customUser || defaultDoctor;
    window.localStorage.setItem("doctor", JSON.stringify(doctor));
    window.localStorage.setItem("user", JSON.stringify(doctor));
  });
});

/**
 * Fast login as Nurse by setting localStorage directly.
 */
Cypress.Commands.add("loginAsNurse", (customUser = null) => {
  cy.fixture("nurse").then((defaultNurse) => {
    const nurse = customUser || defaultNurse;
    window.localStorage.setItem("nurse", JSON.stringify(nurse));
    window.localStorage.setItem("user", JSON.stringify(nurse));
  });
});

/**
 * Fast login as Pharmacist by setting localStorage directly.
 */
Cypress.Commands.add("loginAsPharmacist", (customUser = null) => {
  cy.fixture("pharmacist").then((defaultPharmacist) => {
    const pharmacist = customUser || defaultPharmacist;
    window.localStorage.setItem("pharmacist", JSON.stringify(pharmacist));
    window.localStorage.setItem("user", JSON.stringify(pharmacist));
  });
});

/**
 * Clear session and authentication state from localStorage.
 */
Cypress.Commands.add("logoutSession", () => {
  window.localStorage.removeItem("doctor");
  window.localStorage.removeItem("nurse");
  window.localStorage.removeItem("pharmacist");
  window.localStorage.removeItem("user");
});

/**
 * Helper to fill out Doctor login form in the UI.
 */
Cypress.Commands.add("fillDoctorLoginForm", (email, password) => {
  if (email) {
    cy.get('input[type="email"]').clear().type(email);
  }
  if (password) {
    cy.get('input[type="password"]').clear().type(password);
  }
  cy.get('button[type="submit"]').click();
});
