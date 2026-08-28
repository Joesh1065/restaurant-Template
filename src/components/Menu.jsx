import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters');

  return (
    <section id="menu" className="menu container" aria-labelledby="menu-heading">
      <motion.h2
        id="menu-heading"
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Full Menu
      </motion.h2>
      
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
        <AnimatePresence mode="wait">
          {restaurantData.menuCategories.map((category) => {
            if (activeCategory !== category.id) return null;
            const items = restaurantData.menuItems[category.id] || [];

            return (
              <motion.div
                key={category.id}
                id={`panel-${category.id}`}
                className="menu-panel"
                role="tabpanel"
                aria-labelledby={`tab-${category.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ul className="menu-list">
                  {items.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <div className="menu-list-header">
                        <span className="dish">{item.name}</span>
                        <span className="price">{item.price}</span>
                      </div>
                      <p className="desc">{item.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
