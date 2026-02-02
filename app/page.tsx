async function getHome() {
 async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=*",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al cargar Home");
  }

  return res.json();
}

function renderRichText(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} style={{ marginBottom: 16, lineHeight: 1.6 }}>
          {block.children?.map((c: any, j: number) => c.text).join("")}
        </p>
      );
    }
    return null;
  });
}

export default async function HomePage() {
  const data = await getHome();
  const home = data?.data;

  if (!home) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Contenido no disponible</h1>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#4D4D4D" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#005B96 0%,#4D4D4D 50%,#00A878 100%)",
        }}
      >
        <h1 style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 24 }}>
          {home.hero_title}
        </h1>

        <div style={{ maxWidth: 820, margin: "0 auto 32px" }}>
          {renderRichText(home.hero_description)}
        </div>

        {home.cta_text && home.cta_link && (
          <a
            href={home.cta_link}
            style={{
              display: "inline-block",
              padding: "16px 36px",
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
      </section>

      {/* ================= PROPÓSITO ================= */}
      {home.purpose && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2 style={{ marginBottom: 24 }}>Propósito</h2>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* ================= VISIÓN ================= */}
      {home.vision && (
        <section
          style={{
            padding: "80px 20px",
            background: "#f7f7f7",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 24 }}>Visión</h2>
          <p style={{ maxWidth: 720, margin: "0 auto", lineHeight: 1.6 }}>
            {home.vision}
          </p>
        </section>
      )}
    </main>
  );
}