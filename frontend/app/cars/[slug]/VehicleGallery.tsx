"use client";

import { useState } from "react";
import type { VehicleMedia } from "../../../lib/api";

export default function VehicleGallery({ media, title }: { media: VehicleMedia[]; title: string }) {
  const [active, setActive] = useState(0);
  const images = media.filter((item) => item.media_type === "IMAGE");

  if (!images.length) {
    return (
      <div className="vehicle-gallery">
        <div className="gallery-main">
          <div className="gallery-placeholder">
            <span>Fenix_Auto</span>
            <strong>{title}</strong>
            <small>Фотографии ещё не добавлены</small>
          </div>
        </div>
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="vehicle-gallery">
      <div className="gallery-main" aria-label={`Фотографии ${title}`}>
        <img className="gallery-image" src={current.url} alt={`${title} — фото ${active + 1}`} />
        {images.length > 1 && <>
          <button className="gallery-arrow gallery-prev" onClick={() => setActive((active - 1 + images.length) % images.length)} aria-label="Предыдущее фото">‹</button>
          <button className="gallery-arrow gallery-next" onClick={() => setActive((active + 1) % images.length)} aria-label="Следующее фото">›</button>
        </>}
        <div className="gallery-counter">{active + 1} / {images.length}</div>
      </div>
      <div className="gallery-thumbs">
        {images.map((image, index) => (
          <button key={image.id} className={`gallery-thumb ${index === active ? "active" : ""}`} onClick={() => setActive(index)}>
            <img src={image.url} alt={`${title} — миниатюра ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
