import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Hero() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="title">{restaurantData.name} — {restaurantData.tagline}</h1>
          <p className="lead">{restaurantData.subtitle}</p>
          <div className="hero-cta">
            <a
              className="btn btn-primary"
              href="#contact-form-section"
              onClick={(e) => handleScroll(e, 'contact-form-section')}
            >
              Reserve a Table
            </a>
            <a
              className="btn btn-outline"
              href="#menu"
              onClick={(e) => handleScroll(e, 'menu')}
            >
              View Menu
            </a>
          </div>
        </div>
        <div className="hero-media">
          <img
            src={restaurantData.heroImage}
            alt="Chef plating modern Indian dish at Luna Bistro"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/900x600?text=Luna+Bistro+Modern+Dining';
            }}
          />
        </div>
      </div>
    </section>
  );
}
