"use client";
"use client";

import { useEffect, useRef, useState } from "react";

async function getHome() {
  const res = await fetch(
    "https://placavision-cms.onrender.com/api/home?populate=*",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al cargar Home");
  }

  return res.json();
}

function renderRichText(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p
          key={i}
          style={{
            marginBottom: 16,
            lineHeight: 1.6,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {block.children?.map((c: any) => c.text).join("")}
        </p>
      );
    }
    return null;
  });
}

function useScrollFocus(threshold = 0.45) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

export default function HomePage() {
  const [home, setHome] = useState<any>(null);

  useEffect(() => {
    getHome().then((data) => setHome(data?.data));
  }, []);

  if (!home) {
    return (
      <main style={{ padding: 80, textAlign: "center", color: "#fff" }}>
        Cargando…
      </main>
    );
  }

  const hero = useScrollFocus();
  const purpose = useScrollFocus();
  const benefits = useScrollFocus();
  const vision = useScrollFocus();
  const values = useScrollFocus();

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        color: "#ffffff",
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg,#005B96,#004d40,#00A878,#003f6f)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 20s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section
        ref={hero.ref}
        style={{
          padding: "120px 20px",
          textAlign: "center",
          background: hero.active ? "rgba(0,91,150,0.55)" : "transparent",
          transition: "background 0.6s ease",
        }}
      >
        <h1 style={{ fontSize: "clamp(32px,6vw,56px)" }}>
          {home.hero_title}
        </h1>
        {renderRichText(home.hero_description)}
      </section>

      {home.purpose && (
        <section
          ref={purpose.ref}
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: purpose.active
              ? "rgba(0,77,64,0.55)"
              : "transparent",
            transition: "background 0.6s ease",
          }}
        >
          <h2>Propósito</h2>
          {renderRichText(home.purpose)}
        </section>
      )}

      {Array.isArray(home.benefit_item) && (
        <section
          ref={benefits.ref}
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: benefits.active
              ? "rgba(0,168,120,0.55)"
              : "transparent",
            transition: "background 0.6s ease",
          }}
        >
          <h2>Beneficios</h2>
        </section>
      )}

      {home.vision && (
        <section
          ref={vision.ref}
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: vision.active
              ? "rgba(63,81,181,0.55)"
              : "transparent",
            transition: "background 0.6s ease",
          }}
        >
          <h2>Visión</h2>
          <p>{home.vision}</p>
        </section>
      )}

      {home.Valores && (
        <section
          ref={values.ref}
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: values.active
              ? "rgba(121,85,72,0.55)"
              : "transparent",
            transition: "background 0.6s ease",
          }}
        >
          <h2>Valores</h2>
        </section>
      )}
    </main>
  );
}
