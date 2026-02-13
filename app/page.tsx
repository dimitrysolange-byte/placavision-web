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
        <p
          key={i}
          style={{
            marginBottom: 18,
            lineHeight: 1.75,
            fontSize: 18,
          }}
        >
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

  if (sent) {
    return <p>Gracias por completar la encuesta.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Correo" onChange={handleChange} />
      <br /><br />

      <textarea
        name="comments"
        placeholder="Comentarios"
        onChange={handleChange}
      />
      <br /><br />

      <label>
        <input
          type="checkbox"
          name="contact_permission"
          onChange={handleChange}
        />
        Acepto ser contactado
      </label>
      <br /><br />

      <button type="submit">Enviar encuesta</button>
    </form>
  );
}

/* ================= PAGE ================= */
export default function HomePage() {
  const [home, setHome] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getHome();
      setHome(data?.data?.attributes);
    }
    load();
  }, []);

  if (!home) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Cargando...</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#ffffff",
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
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#survey">Encuesta</a>
        <a href="#contacto">Contacto</a>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{ padding: "180px 20px 140px", textAlign: "center" }}
      >
        <div className="panel">
          <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
            {home.hero_title}
          </h1>
          {renderRichText(home.hero_description)}
        </div>
      </section>

      {/* PROPÓSITO */}
      {home.purpose && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Propósito</h2>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* VISIÓN */}
      {home.vision && (
        <section style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Visión</h2>
            <p>{home.vision}</p>
          </div>
        </section>
      )}

      {/* SURVEY */}
      <section
        id="survey"
        style={{ padding: "120px 20px", textAlign: "center" }}
      >
        <div className="panel">
          <h2>Encuesta</h2>
          <p>
            Ayúdanos a mejorar este sistema respondiendo esta breve encuesta.
          </p>
          <SurveyForm />
        </div>
      </section>

      {/* CONTACTO */}
      {home.Contact1 && (
        <footer
          id="contacto"
          style={{ padding: "140px 20px", textAlign: "center" }}
        >
          <div className="panel">
            <h2>{home.Contact1.title}</h2>
            {renderRichText(home.Contact1.description)}
          </div>
        </footer>
      )}

      {/* ESTILOS */}
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

        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(10px);
          padding: 16px;
          display: flex;
          justify-content: center;
          gap: 40px;
          z-index: 1000;
        }

        .navbar a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        .panel {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 36px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </main>
  );
}

