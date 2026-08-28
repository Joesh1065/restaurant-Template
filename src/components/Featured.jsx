import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Featured() {
  return (
    <section id="featured" className="featured container">
      <h2 className="section-title">Featured Dishes</h2>
      <div className="grid featured-grid">
        {restaurantData.featuredDishes.map((dish) => (
          <article key={dish.id} className="card">
            <img
              loading="lazy"
              src={dish.image}
              alt={dish.title}
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/600x400?text=' +
                  encodeURIComponent(dish.title);
              }}
            />
            <h3 className="card-title">{dish.title}</h3>
            <p className="muted">{dish.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
