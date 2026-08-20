import { getVehicles } from "../../lib/api";

export default async function CarsPage() {
  const vehicles = await getVehicles();

  return (
    <main>
      <header>
        <a href="/">Fenix_Auto</a>
        <nav><a href="/cars">Автомобили</a></nav>
      </header>
      <section>
        <p>Fenix_Auto</p>
        <h1>Автомобили</h1>
        <p>Автомобили в наличии и под заказ.</p>
      </section>
      <section>
        {vehicles.length === 0 ? <p>Автомобилей пока нет.</p> : vehicles.map((car) => (
          <article key={car.id}>
            <span>{car.status === "IN_STOCK" ? "В наличии" : car.status}</span>
            <h2>{car.brand} {car.model}</h2>
            <p>{car.trim ? `${car.trim} · ` : ""}{car.year} · {car.mileage_km.toLocaleString("ru-RU")} км</p>
            <strong>${car.price_usd.toLocaleString("en-US")}</strong>
            <p><a href={`/cars/${car.slug}`}>Подробнее</a></p>
          </article>
        ))}
      </section>
    </main>
  );
}
