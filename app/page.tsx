async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=*",
    { cache: "no-store" }
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
        backgroundColor: "#FFFFFF",
        color: "#4D4D4D",
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "64px 16px",
          overflow: "hidden",
        }}
      >
        {/* FONDO CON GRADIENTE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #005B96, #4D4D4D, #00A878)",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />

        {/* CONTENIDO */}
        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column", // Mobile first
            gap: 32,
            alignItems: "center",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          {/* TEXTO */}
          <div style={{ maxWidth: 520 }}>
            <h1
              style={{
                fontSize: "clamp(28px, 6vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              {home.heroTitle}
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 4vw, 18px)",
                opacity: 0.9,
                marginBottom: 24,
              }}
            >
              {home.heroSubtitle}
            </p>

            <a
              href={home.ctaUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#00A878",
                color: "#FFFFFF",
                padding: "14px 28px",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              {home.ctaText}
            </a>
          </div>

          {/* IMAGEN */}
          {home.heroImage && (
            <div style={{ width: "100%", maxWidth: 360 }}>
              <img
                src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
                alt="Hero"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 16px 32px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
