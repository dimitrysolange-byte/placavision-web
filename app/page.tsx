
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
      {/* ===== FUENTE + ANIMACIONES ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --accent-orange: #F5A623;
          --accent-silver: #cfd8dc;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(48px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .panel {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 44px;
          border-radius: 26px;
          backdrop-filter: blur(12px);
          box-shadow: 0 35px 90px rgba(0,0,0,0.4);
          border: 1px solid rgba(245,166,35,0.15);
          opacity: 0;
          animation: panelIn 1.4s ease forwards;
          transition:
            transform 0.5s ease,
            box-shadow 0.5s ease,
            border 0.5s ease;
        }

        .panel:hover {
          transform: translateY(-6px);
          box-shadow: 0 55px 120px rgba(0,0,0,0.55);
          border: 1px solid rgba(245,166,35,0.45);
        }

        h1 {
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        h2 {
          font-weight: 700;
          letter-spacing: -0.015em;
          margin-bottom: 24px;
          position: relative;
        }

        h2::after {
          content: "";
          display: block;
          width: 56px;
          height: 4px;
          margin: 14px auto 0;
          background: var(--accent-orange);
          border-radius: 4px;
          opacity: 0.85;
        }

        h3 {
          font-weight: 600;
          margin-bottom: 10px;
        }

        a.cta {
          background: linear-gradient(
            135deg,
            #F5A623,
            #F08A24
          );
        }

        a.cta:hover {
          filter: brightness(1.1);
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section style={{ padding: "140px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
          {home.hero_title}
        </h1>

        <div
          className="panel"
          style={{
            background: "rgba(0,0,0,0.35)",
            animationDelay: "0.1s",
          }}
        >
          {renderRichText(home.hero_description)}

          {home.cta_text && home.cta_link && (
            <a
              href={home.cta_link}
              className="cta"
              style={{
                display: "inline-block",
                marginTop: 32,
                padding: "18px 44px",
                color: "#fff",
                borderRadius: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {home.cta_text}
            </a>
          )}
        </div>
      </section>

      {/* ================= PROPÓSITO ================= */}
      {home.purpose && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div
            className="panel"
            style={{
              background: "rgba(0,77,64,0.45)",
              animationDelay: "0.25s",
            }}
          >
            <h2>Propósito</h2>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && home.benefit_item.length > 0 && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div
            className="panel"
            style={{
              background: "rgba(0,168,120,0.45)",
              animationDelay: "0.4s",
            }}
          >
            <h2 style={{ marginBottom: 48 }}>Beneficios</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 36,
              }}
            >
              {home.benefit_item.map((item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    padding: 30,
                    borderRadius: 18,
                    borderLeft: "4px solid var(--accent-orange)",
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
          <div
            className="panel"
            style={{
              background: "rgba(0,91,150,0.45)",
              animationDelay: "0.55s",
            }}
          >
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
          <div
            className="panel"
            style={{
              background: "rgba(0,0,0,0.35)",
              animationDelay: "0.7s",
            }}
          >
            <h2>Valores</h2>

            <ul
              style={{
                maxWidth: 520,
                margin: "28px auto 0",
                textAlign: "left",
                lineHeight: 2.1,
                fontSize: 18,
              }}
            >
              {home.Valores.split("\n")
                .map((v: string) => v.replace(/,/g, "").trim())
                .filter(Boolean)
                .map((valor: string, index: number) => (
                  <li key={index}>
                    <span style={{ color: "var(--accent-orange)" }}>
                      ●{" "}
                    </span>
                    {valor}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
