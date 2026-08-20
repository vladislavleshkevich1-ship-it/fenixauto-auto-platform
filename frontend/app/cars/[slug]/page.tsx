import { notFound } from "next/navigation";
import { getVehicleBySlug } from "../../../lib/api";
import LeadForm from "./LeadForm";

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    IN_STOCK: "В наличии", RESERVED: "Забронирован", IN_TRANSIT: "В пути", ORDER: "Под заказ",
    AUCTION: "На аукционе", BUY_NOW: "Buy Now", SOLD: "Продан", ARCHIVED: "Архив",
  };
  return labels[status] ?? status;
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let car;
  try { car = await getVehicleBySlug(slug); } catch { notFound(); }
  if (!car) notFound();

  const mileage = `${car.mileage_km.toLocaleString("ru-RU")} км`;
  const price = `$${car.price_usd.toLocaleString("en-US")}`;

  return (
    <main>
      <header className="site-header"><a className="brand" href="/">Fenix_Auto</a><nav><a href="/cars">Все автомобили</a><a href="/admin">Админка</a></nav></header>
      <div className="breadcrumbs"><a href="/cars">Автомобили</a><span>/</span><span>{car.brand} {car.model}</span></div>

      <section className="vehicle-heading">
        <div><div className="status-row"><span className="status">{statusLabel(car.status)}</span><span className="source-tag">{car.source}</span></div><h1>{car.brand} {car.model}</h1><p className="vehicle-subtitle">{car.trim ? `${car.trim} · ` : ""}{car.year} · {mileage}</p></div>
        <div className="price-block"><small>Цена</small><strong>{price}</strong><a href="#request">Получить предложение</a></div>
      </section>

      <section className="vehicle-top">
        <div className="vehicle-gallery"><div className="gallery-main"><div className="gallery-placeholder"><span>FENIX_AUTO</span><strong>{car.brand} {car.model}</strong><small>Фотографии будут доступны после загрузки</small></div></div><div className="gallery-thumbs"><div className="gallery-thumb active"><span>Фото 1</span><small>Основное</small></div><div className="gallery-thumb"><span>Фото 2</span><small>—</small></div><div className="gallery-thumb"><span>Фото 3</span><small>—</small></div></div></div>
        <aside className="vehicle-summary"><div className="summary-title">Об автомобиле</div><div className="summary-grid"><div><small>Год</small><strong>{car.year}</strong></div><div><small>Пробег</small><strong>{mileage}</strong></div><div><small>Марка</small><strong>{car.brand}</strong></div><div><small>Модель</small><strong>{car.model}</strong></div><div><small>Комплектация</small><strong>{car.trim ?? "—"}</strong></div><div><small>Источник</small><strong>{car.source}</strong></div></div><div className="summary-note"><span>✓</span><p>Автомобиль опубликован в каталоге Fenix_Auto.</p></div><a className="primary-button" href="#request">Получить предложение</a></aside>
      </section>

      <section className="detail-layout">
        <div>
          <section className="detail-card"><div className="section-heading"><span>01</span><h2>Характеристики</h2></div><div className="spec-grid"><div className="spec-row"><span>Марка</span><strong>{car.brand}</strong></div><div className="spec-row"><span>Модель</span><strong>{car.model}</strong></div><div className="spec-row"><span>Комплектация</span><strong>{car.trim ?? "—"}</strong></div><div className="spec-row"><span>Год выпуска</span><strong>{car.year}</strong></div><div className="spec-row"><span>Пробег</span><strong>{mileage}</strong></div><div className="spec-row"><span>Статус</span><strong>{statusLabel(car.status)}</strong></div><div className="spec-row"><span>Источник</span><strong>{car.source}</strong></div><div className="spec-row"><span>VIN</span><strong>—</strong></div></div></section>
          <section className="detail-card"><div className="section-heading"><span>02</span><h2>Описание</h2></div><p className="description">{car.description || "Описание автомобиля пока не добавлено."}</p></section>
        </div>
        <aside className="request-card" id="request"><span className="eyebrow">Fenix_Auto</span><h2>Заинтересовал автомобиль?</h2><p>Оставьте контакты — менеджер свяжется с вами и расскажет об автомобиле.</p><LeadForm vehicleId={car.id} slug={car.slug} /></aside>
      </section>
    </main>
  );
}
