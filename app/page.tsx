"use client";
import { useState, useEffect } from "react";

/* ================= FETCH HOME ================= */
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

/* ================= RENDER RICH TEXT ================= */
function renderRichText(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} style={{ marginBottom: 18, lineHeight: 1.7 }}>
          {block.children?.map((c: any) => c.text).join("")}
        </p>
      );
    }
    return null;
  });
}

/* ================= SURVEY FORM ================= */
function SurveyForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    Tipo_de_usuario: "",
    comments: "",
    contact_permission: false,
  });

  const [sent, setSent] = useState(false);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch(
      "https://placavision-cms.onrender.com/api/surveys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      }
    );

    if (res.ok) setSent(true);
  }

  if (sent) return <p>Gracias por completar la encuesta.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
      <input
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        name="email"
        placeholder="Correo"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        name="comments"
        placeholder="Comentarios"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <label>
        <input
          type="checkbox"
          name="contact_permission"
          onChange={handleChange}
        />
        Acepto ser contactado
      </label>

      <br /><br />

      <button
        type="submit"
        style={{
          padding: "12px 24px",
          background: "#00A878",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
        }}
      >
        Enviar encuesta
      </button>
    </form>
  );
}

/* ================= PAGE ================= */
export default function HomePage() {
  const [home, setHome] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getHome();
      setHome(data?.data);
    }
    load();
  }, []);

  if (!home) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Cargando contenido...</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        color: "#fff",
        minHeight: "100vh",
        background: `
          linear-gradient(
            135deg,
            #005B96 0%,
            #004d40 25%,
            #00A878 45%,
            #F5A623 60%,
            #cfd8dc 75%,
            #005B96 100%
          )
        `,
        backgroundSize: "500% 500%",
        animation: "gradientMove 26s ease infinite",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          padding: "16px 30px",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          zIndex: 1000,
        }}
      >
        <a href="#home">Home</a>
        <a href="#survey">Encuesta</a>
        <a href="#contacto">Contacto</a>
      </nav>

      {/* HERO */}
      <section id="home" style={{ padding: "180px 20px 120px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)" }}>
          {home.hero_title}
        </h1>

        {renderRichText(home.hero_description)}
      </section>

      {/* PROPÓSITO */}
      {home.purpose && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Propósito</h2>
          {renderRichText(home.purpose)}
        </section>
      )}

      {/* VISIÓN */}
      {home.vision && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>Visión</h2>
          <p style={{ maxWidth: 700, margin: "20px auto" }}>
            {home.vision}
          </p>
        </section>
      )}

      {/* SURVEY */}
      <section id="survey" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>Encuesta</h2>
        <p>Ayúdanos a mejorar el sistema.</p>
        <SurveyForm />
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        style={{
          background: "#000",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2>Contacto</h2>
        <p>Placavisión</p>
      </footer>

      {/* ANIMACIÓN */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
