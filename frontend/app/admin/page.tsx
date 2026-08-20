"use client";

import { FormEvent, useEffect, useState } from "react";

type Vehicle = {
  id: number;
  slug: string;
  brand: string;
  model: string;
  trim?: string | null;
  year: number;
  mileage_km: number;
  price_usd: number;
  status: string;
  source: string;
  description?: string | null;
  is_visible: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const emptyForm = {
  brand: "",
  model: "",
  trim: "",
  year: "2026",
  mileage_km: "0",
  price_usd: "0",
  status: "IN_STOCK",
  description: "",
};

const statusLabels: Record<string, string> = {
  IN_STOCK: "В наличии",
  RESERVED: "Забронирован",
  IN_TRANSIT: "В пути",
  ORDER: "Под заказ",
  AUCTION: "Аукцион",
  BUY_NOW: "Buy Now",
  SOLD: "Продан",
  ARCHIVED: "Архив",
};

export default function AdminPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadVehicles() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/vehicles?include_hidden=true`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      setVehicles(await response.json());
    } catch {
      setMessage("Не удалось загрузить автомобили. Проверь backend на localhost:8000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadVehicles(); }, []);

  function update(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function edit(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setForm({
      brand: vehicle.brand,
      model: vehicle.model,
      trim: vehicle.trim ?? "",
      year: String(vehicle.year),
      mileage_km: String(vehicle.mileage_km),
      price_usd: String(vehicle.price_usd),
      status: vehicle.status,
      description: vehicle.description ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Сохраняем...");
    const body = {
      ...form,
      year: Number(form.year),
      mileage_km: Number(form.mileage_km),
      price_usd: Number(form.price_usd),
      source: "FENIX_AUTO",
    };
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vehicles${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (!response.ok) throw new Error();
      const vehicle: Vehicle = await response.json();
      setMessage(editingId ? "Изменения сохранены." : `Готово: ${vehicle.brand} ${vehicle.model} опубликован.`);
      resetForm();
      await loadVehicles();
    } catch {
      setMessage("Не удалось сохранить автомобиль. Проверь соединение с API.");
    }
  }

  async function archive(vehicle: Vehicle) {
    if (!confirm(`Убрать ${vehicle.brand} ${vehicle.model} в архив?`)) return;
    const response = await fetch(`${API_URL}/api/v1/vehicles/${vehicle.id}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("Автомобиль перемещён в архив.");
      await loadVehicles();
    } else setMessage("Не удалось изменить статус автомобиля.");
  }

  return (
    <main>
      <header className="site-header"><a className="brand" href="/">Fenix_Auto</a><nav><a href="/cars">Каталог</a></nav></header>

      <section>
        <span className="eyebrow">Админ-панель</span>
        <h1>{editingId ? "Редактировать автомобиль" : "Добавить автомобиль"}</h1>
        <p>Управляй автомобилями из одного места. Изменения сохраняются через API.</p>
      </section>

      <section className="detail-card">
        <form onSubmit={submit}>
          <label>Марка<input value={form.brand} onChange={(e) => update("brand", e.target.value)} required /></label>
          <label>Модель<input value={form.model} onChange={(e) => update("model", e.target.value)} required /></label>
          <label>Комплектация<input value={form.trim} onChange={(e) => update("trim", e.target.value)} /></label>
          <label>Год<input type="number" value={form.year} onChange={(e) => update("year", e.target.value)} required /></label>
          <label>Пробег, км<input type="number" value={form.mileage_km} onChange={(e) => update("mileage_km", e.target.value)} min="0" /></label>
          <label>Цена, USD<input type="number" value={form.price_usd} onChange={(e) => update("price_usd", e.target.value)} min="0" /></label>
          <label>Статус<select value={form.status} onChange={(e) => update("status", e.target.value)}>{Object.entries(statusLabels).filter(([key]) => key !== "ARCHIVED").map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          <label>Описание<textarea value={form.description} onChange={(e) => update("description", e.target.value)} /></label>
          <div><button type="submit">{editingId ? "Сохранить изменения" : "Опубликовать автомобиль"}</button>{editingId && <button type="button" onClick={resetForm}>Отмена</button>}</div>
        </form>
        {message && <p>{message}</p>}
      </section>

      <section>
        <div className="section-heading"><div><span className="eyebrow">Каталог</span><h2>Автомобили</h2></div><strong>{vehicles.length}</strong></div>
        {loading ? <p>Загружаем...</p> : <div className="admin-list">
          {vehicles.map((vehicle) => (
            <article className="detail-card admin-row" key={vehicle.id}>
              <div><span className="eyebrow">{vehicle.is_visible ? statusLabels[vehicle.status] ?? vehicle.status : "Скрыт"}</span><h3>{vehicle.brand} {vehicle.model}</h3><p>{vehicle.trim} · {vehicle.year} · {vehicle.mileage_km.toLocaleString("ru-RU")} км</p></div>
              <strong>${vehicle.price_usd.toLocaleString("en-US")}</strong>
              <div className="admin-actions"><button type="button" onClick={() => edit(vehicle)}>Редактировать</button>{vehicle.is_visible && <a className="primary-button" href={`/cars/${vehicle.slug}`}>Открыть</a>} {vehicle.is_visible && <button type="button" onClick={() => archive(vehicle)}>В архив</button>}</div>
            </article>
          ))}
          {!vehicles.length && <p>Автомобилей пока нет.</p>}
        </div>}
      </section>
    </main>
  );
}
