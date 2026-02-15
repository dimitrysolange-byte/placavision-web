"use client";
import { useState } from "react";

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

export default async function HomePage() {
  const data = await getHome();

  // ✅ CORRECCIÓN PRINCIPAL
  const home = data?.data?.attributes;

  if (!home) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <h1>Contenido no disponible</h1>
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
      }}
    >
      {/* HERO */}
      <section id="home" style={{ padding: "180px 20px 140px", textAlign: "center" }}>
        <h1>{home.hero_title}</h1>
        {renderRichText(home.hero_description)}
      </section>

      {/* SURVEY */}
      <section id="survey" style={{ padding: "120px 20px", textAlign: "center" }}>
        <h2>Encuesta</h2>
        <SurveyForm />
      </section>

      {/* CONTACTO */}
      {home.Contact1 && (
        <footer
          id="contacto"
          style={{
            width: "100%",
            background: "#000",
            padding: "140px 20px",
            marginTop: 160,
            textAlign: "center",
          }}
        >
          <h2>{home.Contact1.title}</h2>
          {renderRichText(home.Contact1.description)}

          {home.Contact1.email && (
            <p>Email: {home.Contact1.email}</p>
          )}

          {home.Contact1.phone && (
            <p>Teléfono: {home.Contact1.phone}</p>
          )}

          {home.Contact1.whatsapp && (
            <p>WhatsApp: {home.Contact1.whatsapp}</p>
          )}
        </footer>
      )}
    </main>
  );
}

