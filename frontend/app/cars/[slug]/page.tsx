const demoCar = {
  brand: "Deepal",
  model: "S07",
  trim: "620 Max",
  year: 2026,
  mileage: "0 км",
  price: "$24 500",
  status: "В наличии",
  color: "Серый кузов / рыжий салон",
  drivetrain: "AWD",
  body: "SUV",
  fuel: "Электро",
};

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <main>
      <header>
        <a href="/">Fenix_Auto</a>
        <nav><a href="/cars">← Все автомобили</a></nav>
      </header>

      <section>
        <p>{demoCar.status}</p>
        <h1>{demoCar.brand} {demoCar.model} {demoCar.trim}</h1>
        <p>{demoCar.year} · {demoCar.mileage} · {demoCar.color}</p>
        <h2>{demoCar.price}</h2>
        <a href="#request">Заказать автомобиль</a>
      </section>

      <section>
        <h2>Характеристики</h2>
        <dl>
          <dt>Год</dt><dd>{demoCar.year}</dd>
          <dt>Пробег</dt><dd>{demoCar.mileage}</dd>
          <dt>Привод</dt><dd>{demoCar.drivetrain}</dd>
          <dt>Кузов</dt><dd>{demoCar.body}</dd>
          <dt>Топливо</dt><dd>{demoCar.fuel}</dd>
          <dt>Цвет</dt><dd>{demoCar.color}</dd>
        </dl>
      </section>

      <section>
        <h2>Описание</h2>
        <p>Новый Deepal S07 620 Max 2026 года. Автомобиль в наличии у Fenix_Auto.</p>
      </section>

      <section id="request">
        <h2>Заказать автомобиль</h2>
        <form>
          <label>Имя<input name="name" required /></label>
          <label>Телефон<input name="phone" required /></label>
          <label>Комментарий<textarea name="message" /></label>
          <button type="submit">Отправить заявку</button>
        </form>
      </section>
    </main>
  );
}
