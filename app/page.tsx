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
        <p
          key={i}
          style={{
            marginBottom: 16,
            lineHeight: 1.6,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {block.children?.map((c: any) => c.text).join("")}
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
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        color: "#ffffff",
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg,#005B96,#004d40,#00A878,#003f6f)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 20s ease infinite",
      }}
    >
      {/* ===== CSS ANIMACIÓN DEL GRADIENTE ===== */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 24 }}>
          {home.hero_title}
        </h1>

        {renderRichText(home.hero_description)}

        {home.cta_text && home.cta_link && (
          <a
            href={home.cta_link}
            style={{
              display: "inline-block",
              marginTop: 24,
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

        {home.hero_image?.url && (
          <img
            src={`https://placavision-cms.onrender.com${home.hero_image.url}`}
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

      {/* ================= PROPÓSITO ================= */}
      {home.purpose && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Propósito</h2>
          {renderRichText(home.purpose)}
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && home.benefit_item.length > 0 && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2 style={{ marginBottom: 40 }}>Beneficios</h2>

          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {home.benefit_item.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: 28,
                  borderRadius: 16,
                  backdropFilter: "blur(6px)",
                }}
              >
                <h3 style={{ marginBottom: 12 }}>{item.title}</h3>
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
          <p style={{ maxWidth: 720, margin: "0 auto" }}>{home.vision}</p>
        </section>
      )}

      {/* ================= VALORES ================= */}
      {home.Valores && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Valores</h2>

          <ul
            style={{
              maxWidth: 520,
              margin: "32px auto 0",
              textAlign: "left",
              lineHeight: 2,
              fontSize: 18,
            }}
          >
            {home.Valores.split("\n")
              .map((v: string) => v.replace(/,/g, "").trim())
              .filter(Boolean)
              .map((valor: string, index: number) => (
                <li key={index}>{valor}</li>
              ))}
          </ul>
        </section>
      )}
    </main>
  );
}
