import { t, locale } from "../i18n";
import ThemeEditor from "./ThemeEditor";
import LangSwitcher from "./LangSwitcher";

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section class="hero">
        <h1 class="hero__title">
          {t("hero.title")}
          <br />
          <small>{t("hero.subtitle")}</small>
        </h1>
        <p class="hero__subtitle">{t("hero.tagline")}</p>
        <a href="#features" class="button">
          {t("cta.seeWhy")}
        </a>
      </section>

      {/* FEATURES */}
      <section id="features" class="features">
        <Feature icon="⚡" tkey="performance" />
        <Feature icon="🧩" tkey="batteries" />
        <Feature icon="🎨" tkey="theme" />
        <Feature icon="🔐" tkey="security" />
      </section>

      {/* floating panel */}
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          width: 260,
          zIndex: 9999,
        }}
      >
        <LangSwitcher />
        <ThemeEditor />
      </div>
    </>
  );
}

function Feature({ icon, tkey }: { icon: string; tkey: string }) {
  return (
    <article class="features__item">
      <h3 class="features__item-title">
        {icon} {t(`features.${tkey}.title`)}
      </h3>
      <p class="features__item-text">{t(`features.${tkey}.text`)}</p>
    </article>
  );
}
