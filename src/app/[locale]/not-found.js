import { useTranslations } from "next-intl";

export default function LocaleNotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem 1rem",
        marginTop: "10%",
      }}
    >
      <h1>404</h1>
      <a href="/" style={{ color: "#000" }}>
        Retour à l&apos;accueil / Back to home
      </a>
    </main>
  );
}
