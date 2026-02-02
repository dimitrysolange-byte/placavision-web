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

export default async function HomePage() {
  const data = await getHome();

  if (!data?.data) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Error cargando contenido</h1>
      </main>
    );
  }

  const home = data.data;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* HERO */}
      <section
        style={{
          padding: "96px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#005B96,#4D4D4D,#00A878)",
        }}
      >
        <h1 style={{ fontSize: "clamp(30px,6vw,52px)" }}>
          {home.heroTitle ?? "Placavisión"}
        </h1>

        {home.heroSubtitle && (
          <p style={{ maxWidth: 720, margin: "24px auto" }}>
            {home.heroSubtitle}
          </p>
        )}

        {home.ctaText && home.ctaUrl && (
          <a
            href={home.ctaUrl}
            style={{
              padding: "16px 36px",
              background: "#00A878",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {home.ctaText}
          </a>
        )}

        {home.heroImage?.url && (
          <img
            src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
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
    </main>
  );
}

