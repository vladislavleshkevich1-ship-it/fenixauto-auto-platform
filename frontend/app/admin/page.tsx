"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const initialForm = {
  brand: "Deepal",
  model: "S07",
  trim: "620 Max",
  year: "2026",
  mileage_km: "0",
  price_usd: "24500",
  status: "IN_STOCK",
  description: "Новый Deepal S07 620 Max 2026 года. Серый кузов, рыжий салон. Автомобиль в наличии.",
};

export default function AdminPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [createdUrl, setCreatedUrl] = useState("");

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Сохраняем...");
    setCreatedUrl("");
    try {
      const response = await fetch(`${API_URL}/api/v1/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year: Number(form.year), mileage_km: Number(form.mileage_km), price_usd: Number(form.price_usd), source: "FENIX_AUTO" }),
      });
      if (!response.ok) throw new Error("API error");
      const vehicle = await response.json();
      setMessage(`Готово: ${vehicle.brand} ${vehicle.model} опубликован.`);
      setCreatedUrl(`/cars/${vehicle.slug}`);
    } catch {
      setMessage("Не удалось подключиться к API. Запусти backend на localhost:8000.");
    }
  }

  return (
    <main>
      <header className="site-header"><a className="brand" href="/">Fenix_Auto</a><nav><a href="/cars">Каталог</a></nav></header>
      <section><span className="eyebrow">Админ-панель</span><h1>Добавить автомобиль</h1><p>Создай объявление — оно сохранится в PostgreSQL и появится в каталоге.</p></section>
      <section className="detail-card">
        <form onSubmit={submit}>
          <label>Марка<input value={form.brand} onChange={(e) => update("brand", e.target.value)} required /></label>
          <label>Модель<input value={form.model} onChange={(e) => update("model", e.target.value)} required /></label>
          <label>Комплектация<input value={form.trim} onChange={(e) => update("trim", e.target.value)} /></label>
          <label>Год<input type="number" value={form.year} onChange={(e) => update("year", e.target.value)} required /></label>
          <label>Пробег, км<input type="number" value={form.mileage_km} onChange={(e) => update("mileage_km", e.target.value)} min="0" /></label>
          <label>Цена, USD<input type="number" value={form.price_usd} onChange={(e) => update("price_usd", e.target.value)} min="0" /></label>
          <label>Статус<select value={form.status} onChange={(e) => update("status", e.target.value)}><option value="IN_STOCK">В наличии</option><option value="RESERVED">Забронирован</option><option value="IN_TRANSIT">В пути</option><option value="ORDER">Под заказ</option><option value="SOLD">Продан</option></select></label>
          <label>Описание<textarea value={form.description} onChange={(e) => update("description", e.target.value)} /></label>
          <button type="submit">Опубликовать автомобиль</button>
        </form>
        {message && <p>{message}</p>}
        {createdUrl && <p><a className="primary-button" href={createdUrl}>Открыть карточку автомобиля →</a></p>}
      </section>
    </main>
  );
}
