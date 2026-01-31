async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=*",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function HomePage() {
  const data = await getHome();
  const home = data.data;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#4D4D4D",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          padding: "96px 20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #005B96 0%, #4D4D4D 50%, #00A878 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(30px, 6vw, 52px)",
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            {home.heroTitle}
          </h1>

          <p
            style={{
              maxWidth: 760,
              margin: "0 auto 36px",
              fontSize: 18,
              opacity: 0.92,
            }}
          >
            {home.heroSubtitle}
          </p>

          <a
            href={home.ctaUrl}
            style={{
              padding: "16px 36px",
              backgroundColor: "#00A878",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {home.ctaText}
          </a>

          {home.heroImage && (
            <img
              src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
              alt="Hero"
              style={{
                marginTop: 56,
                maxWidth: 460,
                width: "100%",
                borderRadius: 24,
                boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
              }}
            />
          )}
        </div>
      </section>

      {/* ================= INFO ================= */}
      {home.Esto && (
        <section
          style={{
            padding: "80px 20px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 24, color: "#005B96" }}>
            Información del sistema
          </h2>

          <p style={{ fontSize: 18, lineHeight: 1.7 }}>{home.Esto}</p>
        </section>
      )}

      {/* ================= DATA ================= */}
      {(home.EDAD || home.emailw) && (
        <section
          style={{
            background: "#f7f7f7",
            padding: "70px 20px",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gap: 32,
              textAlign: "center",
            }}
          >
            {home.EDAD && (
              <div>
                <strong>Fecha:</strong>
                <br />
                {home.EDAD}
              </div>
            )}

            {home.emailw && (
              <div>
                <strong>Contacto:</strong>
                <br />
                <a href={`mailto:${home.emailw}`}>{home.emailw}</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= IMAGE ================= */}
      {home.Cedulajh && (
        <section
          style={{
            padding: "80px 20px",
            textAlign: "center",
          }}
        >
          <img
            src={`https://placavision-cms.onrender.com${home.Cedulajh.url}`}
            alt=""
            style={{
              maxWidth: 420,
              width: "100%",
              borderRadius: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}
          />
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <section
        style={{
          background: "#005B96",
          color: "#ffffff",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 28 }}>
          ¿Querés implementar PlacaVisión?
        </h2>

        <a
          href={home.ctaUrl}
          style={{
            background: "#F5A623",
            padding: "18px 40px",
            borderRadius: 12,
            fontWeight: 700,
            color: "#000",
            textDecoration: "none",
          }}
        >
          {home.ctaText}
        </a>
      </section>
    </main>
  );
}
