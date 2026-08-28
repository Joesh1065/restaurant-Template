import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Gallery({ onImageClick }) {
  return (
    <section id="gallery" className="gallery container">
      <h2 className="section-title">Image Gallery</h2>
      <div className="grid gallery-grid">
        {restaurantData.gallery.map((img) => (
          <button
            key={img.id}
            type="button"
            className="gallery-item"
            aria-label={`Open image: ${img.alt}`}
            onClick={() => onImageClick(img.full, img.alt)}
          >
            <img
              loading="lazy"
              src={img.thumb}
              alt={img.alt}
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/600x400?text=' +
                  encodeURIComponent(img.alt);
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
