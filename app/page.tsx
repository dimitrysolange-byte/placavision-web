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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: form }),
      }
    );

    if (res.ok) {
      setSent(true);
    } else {
      alert("Error enviando encuesta");
    }
  }

  if (sent) {
    return <p>Gracias por completar la encuesta.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: 30 }}>
      <input
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="email"
        placeholder="Correo"
        onChange={handleChange}
      />
      <br /><br />

      <select
        name="Tipo_de_usuario"
        onChange={handleChange}
      >
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
        background: "linear-gradient(135deg,#005B96,#4D4D4D,#00A878)",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "160px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", marginBottom: 32 }}>
          {home.hero_title}
        </h1>

        {renderRichText(home.hero_description)}
      </section>

      {/* SURVEY */}
      <section
        style={{
          padding: "120px 20px",
          textAlign: "center",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <h2>Encuesta</h2>
        <p>Ayúdanos a mejorar este sistema respondiendo esta breve encuesta.</p>
        <SurveyForm />
      </section>
    </main>
  );
}
