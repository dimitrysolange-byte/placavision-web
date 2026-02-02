
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

  // 🔴 PROTECCIÓN CLAVE
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

  const purposeText =
    home.purpose?.[0]?.children?.[0]?.text ?? "";

  return (
    <main style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "96px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg, #005B96 0%, #4D4D4D 50%, #00A878 100%)",
        }}
      >
        <h1 style={{ fontSize: "clamp(30px,6vw,52px)" }}>
          {home.hero_title || "Placavisión"}
        </h1>

        {heroText && <p style={{ maxWidth: 760, margin: "24px auto" }}>{heroText}</p>}

        {home.cta_link && home.cta_text && (
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
              marginTop: 56,
              maxWidth: 460,
              width: "100%",
              borderRadius: 24,
            }}
          />
        )}
      </section>

      {/* ================= PROPÓSITO ================= */}
      {purposeText && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Propósito</h2>
          <p style={{ maxWidth: 720, margin: "24px auto" }}>{purposeText}</p>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && home.benefit_item.length > 0 && (
        <section style={{ padding: "80px 20px", background: "#f7f7f7" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {home.benefit_item.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    padding: 28,
                    borderRadius: 16,
                  }}
                >
                  <h3>{item?.title}</h3>
                  <p>{item?.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}
