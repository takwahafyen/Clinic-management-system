import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { LanguageProvider } from "../../context/LanguageContext";

test("renders the contact section and navigation portals", () => {
  render(
    <LanguageProvider>
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    </LanguageProvider>
  );

  // Assert Contact Us section renders
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();

  // Assert emergency number and brand are rendered
  expect(screen.getByText(/0-298-014/i)).toBeInTheDocument();
  expect(screen.getByText(/Clinic Management System/i)).toBeInTheDocument();
});
