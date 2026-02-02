async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=deep",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Home");
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getHome();

  // 🔐 Protección SSR
  if (!data?.data?.attributes) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Contenido no disponible</h1>
        <p>El Home aún no ha sido configurado.</p>
      </main>
    );
  }

  const home = data.data.attributes;

  const heroText =
    home.hero_description?.[0]?.children?.[0]?.text ?? "";

  return (
    <main style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "96px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#005B96,#4D4D4D,#00A878)",
        }}
      >
        <h1 style={{ fontSize: "clamp(30px,6vw,52px)", fontWeight: 800 }}>
          {home.hero_title || "Placavisión"}
        </h1>

        {heroText && (
          <p style={{ maxWidth: 720, margin: "24px auto", fontSize: 18 }}>
            {heroText}
          </p>
        )}

        {home.cta_text && home.cta_link && (
          <a
            href={home.cta_link}
            style={{
              padding: "16px 36px",
              background: "#00A878",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {home.cta_text}
          </a>
        )}

        {home.hero_image?.data?.attributes?.url && (
          <img
            src={`https://placavision-cms.onrender.com${home.hero_image.data.attributes.url}`}
            alt="Hero"
            style={{
              marginTop: 48,
              maxWidth: 420,
              width: "100%",
              borderRadius: 20,
            }}
          />
        )}
      </section>
    </main>
  );
}
