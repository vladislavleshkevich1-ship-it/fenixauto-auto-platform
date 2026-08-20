import "./globals.css";

export const metadata = {
  title: "Fenix_Auto — Автомобили из США, Китая и Кореи",
  description: "Автомобили в наличии и под заказ. Fenix_Auto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
