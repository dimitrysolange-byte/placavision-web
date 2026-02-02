async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=*",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Home");
  }

  return res.json();
}

/* Helper para leer Rich Text (Blocks) */
function renderBlocks(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} style={{ marginBottom: 16 }}>
          {block.children?.map((c: any) => c.text).join("")}
        </p>
      );
    }

    return null;
  });
}

export default async function HomePage() {
  const data = await getHome();

  if (!data?.data?.attributes) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Contenido no disponible</h1>
      </main>
    );
  }

  const home = data.data.attributes;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#4D4D4D" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "96px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#005B96 0%,#4D4D4D 50%,#00A878 100%)",
        }}
      >
        <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 800 }}>
          {home.hero_title}
        </h1>

        <div style={{ maxWidth: 760, margin: "24px auto" }}>
          {renderBlocks(home.hero_description)}
        </div>

        {home.cta_link && home.cta_text && (
          <a
            href={home.cta_link}
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "14px 32px",
              background: "#00A878",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
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
              width: "100%",
              maxWidth: 420,
              borderRadius: 20,
            }}
          />
        )}
      </section>

      {/* ================= PROPÓSITO ================= */}
      {home.purpose && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Propósito</h2>
          <div style={{ maxWidth: 720, margin: "24px auto" }}>
            {renderBlocks(home.purpose)}
          </div>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && (
        <section style={{ padding: "80px 20px", background: "#f7f7f7" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 32,
            }}
          >
            {home.benefit_item.map((item: any, i: number) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  padding: 28,
                  borderRadius: 16,
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= VISIÓN ================= */}
      {home.vision && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Visión</h2>
          <p style={{ maxWidth: 720, margin: "24px auto" }}>{home.vision}</p>
        </section>
      )}

      {/* ================= WHATSAPP ================= */}
      {home.whatsapp_link && (
        <section style={{ padding: "60px 20px", textAlign: "center" }}>
          <a
            href={home.whatsapp_link}
            style={{
              padding: "14px 32px",
              background: "#25D366",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Contactar por WhatsApp
          </a>
        </section>
      )}
    </main>
  );
}
