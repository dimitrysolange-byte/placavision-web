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
        scrollBehavior: "smooth",
        background: `linear-gradient(
          135deg,
          #005B96 0%,
          #004d40 25%,
          #00A878 45%,
          #F5A623 60%,
          #cfd8dc 75%,
          #005B96 100%
        )`,
        backgroundSize: "500% 500%",
        animation: "gradientMove 26s ease infinite",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          html {
            scroll-behavior: smooth;
          }

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

          /* NAVBAR */
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 72px;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(10px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
            border-bottom: 1px solid rgba(245,166,35,0.25);
          }

          .navbar a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            position: relative;
          }

          .navbar a::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 0;
            height: 2px;
            background: #F5A623;
            transition: width 0.3s ease;
          }

          .navbar a:hover::after {
            width: 100%;
          }

          section {
            scroll-margin-top: 90px;
          }
        `}
      </style>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#contacto">Contacto</a>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{ padding: "180px 20px 140px", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
          {home.hero_title}
        </h1>
        <div className="panel">
          {renderRichText(home.hero_description)}
        </div>
      </section>

      {/* PROPÓSITO */}
      {home.purpose && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Propósito</h2>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* BENEFICIOS */}
      {Array.isArray(home.benefit_item) && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Beneficios</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
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

      {/* VISIÓN */}
      {home.vision && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Visión</h2>
            <p
              style={{
                maxWidth: 720,
                margin: "0 auto",
                fontSize: 18,
              }}
            >
              {home.vision}
            </p>
          </div>
        </section>
      )}

      {/* VALORES */}
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

      {/* SURVEY */}
      <section
        id="survey"
        style={{ padding: "120px 20px", textAlign: "center" }}
      >
        <div className="panel">
          <h2>Encuesta</h2>
          <p>
            Ayúdanos a mejorar Placavisión respondiendo esta breve encuesta.
          </p>
          <SurveyForm />
        </div>
      </section>

      {/* FOOTER / CONTACTO */}
      {home.Contact1 && (
        <footer
          id="contacto"
          style={{
            width: "100%",
            background: "#000",
            padding: "140px 20px",
            marginTop: 160,
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "64px 48px",
              borderRadius: 24,
              background: "#0d0d0d",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
              border: "1px solid rgba(245,166,35,0.25)",
              textAlign: "center",
            }}
          >
            <h2>{home.Contact1.title}</h2>
            {renderRichText(home.Contact1.description)}

            <div style={{ marginTop: 36, fontSize: 18, lineHeight: 2 }}>
              {home.Contact1.email && (
                <p>
                  📧{" "}
                  <a
                    href={`mailto:${home.Contact1.email}`}
                    style={{ color: "#F5A623", textDecoration: "none" }}
                  >
                    {home.Contact1.email}
                  </a>
                </p>
              )}

              {home.Contact1.phone && <p>📞 {home.Contact1.phone}</p>}

              {home.Contact1.whatsapp && (
                <p>
                  💬{" "}
                  <a
                    href={`https://wa.me/${home.Contact1.whatsapp}`}
                    target="_blank"
                    style={{
                      color: "#25D366",
                      textDecoration: "none",
                    }}
                  >
                    WhatsApp
                  </a>
                </p>
              )}
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
