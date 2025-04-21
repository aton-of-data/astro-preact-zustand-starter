import { setLocale, locale } from "../i18n";
export default () => (
  <select
    id="lang-switcher"
    value={locale.value}
    onChange={(e) => setLocale(e.currentTarget.value as "en" | "pt")}
    style={{ width: "100%", marginBottom: 12 }}
  >
    <option value="en">English</option>
    <option value="pt">Português</option>
  </select>
);
