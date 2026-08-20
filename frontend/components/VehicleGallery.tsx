"use client";
import { useState } from "react";
const slides = ["Главное фото", "Экстерьер", "Интерьер", "Комплектация", "Дополнительно"];
export default function VehicleGallery() {
  const [active, setActive] = useState(0);
  return <div className="vehicle-gallery"><div className="gallery-main"><div className="gallery-placeholder"><span>Fenix_Auto</span><strong>Deepal S07</strong><small>{slides[active]} · демо</small></div><button className="gallery-arrow gallery-prev" onClick={() => setActive((active - 1 + slides.length) % slides.length)}>‹</button><button className="gallery-arrow gallery-next" onClick={() => setActive((active + 1) % slides.length)}>›</button><div className="gallery-counter">{active + 1} / {slides.length}</div></div><div className="gallery-thumbs">{slides.map((label, index) => <button key={label} className={`gallery-thumb ${index === active ? "active" : ""}`} onClick={() => setActive(index)}><span>{index + 1}</span><small>{label}</small></button>)}</div></div>;
}
