import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function About() {
  return (
    <section id="about" className="about container">
      <h2 className="section-title">{restaurantData.about.title}</h2>
      <div className="about-grid">
        <div>
          {restaurantData.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <blockquote className="quote">
          "{restaurantData.about.quote}" — {restaurantData.about.quoteAuthor}
        </blockquote>
      </div>
    </section>
  );
}
