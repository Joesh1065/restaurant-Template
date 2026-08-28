import React, { useState } from 'react';
import { restaurantData } from '../data/restaurantData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters');

  return (
    <section id="menu" className="menu container" aria-labelledby="menu-heading">
      <h2 id="menu-heading" className="section-title">Full Menu</h2>
      
      <div className="menu-controls" role="tablist" aria-label="Menu categories">
        {restaurantData.menuCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              id={`tab-${category.id}`}
              className={`tab ${isActive ? 'active' : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${category.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="menu-panels">
        {restaurantData.menuCategories.map((category) => {
          const isActive = activeCategory === category.id;
          if (!isActive) return null;
          
          const items = restaurantData.menuItems[category.id] || [];

          return (
            <div
              key={category.id}
              id={`panel-${category.id}`}
              className="menu-panel"
              role="tabpanel"
              aria-labelledby={`tab-${category.id}`}
            >
              <ul className="menu-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="menu-list-header">
                      <span className="dish">{item.name}</span>
                      <span className="price">{item.price}</span>
                    </div>
                    <p className="desc">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
