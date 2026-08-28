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
        Featured Dishes
      </motion.h2>

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
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
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
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
