import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "../../context/ThemeContext";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the toggle button with accessible label", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("toggles theme between light and dark when clicked", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /toggle dark mode/i });

    // Initial default should be light (or system match)
    const initialTheme = document.documentElement.getAttribute("data-theme");

    // Click toggle
    fireEvent.click(button);

    const newTheme = document.documentElement.getAttribute("data-theme");
    expect(newTheme).not.toBe(initialTheme);
    expect(localStorage.getItem("theme")).toBe(newTheme);

    // Click again to revert
    fireEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe(initialTheme);
  });
});
