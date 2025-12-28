async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=heroImage",
    { cache: "no-store" }
  );

  return res.json();
}

export default async function HomePage() {
  const data = await getHome();
  const home = data.data;

  return (
    <main style={{ padding: 40 }}>
      <h1>{home.heroTitle}</h1>
      <p>{home.heroSubtitle}</p>

      {home.heroImage && (
        <img
          src={`https://placavision-cms.onrender.com${home.heroImage.url}`}
          alt="Hero"
          style={{ maxWidth: "100%", marginTop: 20 }}
        />
      )}

      <a
        href={home.ctaUrl}
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
        }}
      >
        {home.ctaText}
      </a>
    </main>
  );
}
