import React from 'react';
import { motion } from 'motion/react';
import { restaurantData } from '../data/restaurantData';

export default function Featured() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="featured" className="featured container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Culinary Highlights
      </motion.h2>
      <p className="section-subtitle">A curated selection of our signature creations</p>

      <motion.div
        className="grid featured-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {restaurantData.featuredDishes.map((dish) => (
          <motion.article
            key={dish.id}
            className="card"
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
          >
            <div className="card-img-wrapper">
              <img
                loading="lazy"
                src={dish.image}
                alt={dish.title}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80';
                }}
              />
              {dish.tag && <span className="card-tag">{dish.tag}</span>}
            </div>
            <div className="card-body">
              <div className="card-header-row">
                <h3 className="card-title">{dish.title}</h3>
                <span className="card-price">{dish.price}</span>
              </div>
              <p className="muted">{dish.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
