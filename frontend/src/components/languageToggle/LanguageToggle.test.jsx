import { render, screen, fireEvent } from "@testing-library/react";
import LanguageToggle from "./LanguageToggle";
import { LanguageProvider } from "../../context/LanguageContext";

describe("LanguageToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("lang");
  });

  it("renders with English as default language", () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    expect(screen.getByText("🇬🇧")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("switches to French on click and persists to localStorage", () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    const toggleButton = screen.getByRole("button", { name: /toggle language/i });

    // Click to toggle to French
    fireEvent.click(toggleButton);

    expect(screen.getByText("🇫🇷")).toBeInTheDocument();
    expect(screen.getByText("FR")).toBeInTheDocument();
    expect(localStorage.getItem("clinic_lang")).toBe("fr");
    expect(document.documentElement.getAttribute("lang")).toBe("fr");

    // Click again to return to English
    fireEvent.click(toggleButton);
    expect(screen.getByText("🇬🇧")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(localStorage.getItem("clinic_lang")).toBe("en");
  });
});
