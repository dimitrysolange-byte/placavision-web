async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=deep",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error fetching Home");
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getHome();
  const home = data.data.attributes;

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        color: "#4D4D4D",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          padding: "96px 20px",
          textAlign: "center",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #005B96 0%, #4D4D4D 50%, #00A878 100%)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(30px, 6vw, 52px)",
            fontWeight: 800,
            marginBottom: 20,
          }}
        >
          {home.hero_title}
        </h1>

        {home.hero_description?.[0]?.children?.[0]?.text && (
          <p
            style={{
              maxWidth: 760,
              margin: "0 auto 36px",
              fontSize: 18,
              opacity: 0.92,
            }}
          >
            {home.hero_description[0].children[0].text}
          </p>
        )}

        {home.cta_link && (
          <a
            href={home.cta_link}
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
            {home.cta_text}
          </a>
        )}

        {home.hero_image?.data && (
          <img
            src={`https://placavision-cms.onrender.com${home.hero_image.data.attributes.url}`}
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
      </section>

      {/* ================= PROPÓSITO ================= */}
      {home.purpose?.[0]?.children?.[0]?.text && (
        <section
          style={{
            padding: "80px 20px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 24, color: "#005B96" }}>
            Propósito
          </h2>

          <p style={{ fontSize: 18, lineHeight: 1.7 }}>
            {home.purpose[0].children[0].text}
          </p>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {home.benefit_item?.length > 0 && (
        <section
          style={{
            background: "#f7f7f7",
            padding: "80px 20px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {home.benefit_item.map(
              (item: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "#ffffff",
                    padding: 32,
                    borderRadius: 16,
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <h3 style={{ marginBottom: 12, color: "#005B96" }}>
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* ================= VISIÓN ================= */}
      {home.vision && (
        <section
          style={{
            padding: "80px 20px",
            textAlign: "center",
            background: "#005B96",
            color: "#ffffff",
          }}
        >
          <h2 style={{ marginBottom: 24 }}>Visión</h2>

          <p
            style={{
              maxWidth: 760,
              margin: "0 auto",
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            {home.vision}
          </p>
        </section>
      )}

      {/* ================= CTA FINAL ================= */}
      {home.cta_link && (
        <section
          style={{
            background: "#00A878",
            color: "#ffffff",
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 28 }}>
            ¿Querés implementar Placavisión?
          </h2>

          <a
            href={home.cta_link}
            style={{
              background: "#ffffff",
              padding: "18px 40px",
              borderRadius: 12,
              fontWeight: 700,
              color: "#005B96",
              textDecoration: "none",
            }}
          >
            {home.cta_text}
          </a>
        </section>
      )}
    </main>
  );
}
