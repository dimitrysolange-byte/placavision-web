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
        {/* BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #005B96 0%, #4D4D4D 50%, #00A878 100%)",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {/* TITLE */}
          <h1
            style={{
              fontSize: "clamp(30px, 6vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {home.heroTitle}
          </h1>

          {/* SUBTITLE */}
          <p
            style={{
              maxWidth: 760,
              fontSize: "clamp(16px, 4vw, 20px)",
              opacity: 0.92,
              marginBottom: 36,
            }}
          >
            {home.heroSubtitle}
          </p>

          {/* CTA */}
          <a
            href={home.ctaUrl}
            style={{
              display: "inline-block",
              padding: "16px 36px",
              backgroundColor: "#00A878",
              color: "#ffffff",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
              transition: "all .2s ease",
            }}
          >
            {home.ctaText}
          </a>

          {/* IMAGE */}
          {home.heroImage && (
            <img
              src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
              alt="Hero"
              style={{
                marginTop: 56,
                width: "100%",
                maxWidth: 460,
                borderRadius: 24,
                border: "2px solid rgba(255,255,255,0.25)",
                boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
              }}
            />
          )}
        </div>
      </section>

      {/* ================= PLACEHOLDER FOR NEW SECTIONS ================= */}
      {/* 
        ↓↓↓

        Cada nueva sección que agregues en Strapi
        la vas a renderizar aquí debajo.

        Ejemplo:

        {home.miCampoNuevo && (
          <section>...</section>
        )}

      */}
    </main>
  );
}
