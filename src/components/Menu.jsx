import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Menu() {
  const categories = restaurantData.menuCategories;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'starters');

  const activeIndex = categories.findIndex((c) => c.id === activeCategory);
  const activeCat = categories[activeIndex] || categories[0];
  const items = restaurantData.menuItems[activeCat.id] || [];

  const handleKeyDown = (e, idx) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + categories.length) % categories.length;
    setActiveCategory(categories[next].id);
    document.getElementById(`tab-${categories[next].id}`)?.focus();
  };

  return (
    <section id="menu" className="menu-section container" aria-labelledby="menu-heading">
      <motion.h2
        id="menu-heading"
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Full Dining Menu
      </motion.h2>
      <p className="section-subtitle">Select a cuisine to explore its dishes</p>

      <div className="menu-table" role="table" aria-label="Restaurant menu by cuisine">
        {/* Table header row */}
        <div className="menu-table-header" role="row">
          <div className="menu-table-th menu-table-th--cuisine" role="columnheader">
            Cuisines
          </div>
          <div className="menu-table-th menu-table-th--dishes" role="columnheader">
            {activeCat.label}
            <span className="menu-table-count">{items.length} dishes</span>
          </div>
        </div>

        {/* Table body row: two columns */}
        <div className="menu-table-body" role="rowgroup">
          {/* Column 1 — all cuisine types */}
          <div
            className="menu-table-cuisines"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Menu cuisines"
          >
            {categories.map((category, idx) => {
              const isActive = activeCategory === category.id;
              const count = (restaurantData.menuItems[category.id] || []).length;
              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  className={`cuisine-row ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className="cuisine-row-label">{category.label}</span>
                  <span className="cuisine-row-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Column 2 — dishes + images for selected cuisine */}
          <div className="menu-table-dishes">
            {/* Mobile-only label — replaces the hidden table header on small screens */}
            <div className="menu-mobile-active-label">
              {activeCat.label}
              <span className="menu-table-count">{items.length} dishes</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat.id}
                id={`panel-${activeCat.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeCat.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ul className="menu-dish-grid">
                  {items.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      className="dish-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      {item.image && (
                        <div className="dish-card-media">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                          />
                          {item.badge && <span className="dish-badge dish-badge--overlay">{item.badge}</span>}
                        </div>
                      )}
                      <div className="dish-card-body">
                        <div className="dish-card-top">
                          <span className="dish">{item.name}</span>
                          <span className="price">{item.price}</span>
                        </div>
                        <p className="desc">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
