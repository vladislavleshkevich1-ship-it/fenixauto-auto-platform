"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Lead = {
  id: number;
  vehicle_id: number | null;
  name: string;
  phone?: string | null;
  telegram?: string | null;
  message?: string | null;
  source_page?: string | null;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    try {
      const response = await fetch(`${API_URL}/api/v1/leads`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      setLeads(await response.json());
    } catch {
      setMessage("Не удалось загрузить заявки.");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <main>
      <header className="site-header"><a className="brand" href="/">Fenix_Auto</a><nav><a href="/admin">Автомобили</a><a href="/cars">Каталог</a></nav></header>
      <section>
        <span className="eyebrow">Админ-панель</span>
        <h1>Заявки</h1>
        <p>Все обращения из карточек автомобилей.</p>
      </section>
      {message && <p>{message}</p>}
      <section className="admin-list">
        {leads.map((lead) => (
          <article className="detail-card" key={lead.id}>
            <div className="section-heading"><span>#{lead.id}</span><h2>{lead.name}</h2></div>
            <p><strong>Телефон:</strong> {lead.phone || "—"}</p>
            <p><strong>Автомобиль ID:</strong> {lead.vehicle_id ?? "—"}</p>
            <p><strong>Страница:</strong> {lead.source_page || "—"}</p>
            <p><strong>Комментарий:</strong> {lead.message || "—"}</p>
            <p><strong>Получена:</strong> {new Date(lead.created_at).toLocaleString("ru-RU")}</p>
          </article>
        ))}
        {!leads.length && !message && <p>Заявок пока нет.</p>}
      </section>
    </main>
  );
}
