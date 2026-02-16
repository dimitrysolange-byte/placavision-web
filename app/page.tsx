"use client";
import { useState, useEffect } from "react";

/* ================= FETCH ================= */
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

/* ================= RICH TEXT ================= */
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
    Name: "",
    email: "",
    Tipo_de_usuario: "",
    system_usefulness: "",
    usage_environment: "",
    interested_in_trial: false,
    budget_range: "",
    comments: "",
    contact_permission: false,
  });

  const [sent, setSent] = useState(false);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch(
      "https://placavision-cms.onrender.com/api/surveys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: form }),
      }
    );

    if (res.ok) {
      setSent(true);
    } else {
      console.error(await res.text());
      alert("Error enviando encuesta");
    }
  }

  if (sent) {
    return <p>Gracias por completar la encuesta.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
      <input
        name="Name"
        placeholder="Nombre"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <input
        name="email"
        placeholder="Correo"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />

      <select
        name="Tipo_de_usuario"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      >
        <option value="">Tipo de usuario</option>
        <option value="empresa_seguridad">Empresa de seguridad</option>
        <option value="gobierno_policia">Gobierno / Policía</option>
        <option value="estacionamiento_privado">
          Estacionamiento privado
        </option>
        <option value="empresa_transporte">Empresa de transporte</option>
        <option value="usuario_particular">Usuario particular</option>
        <option value="otro">Otro</option>
      </select>

      <select
        name="system_usefulness"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      >
        <option value="">¿Qué tan útil es el sistema?</option>
        <option value="muy_util">Muy útil</option>
        <option value="util">Útil</option>
        <option value="neutral">Neutral</option>
        <option value="poco_util">Poco útil</option>
      </select>

      <select
        name="usage_environment"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      >
        <option value="">Entorno de uso</option>
        <option value="calles_publicas">Calles públicas</option>
        <option value="peajes">Peajes</option>
        <option value="estacionamientos">Estacionamientos</option>
        <option value="residenciales">Residenciales</option>
        <option value="centros_comerciales">Centros comerciales</option>
        <option value="fronteras">Fronteras</option>
        <option value="otro">Otro</option>
      </select>

      <select
        name="budget_range"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      >
        <option value="">Rango de presupuesto</option>
        <option value="menos_50">Menos de $50</option>
        <option value="entre_50_100">Entre $50 y $100</option>
        <option value="entre_100_300">Entre $100 y $300</option>
        <option value="mas_300">Más de $300</option>
        <option value="no_lo_se">No lo sé</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="interested_in_trial"
          onChange={handleChange}
        />
        Me interesa una prueba del sistema
      </label>

      <br /><br />

      <textarea
        name="comments"
        placeholder="Comentarios"
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
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
      setHome(data?.data);
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
        background: `linear-gradient(
          135deg,
          #005B96 0%,
          #004d40 25%,
          #00A878 45%,
          #F5A623 60%,
          #cfd8dc 75%,
          #005B96 100%
        )`,
        backgroundSize: "500% 500%",
        animation: "gradientMove 26s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .panel {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 44px;
          border-radius: 26px;
          backdrop-filter: blur(12px);
          background: rgba(0,0,0,0.45);
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 72px;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          z-index: 1000;
        }

        .navbar a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        section {
          scroll-margin-top: 90px;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#purpose">Propósito</a>
        <a href="#vision">Visión</a>
        <a href="#valores">Valores</a>
        <a href="#survey">Encuesta</a>
        <a href="#contacto">Contacto</a>
      </nav>

      {/* HERO */}
      <section id="home" style={{ padding: "180px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)" }}>
          {home.hero_title}
        </h1>
        <div className="panel">
          {renderRichText(home.hero_description)}
        </div>
      </section>

      {/* PURPOSE */}
      {home.purpose && (
        <section id="purpose" style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Propósito</h2>
            {renderRichText(home.purpose)}
          </div>
        </section>
      )}

      {/* VISION */}
      {home.vision && (
        <section id="vision" style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Visión</h2>
            <p style={{ maxWidth: 700, margin: "0 auto" }}>
              {home.vision}
            </p>
          </div>
        </section>
      )}

      {/* VALORES */}
      {home.Valores && (
        <section id="valores" style={{ padding: "120px 20px", textAlign: "center" }}>
          <div className="panel">
            <h2>Valores</h2>
            <ul style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
              {home.Valores.split("\n").map((v: string, i: number) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SURVEY */}
      <section id="survey" style={{ padding: "120px 20px", textAlign: "center" }}>
        <div className="panel">
          <h2>Encuesta</h2>
          <SurveyForm />
        </div>
      </section>

      {/* CONTACTO */}
      {home.Contact1 && (
        <footer
          id="contacto"
          style={{
            width: "100%",
            background: "#000",
            padding: "140px 20px",
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "64px 48px",
              borderRadius: 24,
              background: "#0d0d0d",
              textAlign: "center",
            }}
          >
            <h2>{home.Contact1.title}</h2>
            {renderRichText(home.Contact1.description)}

            <div style={{ marginTop: 36 }}>
              {home.Contact1.email && <p>📧 {home.Contact1.email}</p>}
              {home.Contact1.phone && <p>📞 {home.Contact1.phone}</p>}
              {home.Contact1.whatsapp && (
                <p>💬 WhatsApp: {home.Contact1.whatsapp}</p>
              )}
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
