describe("Public Navigation & UI Smoke Tests", () => {
  beforeEach(() => {
    cy.logoutSession();
    cy.visit("/");
  });

  it("loads the home page with header, features, and footer", () => {
    // Navbar exists with logo and public links
    cy.get(".navbar").should("be.visible");
    cy.get(".navbar .hospital-logo").should("be.visible");
    cy.get(".navbar").contains("Home").should("be.visible");
    cy.get(".navbar").contains("About Us").should("be.visible");
    cy.get(".navbar").contains("Guidelines").should("be.visible");

    // Home components are rendered
    cy.get(".header").should("exist");
    cy.get(".features").should("exist");
    cy.get(".speciality").should("exist");
    cy.get(".footer").should("be.visible");
  });

  it("toggles between Light and Dark mode smoothly", () => {
    // Should have theme toggle button visible
    cy.get(".theme-toggle-btn").should("be.visible");

    // Click toggle to switch theme
    cy.get(".theme-toggle-btn").click();
    cy.get("html").should("have.attr", "data-theme", "dark");
    cy.get("body").should("have.attr", "data-theme", "dark");

    // Click again to switch back to light
    cy.get(".theme-toggle-btn").click();
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.get("body").should("have.attr", "data-theme", "light");
  });

  it("navigates to the About Us page and verifies content", () => {
    cy.get(".navbar").contains("About Us").click();
    cy.url().should("include", "/about");
    cy.contains("Your reason to Smile").should("be.visible");
    cy.contains("Why Choose Us?").should("be.visible");
  });

  it("navigates to the Guidelines page and verifies sections", () => {
    cy.get(".navbar").contains("Guidelines").click();
    cy.url().should("include", "/guidelines");
    cy.contains("General Information").should("be.visible");
    cy.contains("Services Offered").should("be.visible");
    cy.contains("Medical Staff").should("be.visible");
  });

  it("shows Log in button on navbar when unauthenticated", () => {
    cy.get(".navbar .right button").should("contain.text", "Log in");
    cy.get(".navbar .right button").click();
    cy.url().should("include", "/doctor/login");
  });

  it("displays properly across different viewports (Desktop & Tablet)", () => {
    // Desktop
    cy.viewport(1280, 720);
    cy.get(".navbar").should("be.visible");

    // Tablet
    cy.viewport(768, 1024);
    cy.get(".navbar").should("be.visible");
  });
});
