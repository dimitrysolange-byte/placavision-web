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

  // 🔐 Protección absoluta
  if (!data?.data) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Contenido no disponible</h1>
      </main>
    );
  }

  const home = data.data;

  // Helpers para Rich Text (Blocks)
  const getRichText = (field: any) =>
    field?.[0]?.children?.[0]?.text ?? "";

  const heroDescription = getRichText(home.hero_description);
  const purposeText = getRichText(home.purpose);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#4D4D4D" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "96px 20px",
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#005B96 0%,#4D4D4D 50%,#00A878 100%)",
        }}
      >
        <h1 style={{ fontSize: "clamp(30px,6vw,52px)", fontWeight: 800 }}>
          {home.hero_title || "Placavisión"}
        </h1>

        {heroDescription && (
          <p
            style={{
              maxWidth: 760,
              margin: "24px auto",
              fontSize: 18,
              opacity: 0.9,
            }}
          >
            {heroDescription}
          </p>
        )}

        {home.cta_text && home.cta_link && (
          <a
            href={home.cta_link}
            style={{
              padding: "16px 36px",
              background: "#00A878",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
              marginTop: 20,
            }}
          >
            {home.cta_text}
          </a>
        )}

        {home.hero_image?.url && (
          <img
            src={`https://placavision-cms.onrender.com${home.hero_image.url}`}
            alt="Hero"
            style={{
              marginTop: 56,
              maxWidth: 460,
              width: "100%",
              borderRadius: 24,
              boxShadow: "0 24px 50px rgba(0,0,0,.45)",
            }}
          />
        )}
      </section>

      {/* ================= PROPÓSITO ================= */}
      {purposeText && (
        <section
          style={{
            padding: "80px 20px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 24, color: "#005B96" }}>
            Nuestro propósito
          </h2>

          <p style={{ fontSize: 18, lineHeight: 1.7 }}>{purposeText}</p>
        </section>
      )}

      {/* ================= BENEFICIOS ================= */}
      {Array.isArray(home.benefit_item) && home.benefit_item.length > 0 && (
        <section
          style={{
            padding: "80px 20px",
            background: "#f7f7f7",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {home.benefit_item.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    padding: 28,
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                  }}
                >
                  <h3 style={{ marginBottom: 12 }}>
                    {item?.title}
                  </h3>
                  <p>{item?.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* ================= CONTACTO ================= */}
      {(home.whatsapp_link || home.social_link) && (
        <section
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: "#005B96",
            color: "#fff",
          }}
        >
          <h2 style={{ marginBottom: 24 }}>Contacto</h2>

          {home.whatsapp_link && (
            <a
              href={home.whatsapp_link}
              target="_blank"
              style={{
                display: "inline-block",
                background: "#25D366",
                padding: "14px 28px",
                borderRadius: 10,
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              WhatsApp
            </a>
          )}
        </section>
      )}
    </main>
  );
}
