
async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=deep",
    { cache: "no-store" }
  );

  return res.json();
}

export default async function HomePage() {
  const data = await getHome();
  const home = data?.data?.attributes;

  if (!home) {
    return <main>Error cargando contenido</main>;
  }

  const sections = Array.isArray(home.sections)
    ? home.sections
    : home.sections?.data || [];

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      {sections.map((section: any, index: number) => {
        switch (section.__component) {
          /* ================= HERO ================= */
          case "sections.hero":
            return (
              <section
                key={index}
                style={{
                  position: "relative",
                  padding: "96px 16px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg,#005B96,#4D4D4D,#00A878)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,.35)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    maxWidth: 1200,
                    margin: "0 auto",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "clamp(28px,6vw,48px)",
                      fontWeight: 700,
                      marginBottom: 16,
                    }}
                  >
                    {section.title}
                  </h1>

                  <p
                    style={{
                      maxWidth: 700,
                      margin: "0 auto 32px",
                      opacity: 0.9,
                    }}
                  >
                    {section.subtitle}
                  </p>

                  <a
                    href={section.ctaUrl}
                    style={{
                      display: "inline-block",
                      background: "#00A878",
                      padding: "14px 32px",
                      borderRadius: 8,
                      fontWeight: 600,
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    {section.ctaText}
                  </a>
                </div>
              </section>
            );

          /* ================= TEXT ================= */
          case "sections.text":
            return (
              <section
                key={index}
                style={{
                  padding: "80px 16px",
                  maxWidth: 900,
                  margin: "0 auto",
                }}
              >
                <h2 style={{ marginBottom: 24 }}>{section.title}</h2>

                {Array.isArray(section.content) &&
                  section.content.map((block: any, i: number) => (
                    <p key={i}>{block.children?.[0]?.text}</p>
                  ))}
              </section>
            );

          /* ================= FEATURES ================= */
          case "sections.features":
            return (
              <section
                key={index}
                style={{
                  padding: "80px 16px",
                  background: "#f7f7f7",
                }}
              >
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                  <h2 style={{ marginBottom: 32 }}>
                    {section.sectionTitle}
                  </h2>

                  <ul
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                      gap: 24,
                    }}
                  >
                    {section.items?.map((item: any, i: number) => (
                      <li
                        key={i}
                        style={{
                          background: "#fff",
                          padding: 24,
                          borderRadius: 12,
                          boxShadow: "0 6px 20px rgba(0,0,0,.08)",
                        }}
                      >
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );

          /* ================= CTA ================= */
          case "sections.cta":
            return (
              <section
                key={index}
                style={{
                  padding: "100px 16px",
                  background: "#005B96",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h2 style={{ marginBottom: 24 }}>{section.title}</h2>

                <a
                  href={section.buttonUrl}
                  style={{
                    display: "inline-block",
                    background: "#F5A623",
                    padding: "16px 36px",
                    borderRadius: 10,
                    fontWeight: 700,
                    color: "#000",
                    textDecoration: "none",
                  }}
                >
                  {section.buttonText}
                </a>
              </section>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
