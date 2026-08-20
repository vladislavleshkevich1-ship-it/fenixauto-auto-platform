"use client";

import { useState } from "react";

const slides = [
  { id: 1, label: "Главное фото" },
  { id: 2, label: "Экстерьер" },
  { id: 3, label: "Интерьер" },
  { id: 4, label: "Комплектация" },
  { id: 5, label: "Дополнительно" },
];

export default function VehicleGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="vehicle-gallery">
      <div className="gallery-main" aria-label="Галерея автомобиля">
        <div className="gallery-placeholder">
          <span>Fenix_Auto</span>
          <strong>Deepal S07</strong>
          <small>{slides[active].label} · демо-изображение</small>
        </div>
        <button className="gallery-arrow gallery-prev" onClick={() => setActive((active - 1 + slides.length) % slides.length)} aria-label="Предыдущее фото">‹</button>
        <button className="gallery-arrow gallery-next" onClick={() => setActive((active + 1) % slides.length)} aria-label="Следующее фото">›</button>
        <div className="gallery-counter">{active + 1} / {slides.length}</div>
      </div>
      <div className="gallery-thumbs">
        {slides.map((slide, index) => (
          <button key={slide.id} className={`gallery-thumb ${index === active ? "active" : ""}`} onClick={() => setActive(index)}>
            <span>{index + 1}</span>
            <small>{slide.label}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
