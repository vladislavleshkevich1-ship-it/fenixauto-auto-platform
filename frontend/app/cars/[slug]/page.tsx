import { notFound } from "next/navigation";

const demoCar = {
  slug: "deepal-s07-620-max-2026-demo",
  brand: "Deepal",
  model: "S07",
  trim: "620 Max",
  year: 2026,
  mileage: "0 км",
  price: "$24 500",
  status: "В наличии",
  source: "Fenix_Auto",
  color: "Серый кузов / рыжий салон",
  drivetrain: "AWD",
  body: "SUV",
  fuel: "Электро",
  power: "428 л.с.",
  transmission: "Автоматическая",
  battery: "79.97 кВт·ч",
  range: "620 км",
  vin: "—",
  description: "Новый Deepal S07 620 Max 2026 года. Автомобиль в наличии у Fenix_Auto. Серый кузов и рыжий салон.",
  equipment: ["Адаптивный круиз-контроль", "Система удержания в полосе", "Камеры кругового обзора", "Панорамная крыша", "Бесключевой доступ", "Электропривод багажника"],
};

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== demoCar.slug) notFound();

  return (
    <main className="vehicle-page">
      <header className="site-header"><a className="logo" href="/">Fenix_Auto</a><nav><a href="/cars">Все автомобили</a></nav></header>
      <div className="breadcrumbs"><a href="/cars">Автомобили</a><span>/</span><span>{demoCar.brand} {demoCar.model}</span></div>

      <section className="vehicle-heading">
        <div><div className="status-row"><span className="status">{demoCar.status}</span><span>{demoCar.source}</span></div><h1>{demoCar.brand} {demoCar.model}</h1><p className="vehicle-subtitle">{demoCar.trim} · {demoCar.year} · {demoCar.mileage} · {demoCar.color}</p></div>
        <div className="price"><span>Цена</span><strong>{demoCar.price}</strong></div>
      </section>

      <section className="vehicle-top-grid">
        <div className="gallery"><div className="gallery-main"><div className="image-placeholder">Фото автомобиля</div></div><div className="gallery-thumbs"><div className="thumb active">1</div><div className="thumb">2</div><div className="thumb">3</div><div className="thumb">4</div></div></div>
        <aside className="summary-card"><h2>Об автомобиле</h2><div className="spec-grid">
          <div><span>Год</span><strong>{demoCar.year}</strong></div><div><span>Пробег</span><strong>{demoCar.mileage}</strong></div><div><span>Мощность</span><strong>{demoCar.power}</strong></div><div><span>Привод</span><strong>{demoCar.drivetrain}</strong></div><div><span>Кузов</span><strong>{demoCar.body}</strong></div><div><span>Топливо</span><strong>{demoCar.fuel}</strong></div>
        </div><a className="primary-button" href="#request">Получить предложение</a><p className="muted">Ответим и расскажем о комплектации, доставке и условиях покупки.</p></aside>
      </section>

      <section className="content-grid"><div>
        <section className="info-section"><h2>Характеристики</h2><div className="details-list">
          <div><span>Марка</span><strong>{demoCar.brand}</strong></div><div><span>Модель</span><strong>{demoCar.model}</strong></div><div><span>Комплектация</span><strong>{demoCar.trim}</strong></div><div><span>Год выпуска</span><strong>{demoCar.year}</strong></div><div><span>Пробег</span><strong>{demoCar.mileage}</strong></div><div><span>Коробка</span><strong>{demoCar.transmission}</strong></div><div><span>Привод</span><strong>{demoCar.drivetrain}</strong></div><div><span>Батарея</span><strong>{demoCar.battery}</strong></div><div><span>Запас хода</span><strong>{demoCar.range}</strong></div><div><span>VIN</span><strong>{demoCar.vin}</strong></div>
        </div></section>
        <section className="info-section"><h2>Описание</h2><p>{demoCar.description}</p></section>
        <section className="info-section"><h2>Комплектация</h2><div className="equipment-grid">{demoCar.equipment.map(item => <div className="equipment-item" key={item}>✓ {item}</div>)}</div></section>
      </div>
      <aside className="request-side" id="request"><h2>Заказать автомобиль</h2><p>Оставьте контакты — менеджер Fenix_Auto свяжется с вами.</p><form><label>Имя<input name="name" placeholder="Ваше имя" required /></label><label>Телефон<input name="phone" placeholder="+375 ..." required /></label><label>Комментарий<textarea name="message" placeholder="Ваш вопрос" /></label><button type="submit">Отправить заявку</button></form></aside></section>
    </main>
  );
}
