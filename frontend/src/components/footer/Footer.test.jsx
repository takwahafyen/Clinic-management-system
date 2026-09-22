import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

test("renders the contact section", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
