export default function HomePage() {
  return (
    <main>
      <section>
        <p>Fenix_Auto</p>
        <h1>Автомобили из США, Китая и Кореи</h1>
        <p>Подберём, привезём и доставим автомобиль под ключ.</p>
        <div>
          <a href="/cars">Смотреть автомобили</a>
          <a href="/cars?status=IN_STOCK">Автомобили в наличии</a>
        </div>
      </section>
    </main>
  );
}
