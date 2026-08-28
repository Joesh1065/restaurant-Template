import React from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Intro() {
  return (
    <section id="intro" className="container intro">
      <h2 className="section-title">{restaurantData.intro.title}</h2>
      <p>{restaurantData.intro.description}</p>
    </section>
  );
}
