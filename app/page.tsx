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
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "100px 20px",
          overflow: "hidden",
        }}
      >
        {/* BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #005B96, #4D4D4D, #00A878)",
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

        {/* CONTENT */}
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
              fontSize: "clamp(28px, 6vw, 48px)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            {home.heroTitle}
          </h1>

          <p
            style={{
              maxWidth: 720,
              margin: "0 auto 32px",
              fontSize: 18,
              opacity: 0.9,
            }}
          >
            {home.heroSubtitle}
          </p>

          <a
            href={home.ctaUrl}
            style={{
              display: "inline-block",
              padding: "14px 32px",
              backgroundColor: "#00A878",
              color: "#ffffff",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            {home.ctaText}
          </a>

          {home.heroImage && (
            <img
              src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
              alt="Hero"
              style={{
                marginTop: 48,
                width: "100%",
                maxWidth: 420,
                borderRadius: 20,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
