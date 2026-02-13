"use client";
import { useState, useEffect } from "react";

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
    user_type: "",
    system_usefulness: "",
    usage_environment: [],
    main_feature: "",
    interested_in_trial: false,
    budget_range: "",
    comments: "",
    contact_permission: false,
  });

  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "usage_environment") {
      let updated = [...form.usage_environment];
      if (checked) {
        updated.push(value);
      } else {
        updated = updated.filter((v) => v !== value);
      }
      setForm({ ...form, usage_environment: updated });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("https://placavision-cms.onrender.com/api/surveys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: form }),
    });

    setSent(true);
  }

  if (sent) {
    return <p>Gracias por completar la encuesta.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: 30 }}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Correo" onChange={handleChange} />
      <br /><br />

      <select name="user_type" onChange={handleChange}>
        <option value="">Tipo de usuario</option>
        <option value="empresa_seguridad">Empresa de seguridad</option>
        <option value="gobierno_policia">Gobierno / Policía</option>
        <option value="estacionamiento_privado">Estacionamiento privado</option>
        <option value="empresa_transporte">Empresa de transporte</option>
        <option value="usuario_particular">Usuario particular</option>
        <option value="otro">Otro</option>
      </select>
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

export default function HomePage() {
  const [home, setHome] = useState(null);

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
        scrollBehavior: "smooth",
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
      <section id="home" style={{ padding: "180px 20px 140px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
          {home.hero_title}
        </h1>
        <div className="panel">
          {renderRichText(home.hero_description)}
        </div>
      </section>

      {/* SURVEY */}
      <section id="survey" style={{ padding: "120px 20px", textAlign: "center" }}>
        <div className="panel">
          <h2>Encuesta</h2>
          <p>Ayúdanos a mejorar este sistema respondiendo esta breve encuesta.</p>
          <SurveyForm />
        </div>
      </section>

      {/* FOOTER */}
      {home.Contact1 && (
        <footer
          id="contacto"
          style={{
            width: "100%",
            background: "#000",
            padding: "140px 20px",
            marginTop: 160,
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "64px 48px",
              borderRadius: 24,
              background: "#0d0d0d",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
              border: "1px solid rgba(245,166,35,0.25)",
              textAlign: "center",
            }}
          >
            <h2>{home.Contact1.title}</h2>
            {renderRichText(home.Contact1.description)}
          </div>
        </footer>
      )}
    </main>
  );
}
