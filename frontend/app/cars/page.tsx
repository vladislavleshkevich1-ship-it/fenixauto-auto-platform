const demoCar = {
  brand: "Deepal",
  model: "S07",
  trim: "620 Max",
  year: 2026,
  mileage: "0 км",
  price: "$24 500",
  status: "В наличии",
  color: "Серый / рыжий салон",
};

export default function CarsPage() {
  return (
    <main>
      <header>
        <a href="/">Fenix_Auto</a>
        <nav>
          <a href="/cars">Автомобили</a>
        </nav>
      </header>

      <section>
        <p>Fenix_Auto</p>
        <h1>Автомобили</h1>
        <p>Автомобили в наличии и под заказ.</p>
      </section>

      <section>
        <article>
          <div>
            <span>{demoCar.status}</span>
            <h2>{demoCar.brand} {demoCar.model}</h2>
            <p>{demoCar.trim} · {demoCar.year} · {demoCar.mileage}</p>
            <p>{demoCar.color}</p>
            <strong>{demoCar.price}</strong>
            <p><a href="/cars/deepal-s07-620-max-2026-demo">Подробнее</a></p>
          </div>
        </article>
      </section>
    </main>
  );
}
