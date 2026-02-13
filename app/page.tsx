"use client";
import { useState } from "react";

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
