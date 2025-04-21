import { h } from "preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/preact";
import Home from "./Home";

vi.mock("../store/useTheme", () => ({
  useTheme: () => ({
    theme: {
      primary: "red",
      secondary: "green",
      background: "white",
      text: "black",
      radius: "4px",
      spacing: "8px",
    },
  }),
}));

vi.mock("../i18n", () => ({
  t: (key: string) => key,
  locale: "en",
}));

vi.mock("./ThemeEditor", () => ({
  default: () => <div data-testid="theme-editor" />,
}));
vi.mock("./LangSwitcher", () => ({
  default: () => <div data-testid="lang-switcher" />,
}));

describe("Home", () => {
  beforeEach(() => {
    document.documentElement.style.cssText = "";
  });

  it("renders hero section with translations", () => {
    render(<Home />);
    expect(screen.getByText("hero.title")).toBeTruthy();
    expect(screen.getByText("hero.subtitle")).toBeTruthy();
    expect(screen.getByText("hero.tagline")).toBeTruthy();
    expect(screen.getByText("cta.seeWhy")).toBeTruthy();
  });

  it("sets CSS variables based on theme", () => {
    render(<Home />);
    const style = document.documentElement.style;
    expect(style.getPropertyValue("--color-primary")).toBe("red");
    expect(style.getPropertyValue("--color-secondary")).toBe("green");
    expect(style.getPropertyValue("--color-bg")).toBe("white");
    expect(style.getPropertyValue("--color-text")).toBe("black");
    expect(style.getPropertyValue("--radius-base")).toBe("4px");
    expect(style.getPropertyValue("--spacing-base")).toBe("8px");
  });
});
