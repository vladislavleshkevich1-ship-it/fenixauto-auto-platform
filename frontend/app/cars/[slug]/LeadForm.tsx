"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function LeadForm({ vehicleId, slug }: { vehicleId: number; slug: string }) {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("Отправляем...");
    try {
      const response = await fetch(`${API_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_id: vehicleId,
          name: String(form.get("name") ?? ""),
          phone: String(form.get("phone") ?? ""),
          message: String(form.get("message") ?? ""),
          source_page: `/cars/${slug}`,
        }),
      });
      if (!response.ok) throw new Error();
      event.currentTarget.reset();
      setStatus("Спасибо! Заявка отправлена. Мы свяжемся с вами.");
    } catch {
      setStatus("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  return (
    <>
      <form onSubmit={submit}>
        <label>Имя<input name="name" placeholder="Ваше имя" required /></label>
        <label>Телефон<input name="phone" placeholder="+375 ..." required /></label>
        <label>Комментарий<textarea name="message" placeholder="Ваш вопрос" /></label>
        <button type="submit">Отправить заявку</button>
      </form>
      {status && <p>{status}</p>}
      <small>Нажимая кнопку, вы соглашаетесь на обработку предоставленных данных.</small>
    </>
  );
}
