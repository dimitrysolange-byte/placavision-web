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
      {/* HERO CON BACKGROUND DE MARCA */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          overflow: "hidden",
        }}
      >
        {/* FONDO CON GRADIENTE DE TUS COLORES */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #005B96, #4D4D4D, #00A878)",
          }}
        ></div>

        {/* OVERLAY PARA MEJOR CONTRASTE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        ></div>

        {/* CONTENIDO */}
        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            color: "#FFFFFF",
          }}
        >
          {/* TEXTO */}
          <div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              {home.heroTitle}
            </h1>

            <p
              style={{
                fontSize: 18,
                opacity: 0.9,
                marginBottom: 32,
              }}
            >
              {home.heroSubtitle}
            </p>

            <a
              href={home.ctaUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#00A878", // Verde Monteverde
                color: "#FFFFFF",
                padding: "12px 24px",
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
            <div>
              <img
                src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
                alt="Hero"
                style={{
                  width: "100%",
                  borderRadius: 20,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
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
