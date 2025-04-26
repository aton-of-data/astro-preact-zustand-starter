import { useEffect } from "preact/hooks";
import { useTheme } from "../store/useTheme";

export default function ThemeProvider() {
  const { theme } = useTheme();
   
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--color-primary", theme.primary);
    root.setProperty("--color-secondary", theme.secondary);
    root.setProperty("--color-bg", theme.background);
    root.setProperty("--color-text", theme.text);
    root.setProperty("--radius-base", theme.radius);
    root.setProperty("--spacing-base", theme.spacing);
  }, [theme]);

  return null;
}
