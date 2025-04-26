import { t } from "../i18n";

export default function Island() {
  const howItems = t('island.how.items') as unknown as string[];
  const directivesItems = t('island.directives.items') as unknown as string[];
  const benefitsItems = t('island.benefits.items') as unknown as string[];

  return (
    <section
      style={{
        padding: "calc(var(--spacing-base) * 2)",
        color: "var(--color-text)",
        backgroundColor: "var(--color-bg)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          color: "var(--color-text)",
          fontSize: "2.5rem",
          marginBottom: "var(--spacing-base)",
        }}
      >
        {t("island.title")}
      </h1>

      <div
        style={{
          borderRadius: "var(--radius-base)",
          padding: "var(--spacing-base)",
          marginBottom: "var(--spacing-base)",
        }}
      >
        <h2 style={{ color: "var(--color-primary)", fontSize: "1.8rem" }}>
          {t("island.what.title")}
        </h2>
        <p>{t("island.what.description")}</p>
      </div>

      <div
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-secondary) 20%, transparent)",
          borderRadius: "var(--radius-base)",
          padding: "var(--spacing-base)",
          marginBottom: "var(--spacing-base)",
        }}
      >
        <h2 style={{ color: "var(--color-primary)", fontSize: "1.8rem" }}>
          {t("island.how.title")}
        </h2>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          {howItems.map((item, index) => (
            <li key={`how-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <div
        style={{
          borderRadius: "var(--radius-base)",
          padding: "var(--spacing-base)",
          marginBottom: "var(--spacing-base)",
        }}
      >
        <h2 style={{ color: "var(--color-primary)", fontSize: "1.8rem" }}>
          {t("island.directives.title")}
        </h2>
        <p>{t("island.directives.description")}</p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {directivesItems.map((item, index) => (
            <li key={`directives-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-secondary) 20%, transparent)",
          borderRadius: "var(--radius-base)",
          padding: "var(--spacing-base)",
          marginBottom: "var(--spacing-base)",
        }}
      >
        <h2 style={{ color: "var(--color-primary)", fontSize: "1.8rem" }}>
          {t("island.benefits.title")}
        </h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {benefitsItems.map((item, index) => (
            <li key={`benefits-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: "calc(var(--spacing-base) * 2)", fontSize: "1rem" }}>
        <strong>{t("island.tip")}</strong>
      </p>
    </section>
  );
}
