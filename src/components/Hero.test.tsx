import { h } from "preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/preact";
import Hero from "./Hero";

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

describe("Hero", () => {
  beforeEach(() => {
    document.documentElement.style.cssText = "";
  });

  it("renders hero section with translations", () => {
    render(<Hero />);
    expect(screen.getByText("hero.title")).toBeTruthy();
    expect(screen.getByText("hero.subtitle")).toBeTruthy();
    expect(screen.getByText("hero.tagline")).toBeTruthy();
    expect(screen.getByText("cta.seeWhy")).toBeTruthy();
  });
});
