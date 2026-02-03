
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
            marginBottom: 18,
            lineHeight: 1.75,
            fontSize: 18,
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
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#ffffff",
        minHeight: "100vh",
        background: `
          linear-gradient(
            135deg,
            #005B96 0%,
            #004d40 25%,
            #00A878 45%,
            #F5A623 60%,
            #cfd8dc 75%,
            #005B96 100%
          )
        `,
        backgroundSize: "500% 500%",
        animation: "gradientMove 26s ease infinite",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .panel {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 44px;
          border-radius: 26px;
          backdrop-filter: blur(12px);
          background: rgba(0,0,0,0.45);
          box-shadow: 0 35px 90px rgba(0,0,0,0.45);
          border: 1px solid rgba(245,166,35,0.25);
        }

        h1 { font-weight: 800; }
        h2 { font-weight: 700; margin-bottom: 24px; }
        h3 { font-weight: 600; }

        .footer {
          margin-top: 140px;
          padding: 100px 20px 120px;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.6) 100%
          );
        }

        .contact-item {
          margin: 12px 0;
          font-size: 18px;
        }

        .contact-item a {
          color: #F5A623;
          text-decoration: none;
          font-weight: 500;
        }

        .contact-item a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section style={{ padding: "140px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
          {home.hero_title}
        </h1>

        <div className="panel">
          {renderRichText(home.hero_description)}
        </div>
      </section>

      {/* ================= PROPÓSITO ================= */}
      {home.purpose && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Propósito</h2>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Beneficios</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 32,
              }}
            >
              {home.benefit_item.map((item: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    padding: 28,
                    borderRadius: 18,
                  }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= VISIÓN ================= */}
      {home.vision && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Visión</h2>
            <p style={{ maxWidth: 720, margin: "0 auto", fontSize: 18 }}>
              {home.vision}
            </p>
          </div>
        </section>
      )}

      {/* ================= VALORES ================= */}
      {home.Valores && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Valores</h2>
            <ul
              style={{
                maxWidth: 520,
                margin: "24px auto 0",
                textAlign: "left",
                lineHeight: 2,
                fontSize: 18,
              }}
            >
              {home.Valores.split("\n")
                .filter(Boolean)
                .map((v: string, i: number) => (
                  <li key={i}>● {v}</li>
                ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= FOOTER / CONTACTO ================= */}
      {home.Contact1 && (
        <footer className="footer">
          <div className="panel" style={{ maxWidth: 900 }}>
            <h2>{home.Contact1.title}</h2>

            {renderRichText(home.Contact1.description)}

            <div style={{ marginTop: 32 }}>
              {home.Contact1.email && (
                <div className="contact-item">
                  📧{" "}
                  <a href={`mailto:${home.Contact1.email}`}>
                    {home.Contact1.email}
                  </a>
                </div>
              )}

              {home.Contact1.phone && (
                <div className="contact-item">
                  📞 {home.Contact1.phone}
                </div>
              )}

              {home.Contact1.whatsapp && (
                <div className="contact-item">
                  💬{" "}
                  <a
                    href={`https://wa.me/${home.Contact1.whatsapp}`}
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
